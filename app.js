const socket = io();

document.getElementById('go-to-signup').addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('go-to-login').addEventListener('click', () => {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    if (data.username) {
        document.getElementById('login-signup-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
        document.getElementById('messages').innerHTML = `<p>Welcome, ${data.name}</p>`;
    }
});

document.getElementById('signup').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const name = document.getElementById('signup-name').value;

    await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, name })
    });

    alert('Signup successful! Please log in.');
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

document.getElementById('send-message').addEventListener('click', () => {
    const message = document.getElementById('message-input').value;
    const sender = 'User';  // Use the actual logged-in user's name here
    socket.emit('sendMessage', { sender, content: message });
    document.getElementById('message-input').value = '';
});

socket.on('newMessage', (message) => {
    const messages = document.getElementById('messages');
    const newMessage = document.createElement('p');
    newMessage.textContent = `${message.sender}: ${message.content}`;
    messages.appendChild(newMessage);
});
