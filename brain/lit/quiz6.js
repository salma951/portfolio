const quizData = [
    {
      question: 'Typically priced between five and 25 cents, small paperback books sent by mail were extremely popular in the early 20th century and known by what monetary name?',
      options: [
        'Nickel novels',
        'Penny novels',
        'Dime novels',
        'Quarter novels',
      ],
      answer: 'Dime novels',
    },
    {
      question: 'The term "robot" was introduced in what form of literature by Czech writer, Karel Capek, in 1920?',
      options: [
        'Poem',
        'Novel',
        'Play',
        'Short story',
      ],
      answer: 'Play',
    },
    {
      question: 'Named in part for the color of the Confederate flag, what is the name of the Scarlett and Rhett\'s child in "Gone with the Wind?"',
      options: ['Bonnie', 'Connie', 'Beau', 'Celeste'],
      answer: 'Bonnie',
    },
    {
        question: 'What Anthony Horowitz-created character is sometimes referred to as a “Teenage James Bond?” He is the main character in a series of books that starts with “Stormbreaker.”',
        options: [
          'Alex Rider',
          'Alez Ryder',
          'Alez Rider',
          'Alex Ryder',
        ],
        answer: 'Alex Rider',
      },
      {
        question: 'Author John Green set his tearjerking 2012 bestseller, "The Fault in Our Stars," in what state capital that is also Green\'s hometown?',
        options: [
          'Juneau',
          'Carson city',
          'Boise',
          'Indianapolis',
        ],
        answer: 'Indianapolis',
      },
      {
        question: 'This genre of fiction, in which novels like Dracula are told in letters, diary entries, newspaper clippings, and more mixed formats, came to prominence in the late 18th century?',
        options: ['Belles-lettres', 'Pastoral', 'Bildungsroman', 'Epistolary'],
        answer: 'Epistolary',
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