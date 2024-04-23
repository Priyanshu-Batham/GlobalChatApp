import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = process.cwd();
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});

// ------------------------------Socket Coding---------------------------------->>>
//global datastructures
let onlineUserCount = 0;

io.on('connection', (socket) => {
    let username = ""

    console.log(`${socket.id} connected`)
    socket.on('newUser', (user) => {
        console.log(`${user} connected`);
        username = user;
        ++onlineUserCount;
        io.emit('updateChat', `${username} connected`)
        io.emit('updateOnlineUserCount', `${onlineUserCount} users online`)
    })

    socket.on('disconnect', () => {
        console.log(`${username} disconnected`);
        io.emit('updateChat', `${username} disconnected`);
        --onlineUserCount;
        io.emit('updateOnlineUserCount', `${onlineUserCount} users online`)
    })

    socket.on('clientSentMessage', (msg) => {
        io.emit('updateChat', `${username}:  ${msg}`);
    })
});

