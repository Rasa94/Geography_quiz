import {hallOfFame} from "./hallOfFame.js" 
//import {Results} from "./highScore.js" 


// DOM elements

let playerInputElements = [
    document.getElementById('playerInputDr'),
    document.getElementById('playerInputGr'),
    document.getElementById('playerInputRe'),
    document.getElementById('playerInputPl'),
    document.getElementById('playerInputZi'),
    document.getElementById('playerInputBi'),
    document.getElementById('playerInputPr')
];

let playerResultElements = [
    document.getElementById('playerResultDr'),
    document.getElementById('playerResultGr'),
    document.getElementById('playerResultRe'),
    document.getElementById('playerResultPl'),
    document.getElementById('playerResultZi'),
    document.getElementById('playerResultBi'),
    document.getElementById('playerResultPr')
];

let computerResultElements = [
    document.getElementById('computerResultDr'),
    document.getElementById('computerResultGr'),
    document.getElementById('computerResultRe'),
    document.getElementById('computerResultPl'),
    document.getElementById('computerResultZi'),
    document.getElementById('computerResultBi'),
    document.getElementById('computerResultPr')
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

let letterBox = document.getElementById('randomLetter');
let startGame = document.getElementById('startGame');
let gameTimer = document.getElementById('timer');
let resultModal = document.getElementById('resultModal'); 
let answerBtn = document.getElementById('answersSubmit'); 
let scoreRenderPl = document.getElementById('scoreRenderPl');
let scoreRenderComp = document.getElementById('scoreRenderComp'); 
let declareWinner = document.getElementById('winner');
let hallOfFameCall = document.getElementById('hf'); 
let newGame = document.getElementById('newGame');
let highScore = document.getElementById('hs');


    // Random letter generator

let rlg = () => {
    let letters = ['A', 'B', 'V', 'G', 'D', 
                   'Đ', 'E', 'Ž', 'Z', 'I', 
                   'J', 'K', 'L', 'LJ', 'M', 
                   'N', 'NJ', 'O', 'P', 'R', 
                   'S', 'T', 'Ć', 'U', 'F', 
                   'H', 'C', 'Č', 'DŽ', 'Š'];
    let random = letters[Math.floor(Math.random()*letters.length)];
    console.log(random);
    return random;
}
 
    // Timer 

let timer;
let countdownTimer = () => {
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

    // Game start

let random;     
startGame.addEventListener('click', e => {
        e.preventDefault();
        playerInputElements.forEach(el => {
            el.disabled = false;  
        });
        random = rlg();
        letterBox.innerHTML = random;
        countdownTimer();  
        console.log('started') 
})

let getPlayerAnswer = (index) => {
    playerResultElements[index].innerText = playerInputElements[index].value;
    return playerInputElements[index].value;
}

let rng = () => {
    let random = Math.floor(Math.random() * 100) + 1; 
    return random;
}  

let playerScore;
let computerScore; 

export let compareAnswers = (allAnswers, computer, player, computerRender, playerRender) => {
    if(allAnswers.includes(computer) && allAnswers.includes(player)) {
        if(computer === player ) {
            playerScore += 5;
            playerRender.innerText = '5';
            computerScore += 5;
            computerRender.innerText = '5';
        }
        else 
        {
            playerScore += 10;
            playerRender.innerText = '10';
            computerScore += 10;
            computerRender.innerText = '10';
        }
    }
    else if(allAnswers.includes(computer)) 
    {
        computerScore += 15;
        computerRender.innerText = '15';
    }
    else if (allAnswers.includes(player)) 
    {
        playerScore += 15;
        playerRender.innerText = '15'; 
    } 
    //console.log(playerScore);
    //console.log(computerScore);
    if(!allAnswers.includes(player) && player != ''){
        playerRender.innerText = 'Pojam nije u bazi'; 
    }   
} 


let categories = ['Država', 'Grad', 'Reka', 'Planina', 'Životinja', 'Biljka', 'Predmet'];
let answers = [[], [], [], [], [], [], []];
let maxIndex = 6;

answerBtn.addEventListener('click', (e) => { 
    e.preventDefault(); 
    clearInterval(timer); 

    playerScore = 0;
    computerScore = 0;

    let answerCollection = async (category, index, randomLetter) => {
        let snapshot = await db.collection('pojmovi')
            .where('pocetnoSlovo', '==', randomLetter)
            .where('kategorija', '==', category)
            .get();

        snapshot.docs.forEach(doc => {
            answers[index].push(doc.data().pojam)
        });

        let computerAnswer = '';

        if(rng() > 20) 
        {
            computerAnswer = answers[index][Math.floor(Math.random() * answers[index].length)];
            computerResultElements[index].innerText = computerAnswer;
        }
        else
        {
            computerResultElements[index].innerText = 'Ne zna';
        }

        let playerAnswer = getPlayerAnswer(index); 
        compareAnswers(answers[index], computerAnswer, playerAnswer, computerResultRender[index], playerResultRender[index]);
        //console.log(playerAnswer);
        //console.log(computerAnswer);

        if (index == maxIndex) 
        {
            console.log(answers);
            scoreRenderPl.innerHTML = `Poeni igraca: ${playerScore}`;
            scoreRenderComp.innerHTML = `Poeni kompjutera: ${computerScore}`;
            if (computerScore > playerScore) 
            {
                declareWinner.innerText = `Kompjuter je pobednik!!!`
            } 
            else if (computerScore < playerScore)
            {
                let nick = localStorage.getItem('usernameLocal')
                declareWinner.innerText = `Korisnik ${nick} je pobednik!!!!`
            }
            else 
            {
                declareWinner.innerText = `Izjednaceno je!!!!`
            }
        } 

    }

    categories.forEach((category, index) => {
        answerCollection(category, index, "B");
    });

    resultModal.click(); 
    //console.log(playerScore);
    
})

newGame.addEventListener('click', (e) => {
    e.preventDefault();
    startGame.click();
})

hallOfFameCall.addEventListener("click", hallOfFame); 
