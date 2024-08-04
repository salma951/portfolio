const quizData = [
    {
      question: '"Sanditon," which she began in 1817 but did not finish before she died the same year, was the last novel by what English author?',
      options: [
        'Jane Austen',
        'Dorothy L. Sayers',
        'Emma Forrest',
        'Agatha Christie',
      ],
      answer: 'Jane Austen',
    },
    {
      question: 'One of the youthful finders of a golden ticket in Roald Dahl\'s "Charlie and the Chocolate Factory" was a "great big greedy nincompoop" 9-year-old from the fictional town of Dusselheim, Germany. Who is this?',
      options: [
        'Augustus Gloop',
        'August Gloop',
        'Agatha Gloop',
        'Augustina Gloop',
      ],
      answer: 'Augustus Gloop',
    },
    {
      question: 'What Canadian author, poet, and environmentalist with a "forested" name reached new levels of fame in 2017 after her award-winning 1985 dystopian political novel was released as a smash-hit television series on Hulu?',
      options: ['Adele Wiseman', 'Madeleine Thien', 'Margaret Lawrence', 'Margaret Atwood'],
      answer: 'Margaret Atwood',
    },
    {
        question: 'Since 2011, author George R.R. Martin has been working on the sixth installment of his A Song of Ice and Fire series, a novel alliteratively titled The Winds of ____?',
        options: [
          'Autumn',
          'Spring',
          'Summer',
          'Winter',
        ],
        answer: 'Winter',
      },
      {
        question: 'What was the name of the snowy owl which Harry Potter received as an eleventh birthday present from Hagrid?',
        options: [
          'Redwig',
          'Ludwig',
          'Hedwig',
          'Eawig',
        ],
        answer: 'Hedwig',
      },
      {
        question: 'A famous fictional member of the Army Air Forces is Capt. John Yossarian, a 28-year-old World War 2 bombardier in what Joseph Heller satirical novel?',
        options: ['Catch 21', 'Catch 22', 'Catch 23', 'Catch 24'],
        answer: 'Catch 22',
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