const path = require('path');

const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('views',path.resolve(__dirname,'src','views'));
app.set('view engine','ejs');

app.get('/',(req,res) =>{
    res.render('index');
});

io.on('connection', (socket) =>{
    //console.log('a user connectec');
    socket.on('chat message', (msg) => {
        io.emit('chat message' , msg);
    });
});

http.listen(3000, () =>{
    console.log('Servidor executando na porta 3000');
});