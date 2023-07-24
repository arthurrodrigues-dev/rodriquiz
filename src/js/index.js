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
    const answersDisplay = document.querySelectorAll('.answer');
    const nextButton = document.querySelector('.nextButton');

    console.log(data);


    for (let i = 0; i < data.results.length; i++) {
        numberDisplay.innerText = `${i + 1}/10`
        questionDisplay.innerText = data.results[i].question
        const answers = 

        

        await waitForClick(answersDisplay);
        nextButton.classList.remove('hidden');
        await waitForClick([nextButton]);
        nextButton.classList.add('hidden');
    }

}

const shuffleArray = (array) => {
   return array.sort(() => Math.random() - 0.5);
}

const waitForClick = (buttonsArray) => {
    return new Promise((resolve) => {
        buttonsArray.forEach(button => {
            button.addEventListener('click', () => {
                resolve();
            })
        })
    })
}

