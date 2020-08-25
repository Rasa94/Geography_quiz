export class Results {
  constructor() {
    this.username;
    this.broj_poena;
    this.broj_igara;
    this.datum;
    this.database = db.collection('rezultati');
  }

  async checker(points) {
    let name = localStorage.usernameLocal;
    let snapshot = await this.database
            .where('username', '==', name)
            .get();
           
    if (snapshot.size == 1) {
        this.updateResult(points);
        this.updateCounter();
      } else {
        this.setResult(points);
      } 
  }

  setResult = async (points) => {
    
    let date = new Date();
    let result = {
    username: localStorage.usernameLocal,
    datum: firebase.firestore.Timestamp.fromDate(date),
    broj_poena: points,
    broj_igara: 1
    };

    let final = await this.database.doc(localStorage.usernameLocal).set(result);
    return final;
            
  }

  updateResult = (points) => {
    let incrementScore = firebase.firestore.FieldValue.increment(points);
    let gameCounter = db.collection('rezultati').doc(localStorage.usernameLocal);
    gameCounter.update({broj_poena : incrementScore});

  }

  updateCounter = () => {
    let incrementCounter = firebase.firestore.FieldValue.increment(1);
    let gameCounter = db.collection('rezultati').doc(localStorage.usernameLocal);          
    gameCounter.update({broj_igara : incrementCounter});
  }
}