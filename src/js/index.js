async function getData(id) {
    const API_URL = `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=medium&type=multiple`
    const response = await fetch(API_URL);
    return response.json();
}

const category_id = {
    "cartoon": 32,
    "anime": 31,
    "nature": 17
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
    const numberDisplay = document.querySelector('.current-question');
    const questionDisplay = document.querySelector('.question-text');
    const nextButton = document.querySelector('.nextButton');
    const divButton = document.querySelectorAll('.answer');
    const spanAnswers = document.querySelectorAll('.span-answer');
    

    console.log(data);

    for (let i = 0; i < data.results.length; i++) {
        const incorrectAnswers = data.results[i]['incorrect_answers'];
        const correct = data.results[i]['correct_answer']
        console.log("Correct answer: ");
        console.log(correct);
        let answers = incorrectAnswers.concat(correct)
        let question = data.results[i].question;

        shuffle(answers);
        
        let rightDiv;
        for (let j = 0; j < 4; j++) {
            spanAnswers[j].innerHTML = answers[j];

            if (answers[j] === correct) {
                rightDiv = spanAnswers[j].parentElement;
                console.log(rightDiv);
            }
        }
    
        numberDisplay.innerText = `${i + 1}/10`
        questionDisplay.innerHTML = question;
        

        const buttonClicked = await waitForClick(divButton);
        if (buttonClicked.children[0].innerHTML === correct) {
            buttonClicked.classList.add('correct');      
        } else {
            rightDiv.classList.add('correct');
            buttonClicked.classList.add('wrong');
        }

        nextButton.classList.remove('hidden');
        await waitForClick([nextButton]);
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

