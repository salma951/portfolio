const quizData = [
    {
      question: 'What is the runtime (in minutes) of Avatar: The Way of Water?',
      options: [
        '190 minutes',
        '191 minutes',
        '192 minutes',
        '193 minutes',
      ],
      answer: '192 minutes',
    },
    {
      question: 'What household pet meets a horrific demise in Fatal Attraction?',
      options: [
        'A kitten',
        'A bunny rabbit',
        'A hamster',
        'A guinea pig',
      ],
      answer: 'A bunny rabbit',
    },
    {
      question: 'Which child actress played Susan Walker in the 1994 film version of "Miracle on 34th Street", Matilda in the 1996 film version of Roald Dahl\'s book of the same name and Natalie Hillard in Mrs Doubtfire?',
      options: ['Lindsay Lohan', 'Mara Wilson', 'Natalie Portman', 'Kate Maberly'],
      answer: 'Mara Wilson',
    },
    {
        question: 'Which 2003 film, directed by Richard Linklater and starring Jack Black, tells the story of a substitute teacher who inspires his students to form a rock band?',
        options: [
          'School of rock',
          'House of rock',
          'House of pop',
          'School of pop',
        ],
        answer: 'School of rock',
      },
      {
        question: 'In which year were the Academy Awards, or “Oscars”, first presented?',
        options: [
          '1923',
          '1925',
          '1927',
          '1929',
        ],
        answer: '1929',
      },
      {
        question: 'Which actress plays Katniss Everdeen in the Hunger Games movies?',
        options: ['Jennifer Lopex ', 'Jennifer Hudson ', 'Jennifer Aniston ', 'Jennifer Lawrence '],
        answer: 'Jennifer Lawrence ',
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