document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  const btnOpenModal = document.getElementById('btnOpenModal'),
        modalBlock = document.getElementById('modalBlock'),
        closeModal = document.getElementById('closeModal'),
        questionTitle = document.getElementById('question'),
        formAnswers = document.getElementById('formAnswers'),
        burgerBtn = document.getElementById('burger'),
        prevBtn = document.getElementById('prev'),
        nextBtn = document.getElementById('next'),
        modalDialog = document.querySelector('.modal-dialog'),
        sendBtn = document.getElementById('send');

  let clientWidth = document.documentElement.clientWidth;

  const questions = [{
      question: "Какого цвета бургер?",
      answers: [{
          title: 'Стандарт',
          url: './image/burger.png'
        },
        {
          title: 'Черный',
          url: './image/burgerBlack.png'
        }
      ],
      type: 'radio'
    },
    {
      question: "Из какого мяса котлета?",
      answers: [{
          title: 'Курица',
          url: './image/chickenMeat.png'
        },
        {
          title: 'Говядина',
          url: './image/beefMeat.png'
        },
        {
          title: 'Свинина',
          url: './image/porkMeat.png'
        }
      ],
      type: 'radio'
    },
    {
      question: "Дополнительные ингредиенты?",
      answers: [{
          title: 'Помидор',
          url: './image/tomato.png'
        },
        {
          title: 'Огурец',
          url: './image/cucumber.png'
        },
        {
          title: 'Салат',
          url: './image/salad.png'
        },
        {
          title: 'Лук',
          url: './image/onion.png'
        }
      ],
      type: 'checkbox'
    },
    {
      question: "Добавить соус?",
      answers: [{
          title: 'Чесночный',
          url: './image/sauce1.png'
        },
        {
          title: 'Томатный',
          url: './image/sauce2.png'
        },
        {
          title: 'Горчичный',
          url: './image/sauce3.png'
        }
      ],
      type: 'radio'
    }
  ];

  let count = -100;
  modalDialog.style.top = count + '%';

  const animateModal = () => {
    modalDialog.style.top = count + '%';
    count += 3;

    if (count < 0) {
      requestAnimationFrame(animateModal);
    } else {
      count = -100;
    }
  };
  

  if (clientWidth < 768) {
    burgerBtn.style.display = 'flex';
  } else {
    burgerBtn.style.display = 'none';
  }

  const playTest = () => {

    const finalAnswers = [];
    let numberQuestion = 0;

    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
          </label>
        `;
        formAnswers.appendChild(answerItem);
      });
    };

    const renderQuestions = (indexQuestion) => {
      formAnswers.textContent = '';

      // if(numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
      //   questionTitle.textContent = `${questions[indexQuestion].question}`;
      //   renderAnswers(indexQuestion);
      //   nextBtn.classList.remove('d-none');
      //   prevBtn.classList.remove('d-none');
      //   sendBtn.classList.add('d-none');
      // }

      // if (numberQuestion === 0) {
      //   prevBtn.classList.add('d-none');
      // }
      // if (numberQuestion === questions.length) {
      //   nextBtn.classList.add('d-none');
      //   prevBtn.classList.add('d-none');
      //   sendBtn.classList.remove('d-none');

      //   formAnswers.innerHTML = `
      //   <div class="form-group">
      //     <label for="numberPhone">Enter your number</label>
      //     <input type="phone" class="form-control" id="numberPhone">
      //   </div>
      //   `;
      // }

      // if (numberQuestion === questions.length + 1) {
      //   formAnswers.textContent = 'Спасибо за пройденный тест!';
      //   setTimeout(() => {
      //     modalBlock.classList.remove('d-block');
      //   }, 2000);
      // }


      switch(true) {
        case (numberQuestion === 0):
          renderAnswers(indexQuestion);
          prevBtn.classList.add('d-none');
          break;
        case (numberQuestion >= 0 && numberQuestion <= questions.length - 1):
          questionTitle.textContent = `${questions[indexQuestion].question}`;
          renderAnswers(indexQuestion);
          nextBtn.classList.remove('d-none');
          prevBtn.classList.remove('d-none');
          sendBtn.classList.add('d-none');
          break;
        case (numberQuestion === questions.length):
          nextBtn.classList.add('d-none');
          prevBtn.classList.add('d-none');
          sendBtn.classList.remove('d-none');

          formAnswers.innerHTML = `
          <div class="form-group">
            <label for="numberPhone">Enter your number</label>
            <input type="phone" class="form-control" id="numberPhone">
          </div>
          `;
          break;
        case (numberQuestion === questions.length + 1):
          formAnswers.textContent = 'Спасибо за пройденный тест!';
          setTimeout(() => {
            modalBlock.classList.remove('d-block');
          }, 2000);
          break;
        default:
          console.log('ни один из вариантов');
      }


    };

    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const obj = {};

      const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');

      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }
        if (numberQuestion === questions.length) {
          obj['Номер телефона'] = input.value;
        }
      });

      finalAnswers.push(obj);
    };

    prevBtn.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };
    nextBtn.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    };
    sendBtn.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      console.log(finalAnswers);
    };
  };

  window.addEventListener('resize', () => {
    clientWidth = document.documentElement.clientWidth;
    if (clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }
  });

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.add('active');
    requestAnimationFrame(animateModal);
    modalBlock.classList.add('d-block');
    playTest();
  });

  btnOpenModal.addEventListener('click', () => {
    requestAnimationFrame(animateModal);
    modalBlock.classList.add('d-block');
    playTest();
  });

  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.remove('active');
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.modal-dialog') && !event.target.closest('.openModalButton') && !event.target.closest('.burger')
    ) {
      modalBlock.classList.remove('d-block');
      burgerBtn.classList.remove('active');
    }
  });


});