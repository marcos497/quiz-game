/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/


/*----- Cached Element References  -----*/


/*-------------- Functions -------------*/


/*----------- Event Listeners ----------*/

const questions = {
    history: [
        {
            question: "What year did World War II end?",
            choices: ["1945", "1918", "1939", "1941"],
            correctAnswer: "1945"
        },
        {
            question: "Who was the first President of the United States?",
            choices: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
            correctAnswer: "George Washington"
        }
    ],
    science: [
        {
            question: "What is the chemical symbol for water?",
            choices: ["H2O", "CO2", "O2", "HCl"],
            correctAnswer: "H2O"
        },
        {
            question: "What is the largest planet in our solar system?",
            choices: ["Earth", "Saturn", "Jupiter", "Mars"],
            correctAnswer: "Jupiter"
        }
    ]
};

let currentCategory = null;
let currentQuestionIndex = 0;
let score = 0;

const categoryButtons = document.querySelectorAll('#category button');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const messageElement = document.getElementById('message');
const scoreElement = document.getElementById('score-value');
const correctAudio = document.getElementById('correct-audio');
const wrongAudio = document.getElementById('wrong-audio');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentCategory = button.id.split('-')[0];
        startGame();
    });
});

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    showNextQuestion();
    document.getElementById('category').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
}

function showNextQuestion() {
    const currentQuestion = questions[currentCategory][currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = '';
    currentQuestion.choices.forEach(choice => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.classList.add('choice');
        choiceButton.addEventListener('click', () => checkAnswer(choice));
        choicesElement.appendChild(choiceButton);
    });
}

function checkAnswer(choice) {
    const currentQuestion = questions[currentCategory][currentQuestionIndex];
    if (choice === currentQuestion.correctAnswer) {
        score++;
        messageElement.textContent = "Correct!";
        correctAudio.play();
    } else {
        messageElement.textContent = "Wrong!";
        wrongAudio.play();
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions[currentCategory].length) {
        setTimeout(showNextQuestion, 1000); // Delay before showing the next question
    } else {
        endGame();
    }
}

function endGame() {
    questionElement.textContent = "Quiz completed!";
    choicesElement.innerHTML = '';
    messageElement.textContent = `Your score: ${score}/${questions[currentCategory].length}`;
    scoreElement.textContent = score;
}
