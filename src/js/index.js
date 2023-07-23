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
        card.parentNode.remove();
        const data = await getData(category_id[card.classList[1]]);
        startQuiz(data);
    })
})

const startQuiz = async (data) => {
    console.log("quiz initialized");
    console.log(data);
}
