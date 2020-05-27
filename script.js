
// Class import 
import {highScore} from "./highScore.js"
import {AddTerm} from "./add.js" 

// Dom elements 
 
    // Categories
let formBtn = document.getElementById('formSubmit');
let select = document.getElementById('select'); 
    // Login
//let no = document.getElementById('nono');  
let loginInput = document.getElementById('loginInput');
let login = document.getElementById('login');
let log = document.getElementById('nono1');
    // Form 
let term = document.getElementById('term'); 
let termInput = document.getElementById('termInput'); 
let inputForm = document.getElementById('formNewDocument');    

let vid = document.getElementById('video');

let hs = document.getElementById('hs'); 

 

// Log in popup
if(!localStorage.usernameLocal){
    console.log("empty")
    log.click();  
}




// log in listener

login.addEventListener('click', e => {
    e.preventDefault() 
    let username = loginInput.value;
    localStorage.setItem('usernameLocal', username);
}); 

// Event listener for categories buttons
// Also the background is changed depending of the category the user chooses

formBtn.addEventListener('click', e => { 
    e.preventDefault(); 
    let category = select.value;  
    console.log(category)  
    if(category === 'Država') {  
        vid.innerHTML = `<video id="bgvid" autoplay loop muted>
                            <source id="srcv" src='./background/country.mp4' type='video/mp4'> 
                            </video>`;  
        localStorage.setItem('categoryLocal', 'Država'); 
        
    } else if(category === 'Grad') {
        vid.innerHTML = `<video id="bgvid" autoplay loop muted>
                            <source id="srcv" src='./background/city.mp4' type='video/mp4'>
                            </video>`;
        localStorage.setItem('categoryLocal', 'Grad'); 
    } else if(category === 'Reka') {
        vid.innerHTML = `<video id="bgvid" autoplay loop muted>
                            <source id="srcv" src='./background/river.mp4' type='video/mp4'>
                            </video>` ;
        localStorage.setItem('categoryLocal', 'Reka'); 
    } else if(category === 'Planina') {
        vid.innerHTML = `<video id="bgvid" autoplay loop muted>
                            <source id="srcv" src='./background/mountains.mp4' type='video/mp4'> 
                            </video>`; 
        localStorage.setItem('categoryLocal', 'Planina'); 
    } else if(category === 'Životinja') { 
        vid.innerHTML = `<video id="bgvid" autoplay loop muted>
                            <source id="srcv" src='./background/animal.mp4' type='video/mp4'>
                            </video>`
        localStorage.setItem('categoryLocal', 'Životinja'); 
    }  else if(category === 'Biljka') { 
        vid.innerHTML = `<video id="bgvid" autoplay loop muted>
                            <source id="srcv" src='./background/plants.mp4' type='video/mp4'>
                            </video>`
        localStorage.setItem('categoryLocal', 'Biljka'); 
    } else if(category === 'Predmet') {
        vid.innerHTML = `<video id="bgvid" autoplay loop muted>
                            <source id="srcv" src='./background/object.mp4' type='video/mp4'> 
                            </video>`
        localStorage.setItem('categoryLocal', 'Predmet'); 
    } 
    
})


// Term validator

term.addEventListener('click', () => {
    let input = termInput.value;
    // The term can't contain any whitespace or special characters
    let validated = input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    localStorage.setItem('termLocal', validated);      
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
    if (localStorage.usernameLocal == null ||  localStorage.categoryLocal == null || localStorage.termLocal == '') {
        alert('Unesite sve podatke!!!')
    } else { 
        obj.termCheck();   
        localStorage.setItem('categoryLocal', ''); 
        localStorage.setItem('termLocal', '');         
    } 
    
})  

                                    
hs.addEventListener("click", highScore); 



