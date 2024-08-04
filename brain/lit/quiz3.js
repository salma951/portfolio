const quizData = [
    {
      question: 'What internationally-renowned British author coined the following secret phrase? "I solemnly swear that I am up to no good"?',
      options: [
        'Agatha Christie',
        'JK Rowling',
        'Emma Forrest',
        'Dorothy L. Sayers',
      ],
      answer: 'JK Rowling',
    },
    {
      question: 'In her novel "Bridget Jones\'s Diary," author Helen Fielding named love interest Mark Darcy after a character from what classic Jane Austen novel?',
      options: [
        'Mansfield Park',
        'Sense and Sensibility',
        'Pride and Prejudice',
        'Persuasion',
      ],
      answer: 'Pride and Prejudice',
    },
    {
      question: 'Where does the Wizard live in The Wizard of Oz?',
      options: ['The Emerald City', 'The Opal City', 'The Ruby City', 'The Sapphire City'],
      answer: 'The Emerald City',
    },
    {
        question: 'Indian author Vikas Swarup wrote a 2005 novel titled "Q & A" involving a game show that was (loosely) adapted into a 2008 British film that later won the Academy Award for Best Picture. What was the name of the adaptation?',
        options: [
          'Quantum of solace',
          'Slumdog Millionaire',
          'The dark knight',
          'Race',
        ],
        answer: 'Slumdog Millionaire',
      },
      {
        question: 'What 1995 coming-of-age comedy set in California is loosely based on Jane Austin\'s 1815 novel Emma?',
        options: [
          'Now and Then',
          'Clueless',
          'Moonlight',
          'Booksmart',
        ],
        answer: 'Clueless',
      },
      {
        question: 'The title character of what Charlotte Bronte novel asks Mr. Rochester, "Do you think, because I am poor, obscure, plain, and little, I am soulless and heartless"?',
        options: ['Jane Eyre', 'Jane Austen', 'Jane Eliot', 'Jane Andrews'],
        answer: 'Jane Eyre',
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