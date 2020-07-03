let highestScore = [
    document.getElementById('oneHs'),
    document.getElementById('twoHs'),
    document.getElementById('threeHs'),
    document.getElementById('fourHs'),
    document.getElementById('fiveHs')
]

export let highScore = async () => {
    let arr = [];
    let snapshot = await db.collection('rezultati')
        .orderBy('broj_poena', 'desc')
        .get();
        
        snapshot.forEach((el) => {
            arr.push([[el.data().broj_poena], [el.data().username]]);
        });

    
    arr.forEach((el, i) => {
        highestScore[i].innerText = `${el[0]} -- ${el[1]}`;
    });
}

