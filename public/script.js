
// Class import 
import {highScore} from "./highScore.js" 
import {AddTerm} from "./add.js" 

// Dom elements  
  
    // Categories
let formBtn = document.getElementById('formSubmit');
let select = document.getElementById('select'); 
    // Login
let loginInput = document.getElementById('loginInput');
let login = document.getElementById('login');
let logInButton = document.getElementById('logInButton');
    // Form 
let term = document.getElementById('term'); 
let termInput = document.getElementById('termInput'); 
let inputForm = document.getElementById('formNewDocument');    

let vid = document.getElementById('video');
let highScoreCall = document.getElementById('hs'); 
let ind = document.getElementById('index'); 
 

// Log in popup

if(!localStorage.usernameLocal){
    console.log("empty")
    logInButton.click();  
}

// log in listener

login.addEventListener('click', e => {
    e.preventDefault() 
    let username = loginInput.value;
    localStorage.setItem('usernameLocal', username);
}); 


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

    if (localStorage.usernameLocal == null ||  localStorage.categoryLocal == null || localStorage.termLocal == '') 
    {
        alert('Unesite sve podatke!!!')
    } 
    else 
    { 
        obj.termCheck();   
        localStorage.setItem('termLocal', '');    
        termInput = '';      
    } 
})  
                              
highScoreCall.addEventListener("click", highScore); 


// Event listener for categories buttons
// Also the background is changed depending of the category the user chooses

formBtn.addEventListener('click', e => { 
    e.preventDefault(); 
    let category = select.value;  
    if(category === 'Država') {  
        vid.innerHTML = `<div class="video-wrap" id="video" style="background: black url('./background/countryPlaceholder.jpg')"> 
                            <video id="bgvid" autoplay loop muted>
                                <source id="srcv" src='./background/country.mp4' type='video/mp4'>  
                            </video>  
                        </div>`;
        localStorage.setItem('categoryLocal', 'Država');  
    } 
    else if(category === 'Grad') 
    {
        vid.innerHTML = `<div class="video-wrap" id="video" style="background: black url('./background/cityPlaceholder.jpg')">
                            <video id="bgvid" autoplay loop muted>
                                <source id="srcv" src='./background/city.mp4' type='video/mp4'>
                            </video>
                        </div>    `;
        localStorage.setItem('categoryLocal', 'Grad'); 
    } 
    else if(category === 'Reka') 
    {
        vid.innerHTML = `<div class="video-wrap" id="video" style="background: black url('./background/riverPlaceholder.jpg')">
                            <video id="bgvid" autoplay loop muted>
                                <source id="srcv" src='./background/river.mp4' type='video/mp4'>
                            </video>
                        </div>` ;
        localStorage.setItem('categoryLocal', 'Reka'); 
    } 
    else if(category === 'Planina') 
    {
        vid.innerHTML = `<div class="video-wrap" id="video" style="background: black url('./background/mountainPlaceholder.jpg')">
                            <video id="bgvid" autoplay loop muted>
                                <source id="srcv" src='./background/mountains.mp4' type='video/mp4'> 
                            </video>
                        </div>`; 
        localStorage.setItem('categoryLocal', 'Planina'); 
    } 
    else if(category === 'Životinja') 
    { 
        vid.innerHTML = `<div class="video-wrap" id="video" style="background: black url('./background/animalPlaceholder.jpg')">
                            <video id="bgvid" autoplay loop muted>
                                <source id="srcv" src='./background/animal.mp4' type='video/mp4'>
                            </video>
                        </div>`
        localStorage.setItem('categoryLocal', 'Životinja'); 
    } 
     else if(category === 'Biljka') 
    { 
        vid.innerHTML = `<div class="video-wrap" id="video" style="background: black url('./background/plantPlaceholder.jpg')">
                            <video id="bgvid" autoplay loop muted>
                                <source id="srcv" src='./background/plants.mp4' type='video/mp4'>
                            </video>
                        </div`
        localStorage.setItem('categoryLocal', 'Biljka'); 
    } 
    else if(category === 'Predmet') 
    {
        vid.innerHTML = `<div class="video-wrap" id="video" style="background: black url('./background/objectPlaceholder.jpg')">
                            <video id="bgvid" autoplay loop muted>
                                <source id="srcv" src='./background/object.mp4' type='video/mp4'> 
                            </video>
                         </div>   `;
        localStorage.setItem('categoryLocal', 'Predmet');  
    } 
})


