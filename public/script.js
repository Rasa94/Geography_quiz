// import {hallOfFame} from "./hallOfFame.js" 
// import {highScore} from "./highScore.js"
import {AddTerm} from "./add.js" 

// Dom elements  
  
    // Categories
let formBtn = document.getElementById('formSubmit');
let select = document.getElementById('select'); 
    // Login
let loginInput = document.getElementById('loginInput');
let login = document.getElementById('login');
    // Form 
let term = document.getElementById('term'); 
let termInput = document.getElementById('termInput'); 
let inputForm = document.getElementById('formNewDocument');    
    // High score
// let hallOfFameCall = document.getElementById('hf'); 
// let highScoreCall = document.getElementById('hs');


    // Log in popup

$('#logInModal').modal('hide');

let popup = () => {
    $('#logInModal').modal('show');
}

if(!localStorage.usernameLocal && loginInput.value == ''){
    $('#logInModal').modal('show');
}

    // log in listener

let popUp;
login.addEventListener('click', e => { 
    e.preventDefault() 
    let username = loginInput.value;
    localStorage.setItem('usernameLocal', username);
    // console.log(localStorage.usernameLocal);
    if(!localStorage.usernameLocal || loginInput.value == '') { 
        popUp = setTimeout(popup, 1000);
    } 
    else if (localStorage.usernameLocal)
    { 
        clearTimeout(popUp);
    }
}); 

    // Term validator

term.addEventListener('click', () => {
    let input = termInput.value;
    // The term can't contain any whitespace or special characters
    let validated = input.replace(/[^a-zA-Z0-9\S*$]/g, '').toLowerCase();   
    localStorage.setItem('termLocal', validated);  
    termInput.value = '';
})

    // First letter uppercase conversion

let capitalFirst = val => {
    return val.charAt(0).toUpperCase() + val.slice(1);
}

    // The object is checked if it is a duplicate and, if not, added 

inputForm.addEventListener('submit', e => {
    e.preventDefault();
    let username = localStorage.usernameLocal;
    let categoryLocal = localStorage.categoryLocal;
    let termLocal = capitalFirst(localStorage.termLocal);
    let obj = new AddTerm(username, categoryLocal, termLocal);   

    if (localStorage.categoryLocal == null || localStorage.termLocal == '') 
    {
        $('#insufficientDataModal').modal('show');
    } 
    else 
    { 
        obj.termCheck();   
        localStorage.setItem('termLocal', '');     
    } 
})        

    // Event listener for categories buttons

formBtn.addEventListener('click', e => { 
    e.preventDefault(); 
    let category = select.value;  
    if(category === 'Država') 
    {  
        localStorage.setItem('categoryLocal', 'Država');  
    } 
    else if(category === 'Grad') 
    {
        localStorage.setItem('categoryLocal', 'Grad'); 
    } 
    else if(category === 'Reka') 
    {
        localStorage.setItem('categoryLocal', 'Reka'); 
    } 
    else if(category === 'Planina') 
    {
        localStorage.setItem('categoryLocal', 'Planina'); 
    } 
    else if(category === 'Životinja') 
    { 
        localStorage.setItem('categoryLocal', 'Životinja'); 
    } 
     else if(category === 'Biljka') 
    { 
        localStorage.setItem('categoryLocal', 'Biljka'); 
    } 
    else if(category === 'Predmet') 
    {
        localStorage.setItem('categoryLocal', 'Predmet');  
    } 
})


// hallOfFameCall.addEventListener("click", hallOfFame); 
// highScoreCall.addEventListener('click', () => {
//     highScore()
// })


/* This piece of code is for adding huge arrays of terms for each category */

/*
let terms = "";
let all = terms.split(" ");
console.log(all);

let mgc = document.getElementById('magic');

mgc.addEventListener('click', () => {
    all.forEach(element => {
        let obj = new AddTerm('Toma', 'Predmet', element);   
        obj.termCheck();
    });
});
*/