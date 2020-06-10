let hs = [
    document.getElementById('one'),
    document.getElementById('two'),
    document.getElementById('three'),
    document.getElementById('four'),
    document.getElementById('five')
]


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
                sorted.push([[`${current}`], [Number(counter)]]);   /*[`${current}`]*/ 
            }
            current = arr[i];
            counter = 1;
        } else {
            counter++;
        }
    }
    if (counter > 0) {
        sorted.push([[`${current}`], [Number(counter)]]);       
    } 
    return sorted;
}    
 


export let highScore = async() => {
    let arr = [];
    let snapshot = await db.collection('pojmovi')
        .orderBy('korisnik', 'desc')
        .get();
        
        snapshot.forEach(el => {
            arr.push(el.data().korisnik);
        });

        let e = sortingArr(arr);
        e.sort((a,b) => a[1] - b[1]).reverse();
        let best = e.slice(0, 5);
        console.log(best);
        for(let i = 0; i < 6; i++)
        best.forEach((el, i) => {
            hs[i].innerText = `${el[0]} je uneo ${el[1]} pojmova`
        });
    
} 




