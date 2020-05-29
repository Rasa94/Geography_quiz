
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

let letterBox = document.getElementById('letterSize');
let startGame = document.getElementById('startGame');
let gameTimer = document.getElementById('timer');
let resultModal = document.getElementById('resultModal'); 
let answerBtn = document.getElementById('answersSubmit'); 

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

let countdownTimer = () => {
    let current = 1;
    let timer = setInterval(() => {
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

let playerScore = 0;
let computerScore = 0; 

export let compareAnswers = (allAnswers, computer, player) => {
    if(allAnswers.includes(computer) && allAnswers.includes(player)) {
        if(computer === player ) {
            playerScore += 5;
            computerScore += 5;
        }
        else {
            playerScore += 10;
            computerScore += 10;
        }
    }
    else if(allAnswers.includes(computer)) {
        computerScore += 15;
    }
    else if (allAnswers.includes(player)) {
        playerScore += 15;
    }

    console.log(playerScore);
    console.log(computerScore);
} 


let categories = ['Država', 'Grad', 'Reka', 'Planina', 'Životinja', 'Biljka', 'Predmet'];
let answers = [[], [], [], [], [], [], []];
let maxIndex = 6;

answerBtn.addEventListener('click', (e) => { 
    e.preventDefault(); 

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

        if(rng() > 20) {
            computerAnswer = answers[index][Math.floor(Math.random() * answers[index].length)];
            computerResultElements[index].innerText = computerAnswer;
        }
        else
        {
            computerResultElements[index].innerText = 'Ne znam';
        }

        let playerAnswer = getPlayerAnswer(index);
        compareAnswers(answers[index], computerAnswer, playerAnswer);

        if (index == maxIndex) {
            console.log(`Final computer score: ${computerScore}`);
            console.log(`Final player score: ${playerScore}`);
        }
    }

    categories.forEach((category, index) => {
        answerCollection(category, index, "B");
    });

    //countdownTimer.clearInterval(timer);
    resultModal.click(); 
})