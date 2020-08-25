import {Results} from "./results.js" 
// import {hallOfFame} from "./hallOfFame.js" 
// import {highScore} from "./highScore.js"

// DOM elements

    //Input and renders

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

//let back = document.getElementById('swup');
let nick = localStorage.getItem('usernameLocal'); 
    // Game elements
let letterBox = document.getElementById('randomLetter');
let gameTimer = document.getElementById('timer');
let player1 = document.getElementById('pl1');
let player2 = document.getElementById('pl2');
let answerBtn = document.getElementById('answersSubmit'); 
let scorePl1 = document.getElementById('scoreRenderPl1');
let scorePl2 = document.getElementById('scoreRenderPl2');
let declareWinner = document.getElementById('winner');
let newGame = document.getElementById('newGame');
    // Chat elements
let chatButton = document.getElementById('chatButton');
let chatForm = document.getElementById('chat-form');
let chatBody = document.getElementById('rps-wrapper');
let chatMsgList = document.getElementById('events');
    // Modal calls
// let hallOfFameCall = document.getElementById('hf'); 
// let highScoreCall = document.getElementById('hs');


    // Random letter 

let randomLetter = (letter) => {
    letterBox.innerText = letter;  
}

    // Game start

let categories = ['Država', 'Grad', 'Reka', 'Planina', 'Životinja', 'Biljka', 'Predmet'];

answerBtn.addEventListener('click', (e) => { 
    e.preventDefault(); 
    clearInterval(timer); 
    gameTimer.innerHTML = '0'; 

    let playerAnswer = [];
    let checked = [];

    playerInputElements.forEach((element) => {
        let answer = element.value;
        let regEx = answer.replace(/[^a-zA-Z0-9\S*$]/g, '').toLowerCase();
        let validated = regEx.charAt(0).toUpperCase() + regEx.slice(1);
        playerAnswer.push(validated); 
    });

    let answerCollection = async (category, index, answer) => {
        let snapshot = await db.collection('pojmovi')
            .where('kategorija', '==', category)
            .where('pojam', '==', answer)
            .get();
        
            if (snapshot.size == 1) {
                checked.push(answer)
            } else {
                checked.push('')
            } 

            if (checked.length === 7) {
                sock.emit('answers', checked); 
            }

        clearInterval(timer);
    }
    categories.forEach((category, index) => {
        answerCollection(category, index, playerAnswer[index]); 
    });

    playerAnswer = []; 
});

newGame.addEventListener('click', (e) => {
    e.preventDefault();
    location.reload();
})

    // Chat

const scrollToBottom = () => {
    chatMsgList.scrollTop = chatMsgList.scrollHeight;
}

const writeEvent = (text) => {
    const parent = document.querySelector('#events');
    const el = document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);
    scrollToBottom();
};

const onFormSubmitted = (e) => {
    e.preventDefault();
    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';
    sock.emit('message', text);
}

chatButton.addEventListener('click', (e) => {
    e.preventDefault();
    chatBody.classList.toggle('window');
})

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
            answerBtn.click(); 
            gameTimer.innerHTML = '0';
        }
    }, 1000);
}

const sock = io();

writeEvent('Dobrodošli :D') 
sock.emit('nick', nick);
sock.on('message', writeEvent); 
sock.on('start', start); 
sock.on('letter', randomLetter); 

    // Renders 

sock.on('wait', () => {
    $('#searchingModal').modal('show');
});   

sock.on('render1', async (arrMe) => {
    let arr1 = await arrMe;
    playerResultRender.forEach((el,index) => {
        el.innerText = arr1[index]; 
    })
});

sock.on('render2', async (arrMe) => {
    let arr = await arrMe
    computerResultRender.forEach((el,index) => {
        el.innerText = arr[index]; 
    })
});

sock.on('winner', async (winner) => {
    let win = await winner;
    if (win == 'draw') 
    {
        declareWinner.innerText = `Izjednačeno je!`; 
    }
    else if(win == 'zero')
    {
        declareWinner.innerText = `Nema pobednika!`; 
    }
    else 
    {
        declareWinner.innerText = `Pobednik je ${win}!`; 
    }
}); 

sock.on('answer1', (answer) => {
    playerOuputElements.forEach((el,index) => {
        el.innerText = answer[index];
    });
});

sock.on('answer2', (answer) => {
    computerOutputRender.forEach((el,index) => {
        el.innerText = answer[index];
    });
});

sock.on('score1', (score) => {
    scorePl1.innerText = `Ukupno: ${score}`
});

sock.on('score2', (score) => {
    scorePl2.innerText = `Ukupno: ${score}`
});

sock.on('updateScore', (score) => {
    let sendResult = new Results();
    sendResult.checker(score); 
});

sock.on('me', (name) => {
    player1.innerText = `${name}`; 
})

sock.on('against', async (name) => {
    let a = await name;
    player2.innerText = `${a}`;
})

sock.on('open', () => {
    resultModal.click(); 
});

sock.on('left', () => {
    sock.emit('kick', 'yes');
    $('#disconnectModal').modal('show'); 
});

chatForm.addEventListener('submit', onFormSubmitted);

// hallOfFameCall.addEventListener("click", hallOfFame); 
// highScoreCall.addEventListener('click', () => {
//     highScore()
// })