const quizData = [
    {
      question: 'Which Kate Bush song received fresh attention in 2022 after featuring in the hit drama Stranger Things?',
      options: [
        'The Man with the Child in His Eyes',
        'Running Up That Hill',
        'Wuthering heights',
        'King of the Mountain',
      ],
      answer: 'Running Up That Hill',
    },
    {
      question: '"As It Was", a song which opens with the line "Holding me back, gravity is holding me back" was released in 2022 by which former member of One Direction?',
      options: [
        'Zayn Malik',
        'Liam Payne',
        'Niall Horan',
        'Harry Styles',
      ],
      answer: 'Harry Styles',
    },
    {
      question: 'Which country won the 2022 Eurovision Song Contest?',
      options: ['Sweden', 'Ukraine', 'Spain', 'UK'],
      answer: 'Ukraine',
    },
    {
        question: 'In June who headlined the Pyramid stage at Glastonbury 2022 becoming the youngest act ever to have done so?',
        options: [
          'Dove Cameron',
          'Sabrina Carpenter',
          'Olivia Rodrigo',
          'Billie Eilish',
        ],
        answer: 'Billie Eilish',
      },
      {
        question: '"drivers license", "good 4 u" and "deja vu" are all 2021 hits for which American singer?',
        options: [
          'Sabrina Carpenter',
          'Dove Cameron',
          'Olivia Rodrigo',
          'Sofia Carson',
        ],
        answer: 'Olivia Rodrigo',
      },
      {
        question: 'Originally released in 2020, which reggaeton-inspired Little Mix track topped the UK charts in 2021?',
        options: ['Secret love song', 'Sweet Melody', 'Shout Out to My Ex', 'Holiday'],
        answer: 'Sweet Melody',
      },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();