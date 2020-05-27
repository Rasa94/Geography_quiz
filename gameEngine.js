
// DOM elements used to render the answers

let drzava = document.getElementById('drzava');
let grad = document.getElementById('grad');
let reka = document.getElementById('reka');
let planina = document.getElementById('planina');
let zivotinja = document.getElementById('zivotinja');
let biljka = document.getElementById('biljka');
let predmet = document.getElementById('predmet');

// Random number generator

let rng = () => {
    let random = Math.floor(Math.random() * 100) + 1; 
    return random;
} 


const answer = {
    drzava: [], 
    grad: [],
    reka: [],
    planina: [],
    zivotinja: [],
    biljka: [],
    predmet: [] 
} 



export let theBigFunction = (randomLetter) => {

    // Prepares the object and inserts all the terms that match the random letter
 
    let l = randomLetter;
    db.collection('pojmovi') 
        .where('pocetnoSlovo', '==', l)
        .get() 
        .then(snapshot => {
            snapshot.docs.forEach(doc=>{   
                switch(doc.data().kategorija){ 
                    case "Država":
                        answer.drzava.push(doc.data().pojam);
                        break;
                    case "Grad":
                        answer.grad.push(doc.data().pojam)
                        break;
                    case "Reka":
                        answer.reka.push(doc.data().pojam)
                        break;
                    case "Planina":
                        answer.planina.push(doc.data().pojam)
                        break;
                    case "Životinja":
                        answer.zivotinja.push(doc.data().pojam)
                        break;
                    case "Biljka":
                        answer.biljka.push(doc.data().pojam)
                        break;
                    case "Predmet":
                        answer.predmet.push(doc.data().pojam)
                        break;      
            }     
        }) 
    })

    console.log(answer);
    return answer;


}
  

// This function formulates the answer based on the object that we get from the prepareAnswer function and renders it

export let formulateAnswer = (obj) => {
    if(rng() <= 20){
        let odgovor = 'Ne znam';
        drzava.innerText = `${odgovor}`;    
    } else { 
        let odgovor = obj.drzava[Math.floor(Math.random()*obj.drzava.length)];        
        console.log(odgovor); 
        drzava.innerText = odgovor;         
    }
    if(rng() <= 20){
        let odgovor = 'Ne znam';
        grad.innerText = odgovor    
    } else {
        let odgovor = obj.grad[Math.floor(Math.random()*obj.grad.length)];   
        grad.innerText = odgovor;       
    }
    if(rng() <= 20){
        let odgovor = 'Ne znam';
        reka.innerText = odgovor      
    } else {
        let odgovor = obj.reka[Math.floor(Math.random()*obj.reka.length)];
        reka.innerText = odgovor;       
    }
    if(rng() <= 20){
        let odgovor = 'Ne znam';
        planina.innerText = odgovor;    
    } else {
        let odgovor = obj.planina[Math.floor(Math.random()*obj.planina.length)];
        planina.innerText = odgovor;  
    }
    if(rng() <= 20){
        let odgovor = 'Ne znam';
        zivotinja.innerText = odgovor;    
    } else {
        let odgovor = obj.zivotinja[Math.floor(Math.random()*obj.zivotinja.length)];
        zivotinja.innerText = odgovor;     
    }
    if(rng() <= 20){
        let odgovor = 'Ne znam';
        biljka.innerText = odgovor;    
    } else {
        let odgovor = obj.biljka[Math.floor(Math.random()*obj.biljka.length)];
        biljka.innerText = odgovor;    
    }
    if(rng() <= 20){
        let odgovor = 'Ne znam';
        predmet.innerText = odgovor;    
    } else {
        let odgovor = obj.predmet[Math.floor(Math.random()*obj.predmet.length)];
        predmet.innerText = odgovor;      
    }   

    // Return obj
} 



