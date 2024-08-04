const quizData = [
    {
      question: 'What epic John Milton poem, first published in 1667, concerns the fall of Lucifer from Heaven, and Adam and Eve’s expulsion from the Garden of Eden?',
      options: [
        'Heaven Found',
        'Paradise Found',
        'Paradise Lost',
        'Heaven Lost',
      ],
      answer: 'Paradise Lost',
    },
    {
      question: 'Johannes Gutenberg gets oodles of history book credit, but in fact there is clear documentation that movable type was invented 400 years earlier (circa AD 1045) in what country?',
      options: [
        'Indonesia',
        'Malaysia',
        'Japan',
        'China',
      ],
      answer: 'China',
    },
    {
      question: 'What 2014 Liane Moriarty novel is set in Australia, although its HBO TV adaptation moved the setting to Monterey, California?',
      options: ['The husband\'s secret', 'What Alice forgot', 'Big Little Lies', 'Nine perfect strangers'],
      answer: 'Big Little Lies',
    },
    {
        question: 'The O.W.L.s (Ordinary Wizarding Levels) are a set of standardized tests in the wizarding world that are traditionally taken at Hogwarts at the end of which school year?',
        options: [
          '6th Year',
          '4th Year',
          '5th Year',
          '6th Year',
        ],
        answer: '5th Year',
      },
      {
        question: 'Fittingly, considering its definition, what literary term has roots in the Greek words for both "sharp" and "dull?"',
        options: [
          'Oxymoron',
          'Allegory',
          'Satire',
          'Motif',
        ],
        answer: 'Oxymoron',
      },
      {
        question: 'According to the Harry Potter books, how many total balls are used in a standard Quidditch match?',
        options: ['3', '2', '4', '5'],
        answer: '4',
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