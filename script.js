// Class import 

import {AddTerm} from "./add.js" 

// Dom elements 

    // Categories
let formBtn = document.getElementById('formSubmit');
let select = document.getElementById('select'); 
    // Login
let no = document.getElementById('nono');  
let loginInput = document.getElementById('loginInput');
let login = document.getElementById('login');
    // Form 
let term = document.getElementById('term'); 
let termInput = document.getElementById('termInput'); 
let inputForm = document.getElementById('formNewDocument');    


// Log in popup

let checkcheck = () => {
    if(localStorage.usernameLocal == '') { 
        no.click();    
    } 
}
checkcheck() 


// Event listeners

    // log in listener

login.addEventListener('click', () => {
    let username = loginInput.value;
    localStorage.setItem('usernameLocal', username);
})

    // Event listeners for categories buttons

formBtn.addEventListener('click', e => {
    let category = select.value;  
    localStorage.setItem('categoryLocal', category);
})

    // Term clicker

term.addEventListener('click', () => {
    let input = termInput.value;
    let validated = input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    localStorage.setItem('termLocal', validated);      
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


// The object is checked if it is a duplicate and, if not, added 

inputForm.addEventListener('submit', e => {
    e.preventDefault();
    let obj = new AddTerm(checkUsername(), checkForCategory(), checkforTerm());  
    obj.termCheck();        
    checkcheck()       
}) 



 

                                    
