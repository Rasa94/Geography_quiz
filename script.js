// Class import 

import {AddTerm} from "./add.js" 

// Dom elements 

    // Menu
let main = document.getElementById('dropdownMenuLink');
    // Categories
let drzava = document.getElementById('drz');
let grad = document.getElementById('gr');
let reka = document.getElementById('re');
let planina = document.getElementById('pl');
let zivotinja = document.getElementById('zi');
let biljka = document.getElementById('blj');
let predmet = document.getElementById('pre');
    // Login
let loginInput = document.getElementById('loginInput');
let login = document.getElementById('login');
    // Form 
let term = document.getElementById('term'); 
let termInput = document.getElementById('termInput'); 
let inputForm = document.getElementById('formNewDocument');  
let close = document.getElementById('close');  
let no = document.getElementById('nono');


if(!localStorage.usernameLocal) {
    no.click();  
}

close.addEventListener('click', () => {
    alert('Please entey your username and log in')
}) 


// Event listeners for categories buttons
// This needs refactoring

login.addEventListener('click', () => {
    let username = loginInput.value;
    localStorage.setItem('usernameLocal', username);
})


let category;

drzava.addEventListener('click',  () => { 
    main.innerText = drzava.innerText; 
    let category = drzava.innerText; 
    localStorage.setItem('categoryLocal', category);
}) 
 
grad.addEventListener('click',  () => {
    main.innerText = grad.innerText;   
    let category  = grad.innerText;
    localStorage.setItem('categoryLocal', category);
}) 

reka.addEventListener('click', () => {
    main.innerText = reka.innerText;   
    let category = reka.innerText;
    localStorage.setItem('categoryLocal', category);
}) 

planina.addEventListener('click',  () => {
    main.innerText = planina.innerText;   
    let category  = planina.innerText;
    localStorage.setItem('categoryLocal', category);
}) 

zivotinja.addEventListener('click',  () => {
    main.innerText = zivotinja.innerText;   
    let category  = zivotinja.innerText;
    localStorage.setItem('categoryLocal', category); 
})   

biljka.addEventListener('click', () => {
    main.innerText = biljka.innerText;   
    let category  = biljka.innerText; 
    localStorage.setItem('categoryLocal', category); 
})   

predmet.addEventListener('click', () => {
    main.innerText = predmet.innerText;   
    let category  = predmet.innerText;
    localStorage.setItem('categoryLocal', category); 
})   

term.addEventListener('click', () => {
    let input = termInput.value;
    let validated = input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    localStorage.setItem('termLocal', validated); 
    console.log(validated);     
})

// Uppercase conversion

let capitalFirst = val => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

// When all values are chosen and stored in local storage they go through a check and into the object constructor

let checkUsername = () => {
    let username = localStorage.usernameLocal;
    return username;
}
 

let checkForCategory = () => {
    let categoryLocal = localStorage.categoryLocal; 
    return categoryLocal;  
} 
  

let checkforTerm = () => {
    let termLocal = capitalFirst(localStorage.termLocal);
    return termLocal;   
}


let obj = new AddTerm(checkUsername(), checkForCategory(), checkforTerm());  
// This is where the magic happens 


inputForm.addEventListener('submit', e => {
    e.preventDefault();
        db.collection('pojmovi')  
                            obj.termAdder() 
                                .then(() => inputForm.reset()) 
                                .catch(error => console.log(error))                        
                             
    }) 

                                    
                         
 
// A failed attempt at checking for existing terms
 /*
 obj.termCheck()
    .then(() => inputForm.reset()) 
    .catch(error => {
        console.error(error);
    })     
*/                            
