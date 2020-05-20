export class AddTerm {
    constructor(u, c, t) {
        this.username = u;
        this.category = c;
        this.term = t;
        this.firstLetter; 
        this.database = db.collection('pojmovi');  
    } 
    
    // Setters and getters

    set username(u) {
        this._username = u;
    }

    set category(c) {
        this._category = c;
    }

    set term(t) {
        this._term = t;
    }

    get username() {
        return this._username;
    }

    get category() {
        return this._category;
    }

    get term() {
        return this._term;
    }


    // A async function that creates the document object when called
    

    async termAdder() {
        let today = new Date();
        let first = this.term[0];   
        // Document creation 
        let termDocument = {
            username: this.username,
            category: this.category,
            term: this.term,
            firstLetter: first,        
            time: firebase.firestore.Timestamp.fromDate(today)  
        }

        let deliver = await this.database.add(termDocument); 
        return deliver; 
    }


}  


// A failed attempt at checking for existing terms 

/*
    async termCheck() {
        this.database 
        .where('category', '==', this.category)
        .where('term', "==", this.term)
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
*/