let preQuestions;
let next = document.querySelector('.next');
let previous = document.querySelector('.previous');

let question = document.querySelector('.question');
let answers = document.querySelectorAll('.list-group-item');

let results = document.querySelector('.results');
let list = document.querySelector('.list');
let userScorePoint = document.querySelector('.userScorePoint');
let average = document.querySelector('.average');

let pointsElem = document.querySelector('.score');
let restart = document.querySelector('.restart');
let index = 0;
let points = 0;

let countOfGames = 1;

let promise = new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve("OK!");
    }, 250);
});

promise.then(() => {
    fetch('https://quiztai.herokuapp.com/api/quiz')
        .then(resp => resp.json())
        .then(resp => {
            preQuestions = resp;
            setQuestion(index);
        });
});



function setQuestion(index) {
    clearClass();
    question.innerHTML = '<span id=”index”>' + (index + 1) + '.' + '</span>' + ' ' + preQuestions[index].question;

    answers[0].innerHTML = preQuestions[index].answers[0];
    answers[1].innerHTML = preQuestions[index].answers[1];
    answers[2].innerHTML = preQuestions[index].answers[2];
    answers[3].innerHTML = preQuestions[index].answers[3];
    if (preQuestions[index].answers.length === 2) {
        answers[2].style.display = 'none';
        answers[3].style.display = 'none';
    } else {
        answers[2].style.display = 'block';
        answers[3].style.display = 'block';
    }

}

next.addEventListener('click', function () {
    index++;
    if (index >= preQuestions.length) {
        list.style.display = 'none';
        results.style.display = 'block';
        userScorePoint.innerHTML = points;
        localStorage.setItem('gamePoints', points);
        average.innerHTML = (JSON.parse(localStorage.getItem('gamePoints')
            * JSON.parse(localStorage.getItem('countOfGames')) + points))
            / JSON.parse(localStorage.getItem('countOfGames'));

    } else {
        setQuestion(index);
        activateAnswers();
    }

});

previous.addEventListener('click', function () {
    index--;
    if (index >= preQuestions.length) {
        list.style.display = 'none';
        results.style.display = 'block';
        userScorePoint.innerHTML = points;
    } else {
        setQuestion(index);
        disableAnswers();
    }

});

restart.addEventListener('click', function () {
    points = 0;
    countOfGames += 1;
    localStorage.setItem('countOfGames', JSON.stringify(countOfGames));
    console.log(localStorage.getItem('countOfGames'));
    index = 0;
    list.style.display = 'block';
    results.style.display = 'none';
    setQuestion(index);
    activateAnswers();
    userScorePoint.innerHTML = points;
});

function activateAnswers() {
    for (let i = 0; i < answers.length; i++) {
        answers[i].addEventListener('click', doAction);
    }
}

activateAnswers();

function doAction(event) {
    //event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
    if (event.target.innerHTML === preQuestions[index].correct_answer) {
        points++;
        pointsElem.innerText = points;
        markCorrect(event.target);
    }
    else {
        markInCorrect(event.target);
    }
    disableAnswers();
}

function markCorrect(elem) {
    elem.classList.add('correct');
}


function markInCorrect(elem) {
    elem.classList.add('incorrect');
}

function disableAnswers() {
    for (let i = 0; i < answers.length; i++) {
        answers[i].removeEventListener('click', doAction);
    }
}

function clearClass() {
    for (let i = 0; i < answers.length; i++) {
        answers[i].classList.remove('correct', 'incorrect');
    }
}


