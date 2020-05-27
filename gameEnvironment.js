// Game engine import
import {theBigFunction} from "./gameEngine.js"
import {formulateAnswer} from "./gameEngine.js"  
//import {kviz} from "./gameEngine.js"   


// DOM elements for user inputs

let plDrzava = document.getElementById('playerInputDr');
let plGrad = document.getElementById('playerInputGr');
let plReka = document.getElementById('playerInputRe');
let plPlanina = document.getElementById('playerInputPl');
let plZivotinja = document.getElementById('playerInputZi');
let plBiljka = document.getElementById('playerInputBi');
let plPredmet = document.getElementById('playerInputPr');

// Dom player results

let plDrzavaRes = document.getElementById('playerResultDr');
let plGradRes = document.getElementById('playerResultGr');
let plRekaRes = document.getElementById('playerResultRe');
let plPlaninaRes = document.getElementById('playerResultPl');
let plZivotinjaRes = document.getElementById('playerResultZi');
let plBiljkaRes = document.getElementById('playerResultBi');
let plPredmetRes = document.getElementById('playerResultPr');

// Dom computer results

let compDrzavaRes = document.getElementById('computerResultDr');
let compGradRes = document.getElementById('computerResultGr');
let compRekaRes = document.getElementById('computerResultRe');
let compPlaninaRes = document.getElementById('computerResultPl');
let compZivotinjaRes = document.getElementById('computerResultZi');
let compBiljkaRes = document.getElementById('computerResultBi');
let compPredmetRes = document.getElementById('computerResultPr'); 

// DOM elements

let letterBox = document.getElementById('letterSize');
let startGame = document.getElementById('startGame');
let gameTimer = document.getElementById('timer');
let resultModal = document.getElementById('resultModal'); 
//

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
            gameTimer.innerHTML = '0'
        }
    }, 1000);
}


// Game start
    
startGame.addEventListener('click', e => {
        e.preventDefault();
        let random = rlg();
        letterBox.innerHTML = random;
        countdownTimer();  
        console.log('started')
    }) 
    


/*

    
 */
    answerBtn.addEventListener('click', e => { 
        e.preventDefault(); 
        let playerAnswer = [
            [plDrzava.value], 
            [plGrad.value],
            [plReka.value],
            [plPlanina.value],
            [plZivotinja.value],
            [plBiljka.value],
            [plPredmet.value] 
         ]
        plDrzavaRes.innerText = playerAnswer[0];
        plGradRes.innerText = playerAnswer[1];
        plRekaRes.innerText = playerAnswer[2];
        plPlaninaRes.innerText = playerAnswer[3];
        plZivotinjaRes.innerText = playerAnswer[4];
        plBiljkaRes.innerText = playerAnswer[5];
        plPredmetRes.innerText = playerAnswer[6];
        console.log(playerAnswer);  
        resultModal.click(); 
    })
     












// Game ends
// Results 















/*

let lett = "B";   
    let object = theBigFunction(lett);
    console.log(object); 
    formulateAnswer(object); 

*/ 

/*

    let glavniNiz = []
    let kategorije = ['Država', 'Grad', 'Reka', 'Planina', 'Životinja', 'Biljka', 'Predmet']
    
    
    let kviz = (kategorija) => {
        db.collection('pojmovi') 
            .where('pocetnoSlovo', '==', "B") 
            .where('kategorija', '==', kategorija)
            .get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    glavniNiz.push(doc.data().pojam);
                })
            })    
    }

    kategorije.forEach(kategorija => {
        kviz(kategorija) 
    }) 

    console.log(glavniNiz);
    
*/