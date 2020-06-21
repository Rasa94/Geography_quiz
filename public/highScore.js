export let highScore = async () => {
    let arr = [];
    let snapshot = await db.collection('rezultati')

        .orderBy('broj_poena', 'desc')
        .get();
        
        snapshot.forEach(el => {
            arr.push(el.data().broj_poena);
        });
    console.log(arr)
        


}