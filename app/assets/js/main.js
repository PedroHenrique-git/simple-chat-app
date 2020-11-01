(function(){

    const socket = io('http://localhost:3000');
    const form = document.querySelector('form');
    const ul = document.querySelector('ul');
    const messageInput = document.querySelector('#message');
    let nome = prompt('Qual é o seu nome ?');

    if(nome === null || nome === undefined || nome === ''){
        while(true){
            nome = prompt('Qual é o seu nome ?');
            if(nome){
                break;
            }
        }
    }
    
    socket.emit('user-connect', nome);
    socket.on('user-connect', (nome) =>{
        const message = createMessage(`${nome} entrou no chat.`);
        ul.appendChild(message);
    });

    socket.on('chat-message', (data) =>{
        const message = createMessage(`${data.user}: ${data.msg}`);
        ul.appendChild(message);     
    });
    
    socket.on('user-disconnect', (data) =>{
        alert(`${data.user} saiu do chat.`)
    });
    
    form.addEventListener('submit',(e) =>{
        e.preventDefault();
        socket.emit('chat-message', messageInput.value);
        message.value = '';
    });

    function createMessage(msg){
        const li = document.createElement('li');
        li.innerText = msg;
        return li;
    }

})();