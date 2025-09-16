const messagesContainer = document.getElementById('chat-messages');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');

function appendMessage(text, sender = 'bot') {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerText = text;
    msgDiv.appendChild(bubble);
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = input.value.trim();
    if (!userMessage) return;
    appendMessage(userMessage, 'user');
    input.value = '';
    // Send to backend
    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: userMessage}),
        });
        const data = await res.json();
        appendMessage(data.reply, 'bot');
    } catch (err) {
        appendMessage("Sorry, I couldn't reach the server.", 'bot');
    }
});

// Initial greeting
appendMessage("Hi! I'm your responsive chatbot. How can I help you today?", 'bot');
