let drzava = document.getElementById('drzava');
let grad = document.getElementById('grad');
let reka = document.getElementById('reka');
let planina = document.getElementById('planina');
let zivotinja = document.getElementById('zivotinja');
let biljka = document.getElementById('biljka');
let predmet = document.getElementById('predmet');


// Random letter generator

export let rlg = () => {
    let letters = ['A', 'B', 'V', 'G', 'D', 'Đ', 'E', 'Ž', 'Z', 'I', 'J', 'K', 'L', 'LJ', 'M', 'N', 'NJ', 'O', 'P', 'R', 'S', 'T', 'Ć', 'U', 'F', 'H', 'C', 'Č', 'DŽ', 'Š'];
    let random = letters[Math.floor(Math.random()*letters.length)];
    console.log(random);
    return random;
}

// Random number generator

export let rng = () => {
    let random = Math.floor(Math.random() * 100) + 1; 
    return random;
}

// Prepares the object and inserts all the terms that match the random letter

export let prepareAnswer = (randomLetter) => {
    const answer = {
        drzava: [],
        grad: [],
        reka: [],
        planina: [],
        zivotinja: [],
        biljka: [],
        predmet: []
    } 

    let l = randomLetter;

    db.collection('pojmovi') 
        .where('pocetnoSlovo', '==', l)
        .get() 
        .then((data)=>{
            data.docs.forEach(doc=>{
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

    return answer;
}

// This function formulates the answer based on the object that we get from the prepareAnswer function and renders it

export let formulateAnswer = (obj) => {
    let random = rng();
    if(random <= 20){
        let odgovor = 'Ne znam';
         odgovor;    
    } else {
        let odgovor = obj[0][Math.floor(Math.random()*obj.length)];
        drzava.innerText = odgovor;     
    }
    if(random <= 20){
        let odgovor = 'Ne znam';
         odgovor;    
    } else {
        let odgovor = obj[1][Math.floor(Math.random()*obj.length)];
        grad.innerText = odgovor;       
    }
    if(random <= 20){
        let odgovor = 'Ne znam';
        odgovor      
    } else {
        let odgovor = obj[2][Math.floor(Math.random()*obj.length)];
        reka.innerText = odgovor;       
    }
    if(random <= 20){
        let odgovor = 'Ne znam';
         odgovor;    
    } else {
        let odgovor = obj[3][Math.floor(Math.random()*obj.length)];
        planina.innerText = odgovor;  
    }
    if(random <= 20){
        let odgovor = 'Ne znam';
         odgovor;    
    } else {
        let odgovor = obj[4][Math.floor(Math.random()*obj.length)];
        zivotinja.innerText = odgovor;     
    }
    if(random <= 20){
        let odgovor = 'Ne znam';
         odgovor;    
    } else {
        let odgovor = obj[5][Math.floor(Math.random()*obj.length)];
        biljka.innerText = odgovor;    
    }
    if(random <= 20){
        let odgovor = 'Ne znam';
         odgovor;    
    } else {
        let odgovor = obj[6][Math.floor(Math.random()*obj.length)];
        predmet.innerText = odgovor;      
    }  
}

