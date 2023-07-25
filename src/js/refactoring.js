const _selectCategory = document.querySelector('.main-menu');
const _quizContainer = document.querySelector('.container-quiz');
const _optionsUL = document.querySelector('.quiz-options');
const _question = document.querySelector('.quiz-question');
const _cards = document.querySelectorAll('.card');
const _nextBtn = document.querySelector('.nextButton');
const _currentQuestion = document.querySelector('.current-question');


const category_id = { "cartoon": 32, "anime": 31, "comics": 29}

let correctAnswer = "", score = 0, _rightAnswer;

document.addEventListener('DOMContentLoaded', () => {
    _cards.forEach(card => {
        card.addEventListener('click', async () => {
            const data = await loadQuestions(category_id[card.classList[1]]);
            setTimeout(displayQuiz, 1000);
            startQuiz(data);
        })
    })
})

const loadQuestions = async (id) => {
    const API_URL = `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=medium&type=multiple`
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
}

const displayQuiz = () => {
    _selectCategory.classList.add('hidden');
    _quizContainer.classList.remove('hidden');
}

const startQuiz = async (data) => {

    for (let i = 0; i < data.results.length; i++) {
        
        _currentQuestion.textContent = `${i + 1}/10`
        atualizeQuestionData(data.results[i]);

        // wait for user click and calculates the score
        const optionClicked = await waitForClick(_optionsUL.querySelectorAll('li'));
        
        // check the user answer
        checkAnswer(optionClicked);

        // show the next question button
        if (i != data.results.length - 1) {
            _nextBtn.classList.remove('hidden');
        } else {
            document.querySelector('.score').classList.remove('hidden');
            document.querySelector('.span-score').innerHTML = score;
            return;
        }

        await waitForClick([_nextBtn]);

        // remove classes and hides the next question button
        optionClicked.classList.remove('correct');
        optionClicked.classList.remove('wrong');
        _rightAnswer.classList.remove('correct');
        _nextBtn.classList.add('hidden');
    }

}

const atualizeQuestionData = (currentQuestion) => {
    correctAnswer = currentQuestion.correct_answer;
    let incorrectAnswer = currentQuestion.incorrect_answers;
    let listOfOptions = incorrectAnswer;

    // shuffle the correct answer inside the options list
    listOfOptions.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);

    console.log(listOfOptions);
    
    // display the question and the options
    _question.innerHTML = currentQuestion.question;
    _optionsUL.innerHTML = `
        ${listOfOptions.map((option, index) => `
            <li class="option">&#${"9" + (index + 7) < 100? "9" + (index + 7) : 100};&#41; <span class="option-span">${option}</span></li>
        `).join('')}
    `;


    // search for right li element to display
    const _options = document.querySelectorAll('.option-span');
    _options.forEach(option => {
        if (option.textContent === decodeHTML(correctAnswer)) {
            _rightAnswer = option.parentElement;
        }
    })
}

const checkAnswer = (optionClicked) => {
    if (optionClicked.children[0].textContent === decodeHTML(correctAnswer)) {
        optionClicked.classList.add('correct');
        score++;
        return;
    } 
    optionClicked.classList.add('wrong');
    _rightAnswer.classList.add('correct');
}

const decodeHTML = (string) => {
    let doc = new DOMParser().parseFromString(string, "text/html");
    return doc.documentElement.textContent;
}

const waitForClick = (buttonsArray) => {
    return new Promise((resolve) => {
        buttonsArray.forEach(button => {
            button.addEventListener('click', () => {
                resolve(button);
            })
        })
    })
}

