// A work in progress

let renderField = document.getElementById('modalHs'); 

// This is the basic algorithm for sorting duplicates

let sortingArr = arr => {  
    let sorted = []; 
    let current = null;
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {  
        if (arr[i] != current) {
            if (counter > 0) {
                sorted.push([[Number(counter)], [`${current}`]]);   /*[`${current}`]*/ 
            }
            current = arr[i];
            counter = 1;
        } else {
            counter++;
        }
    }
    if (counter > 0) {
        sorted.push([[Number(counter)], [`${current}`]]);       
    } 
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
     
    arr.sort(sortFunction);

    function sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    } 
    
    
    console.log(arr); 
} 




