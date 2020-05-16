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
        modalDialog = document.querySelector('.modal-dialog');

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
    let numberQuestion = 0;

    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
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
      questionTitle.textContent = `${questions[indexQuestion].question}`;
      renderAnswers(indexQuestion);
    };

    renderQuestions(numberQuestion);

    prevBtn.style.display = 'none';
    nextBtn.style.display = 'block';
    prevBtn.onclick = () => {
      numberQuestion--;
      if (numberQuestion === 0) {
        prevBtn.style.display = 'none';
      }
      if (numberQuestion < questions.length - 1) {
        nextBtn.style.display = 'block';
      }
      renderQuestions(numberQuestion);
    };
    nextBtn.onclick = () => {
      numberQuestion++;
      if (numberQuestion > 0) {
        prevBtn.style.display = 'block';
      }
      if (numberQuestion === questions.length - 1) {
        nextBtn.style.display = 'none';
      }
      renderQuestions(numberQuestion);
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