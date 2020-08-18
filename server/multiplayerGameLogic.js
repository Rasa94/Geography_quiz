
class GeoGame { 

    constructor(p1, p2) {
        this._players = [p1, p2];
        this._turns = [null, null];
        this._usernames = [null, null];
        

        this._players.forEach((player, idx) => {
            player.on('answers', (turn) => {
                this._onInput(idx, turn) 
            })
        })
        this._players.forEach((player, idx) => {
            player.on('username', (name) => {
                this._setNames(idx, name) 
            })

        })
    }


    _sendOpponent(op1, op2) {
        this._players.forEach((player) => {
            player.emit('me', op1);
            player.emit('against', op2);
        });
    }

    _scores(score1, score2) {
        this._players.forEach((player) => {
            player.emit('score1', score1);
            player.emit('score2', score2);
        }); 
    }

    _updateScores(score, playerIndex) {
        this._players[playerIndex].emit('updateScore', score);
    }

    _sendToPlayer(playerIndex, msg) { 
        this._players[playerIndex].emit('message', msg);
    }

    _sendToPlayers(msg) {
        this._players.forEach((player) => {
            player.emit('message', msg);
        });
    }

    _sendResults1(winner, res1, res2) {
        this._players.forEach((player) => {
            player.emit('render1', res1);
            player.emit('render2', res2);
        });
        this._players.forEach((player) => {
            player.emit('winner', winner);
        });
    }

    _sendAnswers(answer1, answer2) {
        this._players.forEach((player) => {
            player.emit('answer1', answer1);
            player.emit('answer2', answer2);
        });
    }

    _openModal() {
        this._players.forEach((player) => {
            player.emit('open', 'done');
        });
    }

    _onInput(playerIndex, turn) {
        this._turns[playerIndex] = turn;
        this._checkGameOver()
    }

    _setNames(playerIndex, name) {
        this._usernames[playerIndex] = name;
        //console.log(name); 
    }

    _checkGameOver() {
        const turns = this._turns;
        if(turns[0] && turns[1]) {
            this._sendToPlayers('Game over!!!');
            this._getGameResult();
            this._turns = [null, null]; 
            this._sendToPlayers('Sledeća runda!!!');
            this._openModal(); 
        }
    }

    

    _getGameResult() {
        
        this._sendOpponent(this._usernames[0], this._usernames[1]);

        const turns = this._turns;
        const players = this._usernames;
        const player1Answer = [];
        const player2Answer = []; 
        
        let firstTurn = turns[0];
        let firstPlayer = players[0];

        firstTurn.forEach(odg => {
            player1Answer.push(odg)
        });

        let secondTurn = turns[1]
        let secondPlayer = players[1];

        secondTurn.forEach(odg => {
            player2Answer.push(odg)
        });

        

        let p1Score = 0;
        let p2Score = 0; 
        let res1Arr = [];
        let res2Arr = [];
        let winner;
        let arr = [0,1,2,3,4,5,6]
  
        arr.forEach((el) => {
            if(player1Answer[el] === player2Answer[el] && player1Answer[el] !== '/' && player2Answer[el] !== '/') 
            {
                p1Score += 5;
                res1Arr.push(5)
                p2Score += 5;
                res2Arr.push(5)
            }
            if(player1Answer[el] !== player2Answer[el] && player1Answer[el] !== '/' && player2Answer[el] !== '/')
            {
                p1Score += 10;
                res1Arr.push(10)
                p2Score += 10;
                res2Arr.push(10)
            }
            if (player1Answer[el] === '/' && player2Answer[el] !== '/') 
            {
                p2Score += 15;
                res2Arr.push(15)
                p1Score += 0;
                res1Arr.push(0)
            }
            if(player2Answer[el] === '/' && player1Answer[el] !== '/') 
            {
                p1Score += 15;
                res1Arr.push(15)
                p2Score += 0;
                res2Arr.push(0)
            } 
            if(player2Answer[el] === '/' && player1Answer[el] === '/') 
            {
                p1Score += 0;
                res1Arr.push(0)
                p2Score += 0;
                res2Arr.push(0)
            } 
        });

        if (p1Score > p2Score) 
        {
            winner = firstPlayer;
        } 
        else if (p1Score < p2Score)
        {
            winner = secondPlayer;
        }
        else if (p1Score === p2Score)
        {
            winner = 'draw';
        }

        this._sendResults1(winner, res1Arr, res2Arr);
        this._sendAnswers(player1Answer, player2Answer);
        this._scores(p1Score, p2Score);
        this._updateScores(p1Score, 0);
        this._updateScores(p2Score, 1);

        
        // console.log(p1Score);
        // console.log(p2Score);
    }
}

module.exports = GeoGame; 
