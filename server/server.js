const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const RpsGame = require('./multiplayerGameLogic');     
 
const app = express();

const clientPath = `${__dirname}/../public`; 
console.log(`Serving static form ${clientPath}`); 

app.use(express.static(clientPath)); 

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

let rlg = () => {
    let letters = ['A', 'B', 'V', 'G', 'D', 
                   'Đ', 'E', 'Ž', 'Z', 'I', 
                   'J', 'K', 'L', 'LJ', 'M', 
                   'N', 'NJ', 'O', 'P', 'R', 
                   'S', 'T', 'Ć', 'U', 'F', 
                   'H', 'C', 'Č', 'DŽ', 'Š'];
    let random = letters[Math.floor(Math.random()*letters.length)];
    console.log(random);
    return random
}

io.on('connection', (sock) => {
    if (waitingPlayer) 
    {
        let random = rlg()
        new RpsGame(waitingPlayer, sock);  
        [sock, waitingPlayer].forEach(s => {
            s.emit('message', 'Igra je počela!')
            s.emit('start', 'Odbrojavanje')
            s.emit('letter', random) ;
        });
        waitingPlayer = null;
        
    } 
    else 
    {
        waitingPlayer = sock;
        sock.emit('wait', 'load')  
        waitingPlayer.emit('message', 'Traži se protivnik');
    }

    sock.on('message', (text) => {
        io.emit('message', text); 
    });
});


server.on('error', (err) => {
    console.error('Server error:', err);
})

server.listen(8080, () => {
    console.log('ZG started on 8080');
})
