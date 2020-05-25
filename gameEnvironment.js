// Game engine import
import {rng} from "./gameEngine.js" 
import {rlg} from "./gameEngine.js" 
import {prepareAnswer} from "./gameEngine.js"
import {formulateAnswer} from "./gameEngine.js"  

// DOM elements

let answerBtn = document.getElementById('answersSubmit'); 

// Game start
    
    // Display the chosen letter

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
    let lett = rlg();
    e.preventDefault(); 
    let arrayObj = prepareAnswer(lett);
    formulateAnswer(arrayObj); 

})

// Game ends
// Results 