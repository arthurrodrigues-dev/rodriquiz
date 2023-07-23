import { QUIZ_API_KEY } from "./apikey.js";

async function getData(quiz_name) {
    const API_URL = `https://quizapi.io/api/v1/questions?apiKey=${QUIZ_API_KEY}&limit=5&category=${quiz_name}&difficulty=medium`
    const response = await fetch(API_URL);
    const responseJSON = await response.json();

    console.log(responseJSON);
}

const arrayQuiz = document.querySelectorAll('img');

arrayQuiz.forEach((quiz) => {
    quiz.addEventListener('click',() => {
            document.querySelector('.rodriquiz-menu').classList.add('hidden');
            getData(quiz.id);
        }
    );
})