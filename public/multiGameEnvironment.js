import {highScore} from "./highScore.js" 

let playerInputElements = [
    document.getElementById('playerInputDr'),
    document.getElementById('playerInputGr'),
    document.getElementById('playerInputRe'),
    document.getElementById('playerInputPl'),
    document.getElementById('playerInputZi'),
    document.getElementById('playerInputBi'),
    document.getElementById('playerInputPr')
];

let playerOuputElements = [
    document.getElementById('playerResultDr'),
    document.getElementById('playerResultGr'),
    document.getElementById('playerResultRe'),
    document.getElementById('playerResultPl'),
    document.getElementById('playerResultZi'),
    document.getElementById('playerResultBi'),
    document.getElementById('playerResultPr')
];

let playerResultRender = [
    document.getElementById('plResFieldDr'),
    document.getElementById('plResFieldGr'),
    document.getElementById('plResFieldRe'),
    document.getElementById('plResFieldPl'),
    document.getElementById('plResFieldZi'),
    document.getElementById('plResFieldBi'),
    document.getElementById('plResFieldPr')
]

let computerResultRender = [
    document.getElementById('coResFieldDr'),
    document.getElementById('coResFieldGr'),
    document.getElementById('coResFieldRe'),
    document.getElementById('coResFieldPl'),
    document.getElementById('coResFieldZi'),
    document.getElementById('coResFieldBi'),
    document.getElementById('coResFieldPr')
]

let computerOutputRender = [
    document.getElementById('computerResultDr'),
    document.getElementById('computerResultGr'),
    document.getElementById('computerResultRe'),
    document.getElementById('computerResultPl'),
    document.getElementById('computerResultZi'),
    document.getElementById('computerResultBi'),
    document.getElementById('computerResultPr')
]

let letterBox = document.getElementById('letterSize');
let gameTimer = document.getElementById('timer');
let answerBtn = document.getElementById('answersSubmit'); 
let back = document.getElementById('swup');
let highScoreCall = document.getElementById('hs'); 
let declareWinner = document.getElementById('winner');
let player1 = document.getElementById('pl1');
let player2 = document.getElementById('pl2');
let nick = localStorage.getItem('usernameLocal')
let scorePl1 = document.getElementById('scoreRenderPl1');
let scorePl2 = document.getElementById('scoreRenderPl2');
let newGame = document.getElementById('newGame');
let chatButton = document.getElementById('chatButton');


// Random letter 

let randomLetter = (letter) => {
    letterBox.innerText = letter;  
}

// Timer 

let timer;
let start = () => {
    $('#searchingModal').modal('hide');
    sock.emit('username', nick);
    playerInputElements.forEach(el => {
        el.disabled = false;  
    });
    let current = 1;
    timer = setInterval(() => {
        let counter = 90 - current;
        current += 1;
        gameTimer.innerHTML = counter

        if (counter == 0) {
            clearInterval(timer);
            gameTimer.innerHTML = '0';
            resultModal.click(); 
        }
    }, 1000);
}

let categories = ['Država', 'Grad', 'Reka', 'Planina', 'Životinja', 'Biljka', 'Predmet'];
let checked = []

answerBtn.addEventListener('click', (e) => { 
    e.preventDefault(); 
    clearInterval(timer);   
    let playerAnswer = [];
    playerInputElements.forEach((element) => {
        playerAnswer.push(element.value); 
    });

    let answerCollection = async (category, index ,answer) => {
        let snapshot = await db.collection('pojmovi')
            .where('kategorija', '==', category)
            .where('pojam', '==', answer)
            .get();
        
            if (snapshot.size == 1) {
                checked.push(answer)
            } 
            else if (answer == '')
            {
                checked.push('/')
                //playerOuputElements[index].innerText = 'Nema odgovora';

            } 
            else
            {
                checked.push('/') 
                //playerOuputElements[index].innerText = 'Pojam nije u bazi'; 
            }
        clearInterval(timer);
    }

    categories.forEach((category, index) => {
        answerCollection(category, index, playerAnswer[index]); 
    });

    console.log(checked); 
    let interval = setInterval(() => {
        if (checked != 0) {
            sock.emit('answers', checked); 
            clearInterval(interval) 
        }
    }, 500)  
    playerAnswer = []; 
});

newGame.addEventListener('click', (e) => {
    e.preventDefault();
    location.reload();
})

let openResultModal = () => {
    resultModal.click(); 
}

const renderResults1 = async (arrMe) => {
    let arr1 = await arrMe;
    playerResultRender.forEach((el,index) => {
        el.innerText = arr1[index]; 
    })
}

const renderResults2 = async (arrMe) => {
    let arr = await arrMe
    computerResultRender.forEach((el,index) => {
        el.innerText = arr[index]; 
    })
}

const renderAnswer1 = (answer) => {
    playerOuputElements.forEach((el,index) => {
        el.innerText = answer[index];
    });
}

const renderAnswer2 = (answer) => {
    computerOutputRender.forEach((el,index) => {
        el.innerText = answer[index];
    });
}

const renderName1 =  (name) => {
    player1.innerText = `${name}`; 
}

const renderName2 = async (name) => {
    let a = await name;
    player2.innerText = `${a}`;
}

const renderFirstScore = (score) => {
    scorePl1.innerText = `Ukupno: ${score}`
}

const renderSecondScore = (score) => {
    scorePl2.innerText = `Ukupno: ${score}`
}

const renderWinner = async (winner) => {
    let win = await winner;
    if (win == 'draw') 
    {
        declareWinner.innerText = `Izjednačeno je!`; 
    }
    else {
        declareWinner.innerText = `Pobednik je ${win}`; 
    }
}

const writeEvent = (text) => {
    // Ul element
    const parent = document.querySelector('#events');
    //Li element
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
};

const onFormSubmitted = (e) => {
    e.preventDefault();

    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';

    sock.emit('message', text);
}

let loading = () => {
    console.log('waiting')
    $('#searchingModal').modal('show');
}

    let chatBody = document.getElementById('rps-wrapper');

chatButton.addEventListener('click', (e) => {
    e.preventDefault();
    chatBody.classList.toggle('window');
})




writeEvent('Dobrodošli :D')  

const sock = io();
sock.on('message', writeEvent); 
sock.on('start', start); 
sock.on('letter', randomLetter); 
sock.on('wait', loading);   
sock.on('render1', renderResults1);
sock.on('render2', renderResults2);
sock.on('winner', renderWinner); 
sock.on('answer1', renderAnswer1);
sock.on('answer2', renderAnswer2);
sock.on('score1', renderFirstScore);
sock.on('score2', renderSecondScore);
sock.on('me', renderName1)
sock.on('against', renderName2)
sock.on('open', openResultModal);

document.querySelector('#chat-form').addEventListener('submit', onFormSubmitted);
highScoreCall.addEventListener("click", highScore); 
