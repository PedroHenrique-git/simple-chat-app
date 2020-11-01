var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const user = {};

io.on('connection', (socket) => {
    socket.on('user-connect', (name) =>{
            user[socket.id] = name;
            socket.broadcast.emit('user-connect', name);
    });
    socket.on('users', () =>{
        socket.broadcast.emit('users', user);
    });
    socket.on('chat-message', (msg) =>{
            io.emit('chat-message', {msg, user: user[socket.id]});
    });
    socket.on('disconnect', () =>{
        socket.broadcast.emit('user-disconnect', {user: user[socket.id]});
        delete user[socket.id];
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});