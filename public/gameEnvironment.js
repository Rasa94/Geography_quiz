// Game engine import
import {answerCollection} from "./gameEngine.js"
import {formulateAnswer} from "./gameEngine.js"  
import {compareAnswers} from "./gameEngine.js"   
 

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
    

answerBtn.addEventListener('click', (e, r) => { 
    
    e.preventDefault(); 
    let random = r;
    plDrzavaRes.innerText = plDrzava.value;
    plGradRes.innerText = plGrad.value;
    plRekaRes.innerText = plReka.value;
    plPlaninaRes.innerText = plPlanina.value;
    plZivotinjaRes.innerText = plZivotinja.value;
    plBiljkaRes.innerText = plBiljka.value;
    plPredmetRes.innerText = plPredmet.value;  
    let playerAnswers = [];
    playerAnswers.push(plDrzava.value);
    playerAnswers.push(plGrad.value);
    playerAnswers.push(plReka.value); 
    playerAnswers.push(plPlanina.value);
    playerAnswers.push(plZivotinja.value);
    playerAnswers.push(plBiljka.value);
    playerAnswers.push(plPredmet.value);   

    


    console.log(playerAnswers); 
    let collection = answerCollection("B");
    console.log(collection) 
    let computerAnswers =formulateAnswer(collection); 
    let allInOne = [].concat.apply([], collection);  
    console.log(allInOne);   
    compareAnswers(allInOne, computerAnswers[1], playerAnswers[1]); 


    //countdownTimer.clearInterval();
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