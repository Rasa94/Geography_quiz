
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

    // Method that checks if the first letter is 

    
    letterCheck(term) {
        if (
            term.slice(0, 2) === "Nj" ||
            term.slice(0, 2) === "Lj" ||
            term.slice(0, 2) === "Dž"
        ) 
        {
            let firstLetter = term.slice(0, 2);
            firstLetter.toUpperCase();
            return firstLetter;
        } 
        else 
        {
            let firstLetter = term.slice(0, 1);
            firstLetter.toUpperCase();
            return firstLetter;
        }   
    }

    // A async method that creates the document object when called
    
    async termAdder() {
        let today = new Date();
        let first = this.letterCheck(this.pojam);     
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

    // Method that checks if the term we added is a duplicate

    termCheck() {
        this.database 
                .where('kategorija', '==', this.kategorija)
                .where('pojam', '==', this.pojam)
                .get()
                .then(snapshot => {
                    if (snapshot.docs.length == 0) {
                        this.termAdder();
                        console.log('donedone')
                        $('#newDocModal').modal('show')

                    } 
                    else 
                    {
                        console.log('Term exists')
                        $('#docExistsModal').modal('show')
                    }
                })
                .catch(error => {
                    console.error(error);
                })
    }    
}   
  
