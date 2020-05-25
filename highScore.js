// A work in progress

let renderField = document.getElementById('modalHs'); 


// This is the basic algorithm for sorting duplicates

let sortingArr = arr => {  
    arr.sort();
    let sorted = []
    let current = null;
    let counter = 0; 
    for (let i = 0; i < arr.length; i++) {  
        if (arr[i] != current) {
            if (counter > 0) {
                sorted.push(counter + `termina je uneo korisnik ${current}`); 
            }
            current = arr[i];
            counter = 1;
        } else {
            counter++;
        }
    }
    if (counter > 0) {
        sorted.push(counter + `termina je uneo korisnik ${current}`);    
    } 
    console.log(sorted.sort().reverse());   
    sorted.forEach(el => {
        renderField.innerText += el;    
    });  
}    
 


export let highScore = () => {
    let arr = [];
    let pojmovi = db.collection('pojmovi'); 
    pojmovi
        .orderBy('korisnik', 'desc')
        .get()
        .then((snapshot) => {
            snapshot.forEach(el => {
                arr.push(el.data().korisnik);
            });
        renderField.innerHTML = '';     
        sortingArr(arr); 
        })
} 




