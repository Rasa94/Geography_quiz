import {hallOfFame} from "./hallOfFame.js" 
import {Results} from "./results.js" 


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

let letterBox = document.getElementById('randomLetter');
let gameTimer = document.getElementById('timer');
let answerBtn = document.getElementById('answersSubmit'); 
let back = document.getElementById('swup');
let hallOfFameCall = document.getElementById('hf'); 
let declareWinner = document.getElementById('winner');
let player1 = document.getElementById('pl1');
let player2 = document.getElementById('pl2');
let nick = localStorage.getItem('usernameLocal')
let scorePl1 = document.getElementById('scoreRenderPl1');
let scorePl2 = document.getElementById('scoreRenderPl2');
let newGame = document.getElementById('newGame');
let chatButton = document.getElementById('chatButton');
let chatForm = document.getElementById('chat-form');
let chatBody = document.getElementById('rps-wrapper');


// Random letter 

let randomLetter = (letter) => {
    letterBox.innerText = letter;  
}



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
    gameTimer.innerHTML = '0'; 

    let playerAnswer = [];
    playerInputElements.forEach((element) => {
        playerAnswer.push(element.value); 
    });

    let answerCollection = async (category, index, answer) => {
        let snapshot = await db.collection('pojmovi')
            .where('kategorija', '==', category)
            .where('pojam', '==', answer)
            .get();
        
            if (snapshot.size == 1) 
            {
                checked.push(answer)
                console.log(answer);
            } 
            else 
            {
                checked.push('/')
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

    // Chat

const writeEvent = (text) => {
    const parent = document.querySelector('#events');
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

chatButton.addEventListener('click', (e) => {
    e.preventDefault();
    chatBody.classList.toggle('window');
})




writeEvent('Dobrodošli :D')  

const sock = io();



sock.on('message', writeEvent); 
sock.on('start', start); 
sock.on('letter', randomLetter); 

    // Renders 

sock.on('wait', () => {
    console.log('waiting')
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
    else {
        declareWinner.innerText = `Pobednik je ${win}`; 
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
    console.log(score)
});

sock.on('updateScore', (score) => {
    let sendResult = new Results();
    sendResult.checker(score); 
    console.log(score)
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


chatForm.addEventListener('submit', onFormSubmitted);
hallOfFameCall.addEventListener("click", hallOfFame); 




/*

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


let openResultModal = () => {
    resultModal.click(); 
}

    // Render functions 

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

let loading = () => {
    console.log('waiting')
    $('#searchingModal').modal('show');
}

   
*/

