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
   
    // answersDisplay.forEach(display => {
    //     display.innerText = 'oi';

    //     display.addEventListener('click', () => {
    //         console.log('oi');
    //         if (nextButton.classList.contains('hidden')) {
    //             nextButton.classList.remove('hidden');
    //         }
    //         console.log('oi');

    //         await waitForClick(nextButton);
    //         console.log('botao clicado! :D');
    //     })
        
    // })
   
    // for (let i = 1; i < 2; i++) {

    //     numberDisplay.innerText = `${i}/10`;
    //     questionDisplay.innerText = data.results[i].question


    //     break;
    // }
}

const waitForClick = (button) => {
    return new Promise((resolve) => {
        button.addEventListener('click', () => {
            resolve();
        })
    })
}

