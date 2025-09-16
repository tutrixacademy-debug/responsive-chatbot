const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple rule-based chatbot logic
function getBotReply(message) {
    const msg = message.trim().toLowerCase();
    if (msg.includes('hello') || msg.includes('hi')) {
        return "Hello! How can I assist you today?";
    } else if (msg.includes('help')) {
        return "Sure, I'm here to help! You can ask me anything.";
    } else if (msg.includes('bye')) {
        return "Goodbye! Have a great day!";
    } else if (msg.includes('name')) {
        return "I'm your simple chatbot. You can upgrade my logic anytime!";
    } else {
        return "I'm not sure how to respond to that yet, but I'm learning!";
    }
}

// API endpoint
app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message || '';
    const reply = getBotReply(userMessage);
    res.json({reply});
});

// Start server
app.listen(PORT, () => {
    console.log(`Chatbot server running at http://localhost:${PORT}`);
});