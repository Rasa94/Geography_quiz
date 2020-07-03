let mostInputs = [
    document.getElementById('one'),
    document.getElementById('two'),
    document.getElementById('three'),
    document.getElementById('four'),
    document.getElementById('five')
]

// This is the basic algorithm for sorting duplicates

let sortingArr = arr => {  
    let sorted = []; 
    let current = null;
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {  
        if (arr[i] != current) 
        {
            if (counter > 0) 
            {
                sorted.push([[`${current}`], [Number(counter)]]);   
            }
            current = arr[i];
            counter = 1;
        } 
        else 
        {
            counter++;
        }
    }
    if (counter > 0) 
    {
        sorted.push([[`${current}`], [Number(counter)]]);       
    } 
    return sorted;
}    
 
// After the duplicates are counted the function sorts the users by how much terms they added

export let hallOfFame = async() => {
    let arr = [];
    let snapshot = await db.collection('pojmovi')
        .orderBy('korisnik', 'desc')
        .get();
        
        snapshot.forEach(el => {
            arr.push(el.data().korisnik);
        });

        let sorting = sortingArr(arr);
        sorting.sort((a,b) => a[1] - b[1]).reverse();
        let sortedArr = sorting.slice(0, 5);
        for(let i = 0; i < 6; i++)
        sortedArr.forEach((el, i) => {
            mostInputs[i].innerText = `${el[0]} -- ${el[1]}`
        });
} 




