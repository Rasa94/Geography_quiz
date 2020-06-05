


class RpsGame { 

    constructor(p1, p2) {
        this._players = [p1, p2];
        this._turns = [null, null];

        this._sendToPlayers('Igra je pocela!');
        
        this._players.forEach((player, idx) => {
            player.on('answers', (turn) => {
                this._onInput(idx, turn) 
            })
        })
    }

    _sendToPlayer(playerIndex, msg) { 
        this._players[playerIndex].emit('message', msg);
    }

    _sendToPlayers(msg) {
        this._players.forEach((player) => {
            player.emit('message', msg);
        });
    }

    _onInput(playerIndex, turn) {
        this._turns[playerIndex] = turn;
        this._checkGameOver()
    }

    _checkGameOver() {
        const turns = this._turns;

        if(turns[0] && turns[1]) {
            this._sendToPlayers('Game over!!!');
            this._getGameResult();
            this._turns = [null, null]; 
            this._sendToPlayers('Sledeća runda!!!');
        }
    }

    

    _getGameResult() {
        const turns = this._turns;
        const player1Answer = [];
        const player2Answer = []; 
        
        let firstTurn = turns[0]
        firstTurn.forEach(odg => {
            player1Answer.push(odg)
        });

        let secondTurn = turns[1]
        secondTurn.forEach(odg => {
            player2Answer.push(odg)
        });
    
        let p1Score = 0;
        let p2Score = 0; 
        let arr = [0,1,2,3,4,5,6]
  
        arr.forEach((el) => {
            if(player1Answer[el] === player2Answer[el] && player1Answer[el] !== '/' && player2Answer[el] !== '/') 
            {
                p1Score += 5;
                p2Score += 5;
            }
            if(player1Answer[el] !== player2Answer[el] && player1Answer[el] !== '/' && player2Answer[el] !== '/')
            {
                p1Score += 10;
                p2Score += 10;
            }
            if (player1Answer[el] === '/' && player2Answer[el] !== '/') 
            {
                p2Score += 15;
                p1Score += 0;
            }
            if(player2Answer[el] === '/' && player1Answer[el] !== '/') 
            {
                p1Score += 15;
                p2Score += 0;
            } 
        });

        if (p1Score > p2Score) 
        {
            this._sendToPlayers(`Prvi takmičar je pobednik!!!`)
        } 
        else if (p1Score < p2Score)
        {
            this._sendToPlayers(`Drugi takmičar je pobednik!!!`)
        }
        else 
        {
            this._sendToPlayers(`Izjednačeno je!!!`)
        }

        console.log(p1Score);
        console.log(p2Score);

        console.log(player1Answer);
        console.log(player2Answer);
    }
}

module.exports = RpsGame; 
