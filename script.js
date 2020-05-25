

// Class import 
import {highScore} from "./highScore.js"
import {AddTerm} from "./add.js" 

// Dom elements 
const swup = new Swup();  
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

let vid = document.getElementById('video');

let hs = document.getElementById('hs'); 

// Log in popup




// Event listeners

    // log in listener

login.addEventListener('click', () => {
    let username = loginInput.value;
    localStorage.setItem('usernameLocal', username);
})

    // Event listeners for categories buttons

formBtn.addEventListener('click', e => { 
    e.preventDefault(); 
    let category = select.value; 
    console.log(category)  
    if(category === 'Drzava') {  
        vid.innerHTML = `<video id="bgvid" autoplay loop muted>
            <source id="srcv" src='./background/country.mp4' type='video/mp4'> 
          </video>`; 
    } else if(category === 'Grad') {
        vid.innerHTML = `<video id="bgvid" autoplay loop muted>
            <source id="srcv" src='./background/city.mp4' type='video/mp4'>
          </video>`;
    } else if(category === 'Reka') {
        vid.innerHTML = `<video id="bgvid" autoplay loop muted>
            <source id="srcv" src='./background/river.mp4' type='video/mp4'>
          </video>` ;
    } else if(category === 'Planina') {
        vid.innerHTML = `<video id="bgvid" autoplay loop muted>
            <source id="srcv" src='./background/mountains.mp4' type='video/mp4'> 
          </video>`; 
    } else if(category === 'Zivotinja') { 
        vid.innerHTML = `<video id="bgvid" autoplay loop muted>
            <source id="srcv" src='./background/animal.mp4' type='video/mp4'>
          </video>`
    }  else if(category === 'Biljka') { 
        vid.innerHTML = `<video id="bgvid" autoplay loop muted>
            <source id="srcv" src='./background/plants.mp4' type='video/mp4'>
          </video>`
    } else if(category === 'Predmet') {
        vid.innerHTML = `<video id="bgvid" autoplay loop muted>
            <source id="srcv" src='./background/object.mp4' type='video/mp4'> 
          </video>`
    } 
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
    if (localStorage.usernameLocal == null ||  localStorage.categoryLocal == null || localStorage.termLocal == '') {
        alert('Unesite sve podatke!!!')
    } else { 
        obj.termCheck();   
        localStorage.setItem('categoryLocal', ''); 
        localStorage.setItem('termLocal', '');         
  
    }
           
     
}) 
 


 

                                    
 hs.addEventListener("click", highScore); 