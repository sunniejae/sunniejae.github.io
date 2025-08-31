// ===== Get Elements =====
const inboxBtn = document.getElementById('inboxBtn');
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');
const chatOptions = document.getElementById('chatOptions');
const notification = document.getElementById('notification');

// ===== Chat Messages =====
const chatFlow = [
    {
        message: "Hey! Need help navigating the site?",
        options: ["Yes, please!", "No, I'm good!"]
    },
    {
        message: "Great! You can find my unprofessional resume on the left panel.",
        options: ["Show me", "Cool, thanks!"]
    },
    {
        message: "For videos and projects, check the main feed. Click any post to explore more.",
        options: ["Got it", "Thanks!"]
    },
    {
        message: "You can always come back to chat for tips anytime!",
        options: ["Will do", "Bye!"]
    }
];

let currentStep = 0;

// ===== Toggle Chat Window =====
inboxBtn.addEventListener('click', () => {
    if (chatWindow.style.display === 'none') {
        chatWindow.style.display = 'flex';
        notification.style.display = 'none'; // remove alert when opened
        showMessage();
    } else {
        chatWindow.style.display = 'none';
    }
});

// ===== Display Chat Message =====
function showMessage() {
    chatBody.innerHTML = '';
    chatOptions.innerHTML = '';
    const step = chatFlow[currentStep];

    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message me';
    msgDiv.textContent = step.message;
    chatBody.appendChild(msgDiv);

    step.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.addEventListener('click', () => {
            currentStep++;
            if (currentStep >= chatFlow.length) {
                chatBody.innerHTML += "\nChat complete!";
                chatOptions.innerHTML = '';
                return;
            }
            showMessage();
        });
        chatOptions.appendChild(btn);
    });

    chatBody.scrollTop = chatBody.scrollHeight;
}

// ===== Flashing Notification =====
setInterval(() => {
    if (chatWindow.style.display === 'none') {
        notification.style.display = notification.style.display === 'inline-block' ? 'none' : 'inline-block';
    }
}, 800);
