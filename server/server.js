const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const GeoGame = require('./multiplayerGameLogic');     
const { disconnect } = require('process');
 
const app = express();

const clientPath = `${__dirname}/../public`; 
console.log(`Serving static form ${clientPath}`); 

app.use(express.static(clientPath)); 

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

const rlg = () => {
    let letters = ['A', 'B', 'V', 'G', 'D', 
                   'Đ', 'E', 'Ž', 'Z', 'I', 
                   'J', 'K', 'L', 'Lj', 'M', 
                   'N', 'Nj', 'O', 'P', 'R', 
                   'S', 'T', 'Ć', 'U', 'F', 
                   'H', 'C', 'Č', 'Dž', 'Š'];
    let random = letters[Math.floor(Math.random()*letters.length)];
    console.log(random);
    return random;
}

let user1;

io.on('connection', (sock) => {

    sock.on('message', (text) => {
        io.emit('message', text); 
    });

    if(waitingPlayer)
    {
        sock.on('nick', user2 => {
        console.log(user1, user2);
        if(user1 == user2 || user1 == undefined) {
            user1 = user2;
            waitingPlayer = sock;
            sock.emit('wait', 'load');
        } 
        else
        {
            new GeoGame(waitingPlayer, sock);  
            let random = rlg();
            [sock, waitingPlayer].forEach(s => {
                s.emit('message', 'Igra je počela!')
                s.emit('start', 'Odbrojavanje')
                s.emit('letter', random) ;
            });
            waitingPlayer = null; 
            user1 = undefined;
        }});
    } 
    else 
    {
        waitingPlayer = sock;
        waitingPlayer.on('nick', user2 => {
            user1 = user2;
        })
        sock.emit('wait', 'load');
    }

    sock.on('disconnect', () => {
        console.log('disconnected');
        // io.emit('message', 'Protivnik je napustio igru');
        io.emit('left', 'disc');
        waitingPlayer = null;
    });
});

server.on('error', (err) => {
    console.error('Server error:', err);
})

server.listen(8080, () => {
    console.log('ZG started on 8080');
})

