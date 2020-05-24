export class AddTerm {
    constructor(u, c, t) {
        this.korisnik = u;
        this.kategorija = c;
        this.pojam = t;
        this.pocetnoSlovo; 
        this.database = db.collection('pojmovi');  
    } 
    
    // Setters and getters

    set korisnik(u) {
        this._korisnik = u;
    }

    set kategorija(c) {
        this._kategorija = c;
    }

    set pojam(t) {
        this._pojam = t;
    }

    get korisnik() {
        return this._korisnik;
    }

    get kategorija() {
        return this._kategorija;
    }

    get pojam() {
        return this._pojam;
    }


    // A async function that creates the document object when called
    
    async termAdder() {
        let today = new Date();
        let first = this.pojam[0];     
        // Document creation 
        let termDocument = {
            korisnik: this.korisnik,
            kategorija: this.kategorija,
            pojam: this.pojam,
            pocetnoSlovo: first,          
            vreme: firebase.firestore.Timestamp.fromDate(today)  
        }

        let deliver = await this.database.add(termDocument); 
        return deliver; 
    }


    // Another async function, this one checks if the term we added is a duplicate

    async termCheck() {
        this.database 
                    .where('kategorija', '==', this.kategorija)
                    .where('pojam', '==', this.pojam)
                    .get()
                    .then(snapshot => {
                        if (snapshot.docs.length == 0) {
                            this.termAdder();
                        } else {
                            alert("The term exists allready, this is a duplicate"); 
                        }
                        
                    })
                    .catch(error => {
                        console.error(error);
                    })
    }
} 
    
 


 




/*
    
    async termAdder() {
        let today = new Date();
        let first = this.pojam[0];     
        // Document creation 
        let termDocument = {
            korisnik: this.korisnik,
            kategorija: this.kategorija,
            pojam: this.pojam,
            pocetnoSlovo: first,          
            vreme: firebase.firestore.Timestamp.fromDate(today)  
        }

        let deliver = await this.database.add(termDocument); 
        return deliver; 
    }


    // Another async function, this one checks if the term we added is a duplicate

    async termCheck() {
        this.database 
                    .where('kategorija', '==', this.kategorija)
                    .where('pojam', '==', this.pojam)
                    .get()
                    .then(snapshot => {
                        if (snapshot.docs.length == 0) {
                            this.termAdder();
                        } else {
                            alert("The term exists allready, this is a duplicate"); 
                        }
                        
                    })
                    .catch(error => {
                        console.error(error);
                    })
    }
} 


*/ 


