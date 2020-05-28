
// Dom computer results

let compDrzavaRes = document.getElementById('computerResultDr');
let compGradRes = document.getElementById('computerResultGr');
let compRekaRes = document.getElementById('computerResultRe');
let compPlaninaRes = document.getElementById('computerResultPl');
let compZivotinjaRes = document.getElementById('computerResultZi');
let compBiljkaRes = document.getElementById('computerResultBi');
let compPredmetRes = document.getElementById('computerResultPr'); 


// Random number generator

let rng = () => {
    let random = Math.floor(Math.random() * 100) + 1; 
    return random;
} 

let answer = [[], [], [], [], [], [], []];   

export let answerCollection = (randomLetter) => {

    // Prepares the object and inserts all the terms that match the random letter
    
    let l = randomLetter;
    db.collection('pojmovi') 
        .where('pocetnoSlovo', '==', l)
        .get() 
        .then(snapshot => {
            snapshot.docs.forEach(doc=>{   
                switch(doc.data().kategorija){ 
                    case "Država":
                        answer[0].push(doc.data().pojam);
                        break;
                    case "Grad":
                        answer[1].push(doc.data().pojam)
                        break;
                    case "Reka":
                        answer[2].push(doc.data().pojam)
                        break;
                    case "Planina":
                        answer[3].push(doc.data().pojam)
                        break;
                    case "Životinja":
                        answer[4].push(doc.data().pojam)
                        break;
                    case "Biljka":
                        answer[5].push(doc.data().pojam)
                        break;
                    case "Predmet":
                        answer[6].push(doc.data().pojam)
                        break;       
            }     
        }) 
    })
    //console.log(answer);
    return answer; 
}
  

// This function formulates the answer based on the object that we get from the prepareAnswer function and renders it

let computerFormulatedAnswers = [];

export let formulateAnswer = (obj) => {
    if(rng() <= 20){
        let printAnswer = 'Ne znam';
        compDrzavaRes.innerText = printAnswer;    
    } else { 
        let printAnswer = obj[0][Math.floor(Math.random()*obj[0].length)]; 
        computerFormulatedAnswers.push(printAnswer);       
        compDrzavaRes.innerText = printAnswer;         
    }
    if(rng() <= 20){
        let printAnswer = 'Ne znam';
        compGradRes.innerText = printAnswer    
    } else {
        let printAnswer = obj[1][Math.floor(Math.random()*obj[1].length)];
        computerFormulatedAnswers.push(printAnswer);   
        compGradRes.innerText = printAnswer;       
    }
    if(rng() <= 20){
        let printAnswer = 'Ne znam';
        compRekaRes.innerText = printAnswer      
    } else {
        let printAnswer = obj[2][Math.floor(Math.random()*obj[2].length)];
        computerFormulatedAnswers.push(printAnswer);
        compRekaRes.innerText = printAnswer;       
    }
    if(rng() <= 20){
        let printAnswer = 'Ne znam';
        compPlaninaRes.innerText = printAnswer;    
    } else {
        let printAnswer = obj[3][Math.floor(Math.random()*obj[3].length)];
        computerFormulatedAnswers.push(printAnswer);
        compPlaninaRes.innerText = printAnswer;  
    }
    if(rng() <= 20){
        let printAnswer = 'Ne znam';
        compZivotinjaRes.innerText = printAnswer;    
    } else {
        let printAnswer = obj[4][Math.floor(Math.random()*obj[4].length)];
        computerFormulatedAnswers.push(printAnswer);
        compZivotinjaRes.innerText = printAnswer;     
    }
    if(rng() <= 20){
        let printAnswer = 'Ne znam';
        compBiljkaRes.innerText = printAnswer;    
    } else {
        let printAnswer = obj[5][Math.floor(Math.random()*obj[5].length)];
        computerFormulatedAnswers.push(printAnswer);
        compBiljkaRes.innerText = printAnswer;    
    }
    if(rng() <= 20){
        let printAnswer = 'Ne znam';
        compPredmetRes.innerText = printAnswer;    
    } else {
        let printAnswer = obj[6][Math.floor(Math.random()*obj[6].length)]; 
        computerFormulatedAnswers.push(printAnswer);
        compPredmetRes.innerText = printAnswer;       
    }   

    return computerFormulatedAnswers
} 


















let playerFinal;
let computerFinal; 

export let compareAnswers = (allAnswers, computer, player) => {   
    if(allAnswers.includes(computer) && allAnswers.includes(player)){
        if(computer === player ){
            playerFinal += 5;
            computerFinal += 5;
            return;
        }
        else {
            playerFinal += 10;
            computerFinal += 10;
            return;
        }
    }
    if(allAnswers.includes(computer)){
        playerFinal += 0;
        computerFinal += 15;
        return;
    }
    if (allAnswers.includes(player)){;
        playerFinal += 15;
        computerFinal += 0;
        return;
    }
    else {
        playerFinal += 0;
        computerFinal += 0;
    }
    console.log(playerFinal);
    console.log(computerFinal); 
}

