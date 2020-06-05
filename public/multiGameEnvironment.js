let playerInputElements = [
    document.getElementById('playerInputDr'),
    document.getElementById('playerInputGr'),
    document.getElementById('playerInputRe'),
    document.getElementById('playerInputPl'),
    document.getElementById('playerInputZi'),
    document.getElementById('playerInputBi'),
    document.getElementById('playerInputPr')
];

let playerOuputElements = [
    document.getElementById('playerResultDr'),
    document.getElementById('playerResultGr'),
    document.getElementById('playerResultRe'),
    document.getElementById('playerResultPl'),
    document.getElementById('playerResultZi'),
    document.getElementById('playerResultBi'),
    document.getElementById('playerResultPr')
];

let letterBox = document.getElementById('letterSize');
let startGame = document.getElementById('startGame');
let gameTimer = document.getElementById('timer');
let answerBtn = document.getElementById('answersSubmit'); 
let back = document.getElementById('swup');


// Random letter 

let randomLetter =(letter) => {
    letterBox.innerText = letter;  
}

// Timer 

let timer;
let start = () => {
    playerInputElements.forEach(el => {
        el.disabled = false;  
    });
    let current = 1;
    timer = setInterval(() => {
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

let categories = ['Država', 'Grad', 'Reka', 'Planina', 'Životinja', 'Biljka', 'Predmet'];
let checked = []


answerBtn.addEventListener('click', (e) => { 
    e.preventDefault(); 
    clearInterval(timer);   
    let playerAnswer = [];
    playerInputElements.forEach((element) => {
        playerAnswer.push(element.value); 
    });

    let answerCollection = async (category, index ,answer) => {
        let snapshot = await db.collection('pojmovi')
            .where('kategorija', '==', category)
            .where('pojam', '==', answer)
            .get();
        
            if (snapshot.size == 1) {
                checked.push(answer)
                playerOuputElements[index].innerText = answer;
            } 
            else if (answer == '')
            {
                checked.push('/')
                playerOuputElements[index].innerText = 'Nema odgovora';

            } 
            else
            {
                checked.push('/') 
                playerOuputElements[index].innerText = 'Pojam nije u bazi'; 
            }
    }


    categories.forEach((category, index) => {
        answerCollection(category, index, playerAnswer[index]); 
    });

/*
    let checkeckeck = async(arr) => {
        let chchc = await arr;
        sock.emit('answers', chchc); 
    }
*/

    console.log(checked); 
    let interval = setInterval(() => {
        if (checked != 0) {
            sock.emit('answers', checked); 
            clearInterval(interval) 
        }
    }, 500)  

    resultModal.click(); 
    playerAnswer = []; 
});



const writeEvent = (text) => {
    // Ul element
    const parent = document.querySelector('#events');
    //Li element
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
};

const onFormSubmitted = (e) => {
    e.preventDefault();

    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';

    sock.emit('message', text);
}

/*
let loading = () => {
    back.innerHTML += ` 
    <div id="backdrop" class="backdrop">
        <div class="text-center" id="spinnerBack">
            <div class="spinner-border"  style="width: 3rem; height: 3rem;" id="spinner" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>`
}
*/

writeEvent('Dobrodošli :D')  
let nick = localStorage.getItem('usernameLocal')

const sock = io();
sock.on('message', writeEvent); 
sock.on('start', start); 
sock.on('letter', randomLetter); 
sock.emit('user', nick)
//sock.on('wait', loading);   

document.querySelector('#chat-form').addEventListener('submit', onFormSubmitted);