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
        sendBtn = document.getElementById('send'),
        modalTitle = document.querySelector('.modal-title');

  const firebaseConfig = {
    apiKey: "AIzaSyCSAWMWtu7C8d9BH9fzxLPi6V6YNm-gnl0",
    authDomain: "testquiz-f5e0a.firebaseapp.com",
    databaseURL: "https://testquiz-f5e0a.firebaseio.com",
    projectId: "testquiz-f5e0a",
    storageBucket: "testquiz-f5e0a.appspot.com",
    messagingSenderId: "889132054501",
    appId: "1:889132054501:web:13239baf237dba82f4610c",
    measurementId: "G-7NYHXEMXPM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Функция получения даннх
  const getData = () => {
    formAnswers.innerHTML = `
      <div id="floatingCirclesG">
        <div class="f_circleG" id="frotateG_01"></div>
        <div class="f_circleG" id="frotateG_02"></div>
        <div class="f_circleG" id="frotateG_03"></div>
        <div class="f_circleG" id="frotateG_04"></div>
        <div class="f_circleG" id="frotateG_05"></div>
        <div class="f_circleG" id="frotateG_06"></div>
        <div class="f_circleG" id="frotateG_07"></div>
        <div class="f_circleG" id="frotateG_08"></div>
      </div>
    `;

    nextBtn.classList.add('d-none');
    prevBtn.classList.add('d-none');

    firebase.database().ref().child('questions').once('value')
    .then(snap => playTest(snap.val()))
    .catch(err => {
      formAnswers.textContent = 'Ошибка загрузки данных!';
      console.error(err);
      });
  };

  let clientWidth = document.documentElement.clientWidth;
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

  const playTest = (questions) => {
    const finalAnswers = [];
    const obj = {};
    let numberQuestion = 0;
    modalTitle.textContent = 'Ответь на вопрос:';

    // Рендер ответов
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
        formAnswers.append(answerItem);
      });
    };

    const renderQuestions = (indexQuestion) => {
      formAnswers.textContent = '';

      if(numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
        questionTitle.textContent = `${questions[indexQuestion].question}`;
        renderAnswers(indexQuestion);
        nextBtn.classList.remove('d-none');
        prevBtn.classList.remove('d-none');
        sendBtn.classList.add('d-none');
      }

      if (numberQuestion === 0) {
        prevBtn.classList.add('d-none');
      }
      if (numberQuestion === questions.length) {
        questionTitle.textContent = '';
        modalTitle.textContent = '';

        nextBtn.classList.add('d-none');
        prevBtn.classList.add('d-none');
        sendBtn.classList.remove('d-none');

        formAnswers.innerHTML = `
        <div class="form-group">
          <label for="numberPhone">Enter your number</label>
          <input type="phone" class="form-control" id="numberPhone">
        </div>
        `;

        const numberPhone = document.getElementById('numberPhone');
        numberPhone.addEventListener('input', (event) => {
          event.target.value = event.target.value.replace(/[^0-9+-]/, "");
        });
      }

      if (numberQuestion === questions.length + 1) {
        formAnswers.textContent = 'Спасибо за пройденный тест!';
        sendBtn.classList.add('d-none');

        for(let key in obj) {
          let newObj = {};
          newObj[key] = obj[key];
          finalAnswers.push(newObj);
        }

        setTimeout(() => {
          modalBlock.classList.remove('d-block');
        }, 2000);
      }


    };

    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');

      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }
        if (numberQuestion === questions.length) {
          obj['Номер телефона'] = input.value;
        }
      });
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
      firebase
        .database()
        .ref()
        .child('contacts')
        .push(finalAnswers);
    };
  };

  // Обработчики событий
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
    getData();
  });

  btnOpenModal.addEventListener('click', () => {
    requestAnimationFrame(animateModal);
    modalBlock.classList.add('d-block');
    getData();
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