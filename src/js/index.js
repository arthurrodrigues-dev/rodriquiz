async function getData(id) {
    const API_URL = `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=medium&type=multiple`
    const response = await fetch(API_URL);
    return response.json();
}

const category_id = {
    "cartoon": 32,
    "anime": 31,
    "comics": 29
}

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', async ()  => {
        document.querySelector('.main-menu').classList.add('hidden');
        document.querySelector('.questions').classList.remove('hidden');
        const data = await getData(category_id[card.classList[1]]);
        startQuiz(data);
    })
})

const startQuiz = async (data) => {
    // Display elements
    const numberDisplay = document.querySelector('.current-question');
    const questionDisplay = document.querySelector('.question-text');
    const spanAnswers = document.querySelectorAll('.span-answer');

    // Buttons
    const nextButton = document.querySelector('.nextButton');
    const divButton = document.querySelectorAll('.answer');
    
    let score = 0;
    for (let i = 0; i < data.results.length; i++) {
        const { incorrect_answers, correct_answer, question } = data.results[i];
        
        // shuffle answers
        let answers = incorrect_answers.concat(correct_answer)
        shuffle(answers);

        // fill the questions and answers
        numberDisplay.innerText = `${i + 1}/10`
        questionDisplay.innerHTML = question;
        
         // fill the spans and search for div right answer
         
        let rightDiv;
        for (let j = 0; j < 4; j++) {
            spanAnswers[j].innerHTML = answers[j];
            if (answers[j] === correct_answer) {
                rightDiv = spanAnswers[j].parentElement;
            }

        }

        // check the user answer and calculates the score
        const buttonClicked = await waitForClick(divButton);
        if (buttonClicked.children[0].innerHTML === correct_answer) {
            buttonClicked.classList.add('correct');      
            score++;
        } else {
            rightDiv.classList.add('correct');
            buttonClicked.classList.add('wrong');
        }

        // show the next question button
        if (i != data.results.length - 1) {
            nextButton.classList.remove('hidden');
        } else {
            document.querySelector('.score').classList.remove('hidden');
            document.querySelector('.span-score').innerHTML = score;
            return;
        }

        await waitForClick([nextButton]);

        // remove classes and hides the next question button
        buttonClicked.classList.remove('correct');
        buttonClicked.classList.remove('wrong');
        rightDiv.classList.remove('correct');
        nextButton.classList.add('hidden');
    }

}

const shuffle = (array) => {
   array.sort(() => Math.random() - 0.5);
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

