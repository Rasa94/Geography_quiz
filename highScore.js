// A work in progress

let renderField = document.getElementById('modalHs'); 
let one = document.getElementById('one'); 
let two = document.getElementById('two'); 
let three = document.getElementById('three'); 
let four = document.getElementById('four'); 
let five = document.getElementById('five');  

// This is the basic algorithm for sorting duplicates

let sortingArr = arr => {  
    arr.sort();
    let current = null;
    let counter = 0; 
    let max = 0;
    for (let i = 0; i < arr.length; i++) {  
        if (arr[i] != current) {
            if (counter > 0) {
                document.write(current + ' -->' + counter + ' times<br>'); 
            }
            current = arr[i];
            counter = 1;
        } else {
            counter++;
        }
    }
    if (counter > 0) {
        document.write(current + '--> ' + counter + ' times');
    } 
    
    // let sort = {};
    //     arr.forEach(function (x) { sort[x] = (sort[x] || 0) + 1; });
    //     console.log(sort) 
    //     // privremeno resenje
    // let first = Object.keys(sort)[0];
    // let second = Object.keys(sort)[1];
    // let third = Object.keys(sort)[2];
    // let forth = Object.keys(sort)[3];
    // let fifth = Object.keys(sort)[4];
    // let name1 = sort[first] 
    // let name2 = sort[second]
    // let name3 = sort[third]
    // let name4 = sort[forth]
    // let name5 = sort[fifth]
    // one.innerHTML = `${name1} ${first}`
    // two.innerHTML =` ${name2} ${second}`
    // three.innerHTML = `${name3} ${third}`
    // four.innerHTML = `${name4} ${forth}`
    // five.innerHTML = `${name5} ${fifth}` 
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





/*

    
let sortingArr = arr => { 
    arr.sort();
    let current = null;
    let counter = 0; 
    for (let i = 0; i < arr.length; i++) {  
        if (arr[i] != current) {
            if (counter > 0) {
                document.write(current + ' -->' + counter + ' times<br>'); 
            }
            current = arr[i];
            counter = 1;
        } else {
            counter++;
        }
    }
    if (counter > 0) {
        document.write(current + '--> ' + counter + ' times');
    } 
}  


*/ 