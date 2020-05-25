// Game engine import
import {theBigFunction} from "./gameEngine.js"
import {formulateAnswer} from "./gameEngine.js"  

// DOM elements

let answerBtn = document.getElementById('answersSubmit'); 
let letterBox = document.getElementById('showLetter');

// Game start
    
    // Random letter generator

    let rlg = () => {
        let letters = ['A', 'B', 'V', 'G', 'D', 'Đ', 'E', 'Ž', 'Z', 'I', 'J', 'K', 'L', 'LJ', 'M', 'N', 'NJ', 'O', 'P', 'R', 'S', 'T', 'Ć', 'U', 'F', 'H', 'C', 'Č', 'DŽ', 'Š'];
        let random = letters[Math.floor(Math.random()*letters.length)];
        console.log(random);
        return random;
    }
    let random = rlg();
    // Display the chosen letter
    
    letterBox.innerHTML = random; 
    
     

    // Timer 
    // Not added to the html yet

    let countdownTimer = () => {
        let left = 1;
        let timer = setInterval(() => {
            let counter = 90 - left;
            left += 1;
            gameTimer.innerHTML = counter
    
            if (counter == 0) {
                clearInterval(timer);
                gameTimer.innerHTML = '0'
            }
        }, 1000);
    }

// Computer oponent answer seeking
 
answerBtn.addEventListener('click', e => {
    let lett = "D";  
    e.preventDefault(); 
    let object = theBigFunction(lett);
    console.log(object); 
    formulateAnswer(object); 
})

// Game ends
// Results 