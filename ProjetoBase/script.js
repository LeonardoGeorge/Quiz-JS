// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// Events 
document.querySelector('.scoreArea button').addEventListener('click', reset);


// Functions
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        
        let optionHTML = '';
        for(let i in q.options) {
            optionHTML += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionHTML;
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent)
        })

    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickOption) {
        correctAnswers++;
    } 
    currentQuestion++;
    showQuestion();
     
}

function finishQuiz() {
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;

    let points = Math.floor((correctAnswers / questions.length) * 100);
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`

    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${currentQuestion} e acertou ${correctAnswers}`; 

    if(points < 40 ){
        document.querySelector('.scoreText1').innerHTML = 'Ta ruim em!'
        document.querySelector('.scorePct').style.color = '#ff0000';
    } else if(points >= 40 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Ta na media!'
        document.querySelector('.scorePct').style.color = '#ffff00';
    } else if(points > 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!'
        document.querySelector('.scorePct').style.color = '#026830';
    }
}

function reset() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}