// Piet Ai Chatbot Widget - exacte kopie van Piet.html
(function() {
  // --- CSS ---
  const style = document.createElement('style');
  style.textContent = `
    body {
      margin: 0;
      padding: 0;
      background: transparent;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    #chat-open-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 80px;
      height: 80px;
      background: none;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 2147483647;
      border: 2px solid #fff;
      outline: none;
      transition: background 0.2s;
      padding: 0;
      position: fixed;
    }
    #chat-type-anim {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      color: #fff;
      font-weight: 700;
      font-size: 1.1em;
      text-shadow: 0 2px 8px #000,0 0 2px #000;
      background: rgba(0,0,0,0.25);
      padding: 4px 10px;
      pointer-events: none;
      white-space: nowrap;
      border-radius: 16px;
    }
    #chat-open-btn img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      display: block;
    }
    #chat-open-btn:hover {
      background: #a07a10;
    }
    #chatbot-window {
      position: fixed;
      bottom: 120px;
      right: 24px;
      width: 370px;
      height: 600px;
      background: #18182a;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.45);
      display: flex;
      flex-direction: column;
      z-index: 2147483647;
      overflow: hidden;
      transition: opacity 0.2s, transform 0.2s;
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
      border: none;
    }
    #chatbot-window::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(20,20,20,0.55);
      z-index: 0;
    }
    .chatbot-header, .chatbot-messages, .chatbot-input-row {
      position: relative;
      z-index: 1;
    }
    #chatbot-window.closed {
      opacity: 0;
      pointer-events: none;
      transform: translateY(40px);
    }
    .chatbot-header {
      background: #23234a;
      color: #fff;
      padding: 18px 20px 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #444;
    }
    .chatbot-title {
      font-size: 1.2em;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .chatbot-status {
      font-size: 0.95em;
      color: #7c6ee6;
      margin-left: 8px;
      display: flex;
      align-items: center;
    }
    .chatbot-status-dot {
      width: 9px;
      height: 9px;
      background: #7c6ee6;
      border-radius: 50%;
      display: inline-block;
      margin-right: 5px;
    }
    .chatbot-header-icons {
      display: flex;
      gap: 14px;
    }
    .chatbot-header-icons button {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.1em;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .chatbot-header-icons button:hover {
      opacity: 1;
      color: #7c6ee6;
    }
    .chatbot-messages {
      flex: 1;
      padding: 24px 16px 0 16px;
      background: #18182a;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .chatbot-message {
      background: #23234a;
      color: #fff;
      padding: 12px 16px;
      border-radius: 10px;
      max-width: 75%;
      font-size: 1em;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
      word-break: break-word;
    }
    .chatbot-message.user {
      background: #7c6ee6;
      color: #fff;
      align-self: flex-end;
    }
    .chatbot-message.typing {
      background: #23234a;
      color: #7c6ee6;
      align-self: flex-start;
      font-style: italic;
    }
    .chatbot-input-row {
      display: flex;
      align-items: center;
      padding: 12px 14px;
      background: #23234a;
      border-top: 1px solid #444;
    }
    .chatbot-input-row input {
      flex: 1;
      padding: 10px 14px;
      border-radius: 20px;
      border: none;
      background: #23234a;
      color: #fff;
      font-size: 1em;
      outline: none;
      margin-right: 10px;
    }
    .chatbot-input-row input::placeholder {
      color: #bcbcf0;
    }
    .chatbot-input-row button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0 6px;
      display: flex;
      align-items: center;
    }
    .chatbot-input-row button svg {
      width: 28px;
      height: 28px;
      fill: #7c6ee6;
      transition: fill 0.2s;
      display: block;
    }
    .chatbot-input-row button:hover svg {
      fill: #fff;
    }
    .chatbot-input-row button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    @media (max-width: 500px) {
      #chatbot-window {
        width: 98vw;
        height: 80vh;
        min-width: 0;
        right: 1vw;
        bottom: 17vw;
      }
      #chat-open-btn {
        right: 7vw;
        bottom: 7vw;
        width: 80px;
        height: 80px;
      }
      #chat-open-btn img {
        width: 100%;
        height: 100%;
      }
      #chat-type-anim {
        font-size: 0.95em;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        white-space: nowrap;
        border-radius: 16px;
      }
    }
  `;
  document.head.appendChild(style);

  // --- HTML ---
  const chatBtn = document.createElement('button');
  chatBtn.id = 'chat-open-btn';
  chatBtn.setAttribute('aria-label', 'Open/close chat');
  chatBtn.innerHTML = `
    <img src="https://ai-piet.vercel.app/pietimg.png" alt="Chatbot" />
    <span id="chat-type-anim" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);color:#fff;font-weight:700;font-size:1.1em;text-shadow:0 2px 8px #000,0 0 2px #000;background:rgba(0,0,0,0.25);padding:4px 10px;pointer-events:none;white-space:nowrap;"></span>
  `;
  document.body.appendChild(chatBtn);

  const chatWindow = document.createElement('div');
  chatWindow.id = 'chatbot-window';
  chatWindow.innerHTML = `
    <div class="chatbot-header">
      <div>
        <span class="chatbot-title">Ai Piet</span><br>
        <span class="chatbot-status"><span class="chatbot-status-dot"></span>Online</span>
      </div>
      <div class="chatbot-header-icons">
        <button id="chat-close" title="Sluiten">&#x2715;</button>
      </div>
    </div>
    <div class="chatbot-messages" id="chatbot-messages">
      <div class="chatbot-message">Hi! What can I help you with?</div>
    </div>
    <form class="chatbot-input-row" id="chatbot-form" autocomplete="off">
      <input type="text" id="chatbot-input" placeholder="Ask me anything..." autocomplete="off" required />
      <button type="submit" aria-label="Verzenden" id="send-btn">
        <svg viewBox="0 0 24 24"><path d="M2 21l21-9-21-9v7l15 2-15 2z" fill="#111"/></svg>
      </button>
    </form>
  `;
  document.body.appendChild(chatWindow);

  // --- JS Logic ---
  const chatOpenBtn = document.getElementById('chat-open-btn');
  const chatCloseBtn = document.getElementById('chat-close');
  const chatForm = document.getElementById('chatbot-form');
  const chatInput = document.getElementById('chatbot-input');
  const chatMessages = document.getElementById('chatbot-messages');
  const chatTypeAnim = document.getElementById('chat-type-anim');
  const sendBtn = document.getElementById('send-btn');
  
  // N8N Webhook URL - VERVANG DIT MET JE EIGEN WEBHOOK URL
  const N8N_WEBHOOK_URL = 'https://fiduciacommerce.app.n8n.cloud/webhook/chatbot';
  
  const animText = 'Chat met Piet!';
  let animIndex = 0;
  let animDir = 1;
  let animTimeout;
  let animStopped = false;
  
  function typeAnim() {
    if (animStopped) return;
    chatTypeAnim.textContent = animText.slice(0, animIndex);
    if (animDir === 1) {
      if (animIndex < animText.length) {
        animIndex++;
        animTimeout = setTimeout(typeAnim, 90);
      } else {
        animDir = -1;
        animTimeout = setTimeout(typeAnim, 900);
      }
    } else {
      if (animIndex > 9) { // laat 'Chat met' staan
        animIndex--;
        animTimeout = setTimeout(typeAnim, 60);
      } else {
        animDir = 1;
        animTimeout = setTimeout(typeAnim, 700);
      }
    }
  }
  typeAnim();
  
  // Verberg animatie als chat open gaat
  chatOpenBtn.addEventListener('click', () => {
    animStopped = true;
    clearTimeout(animTimeout);
    chatTypeAnim.style.display = 'none';
  });

  // State: is chat open?
  let chatOpen = false;

  // Chat automatisch open op desktop, gesloten op mobiel
  window.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 500) {
      chatWindow.classList.remove('closed');
      chatOpen = true;
      chatInput.disabled = false;
      chatInput.focus();
    } else {
      chatWindow.classList.add('closed');
      chatOpen = false;
      chatInput.disabled = true;
    }
  });

  // Toggle chat open/close
  chatOpenBtn.addEventListener('click', () => {
    chatOpen = !chatOpen;
    if (chatOpen) {
      chatWindow.classList.remove('closed');
      chatInput.disabled = false;
      chatInput.focus();
    } else {
      chatWindow.classList.add('closed');
      chatInput.disabled = true;
    }
  });

  // Close chat when X button is clicked
  chatCloseBtn.addEventListener('click', () => {
    chatOpen = false;
    chatWindow.classList.add('closed');
    chatInput.disabled = true;
  });

  // Functie om bericht naar n8n te sturen
  async function sendMessageToN8N(message) {
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.response || data.message || 'Sorry bro, er ging iets mis!';
    } catch (error) {
      console.error('Error sending message to n8n:', error);
      return 'Sorry bro, er ging iets mis met de verbinding!';
    }
  }

  // Functie om typing indicator te tonen
  function showTypingIndicator() {
    const typingMsg = document.createElement('div');
    typingMsg.className = 'chatbot-message typing';
    typingMsg.textContent = 'Ai Piet is aan het typen...';
    typingMsg.id = 'typing-indicator';
    chatMessages.appendChild(typingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Functie om typing indicator te verbergen
  function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Send message
  chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (chatInput.disabled) return;
    
    const msg = chatInput.value.trim();
    if (!msg) return;
    
    // Disable input en button tijdens verzenden
    chatInput.disabled = true;
    sendBtn.disabled = true;
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chatbot-message user';
    userMsg.textContent = msg;
    chatMessages.appendChild(userMsg);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Toon typing indicator
    showTypingIndicator();
    
    try {
      // Stuur bericht naar n8n en krijg antwoord
      const aiResponse = await sendMessageToN8N(msg);
      
      // Verberg typing indicator
      hideTypingIndicator();
      
      // Voeg AI antwoord toe
      const botMsg = document.createElement('div');
      botMsg.className = 'chatbot-message';
      botMsg.textContent = aiResponse;
      chatMessages.appendChild(botMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
      // Verberg typing indicator
      hideTypingIndicator();
      
      // Toon error bericht
      const errorMsg = document.createElement('div');
      errorMsg.className = 'chatbot-message';
      errorMsg.textContent = 'Sorry bro, er ging iets mis! Probeer het later opnieuw.';
      chatMessages.appendChild(errorMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    } finally {
      // Re-enable input en button
      chatInput.disabled = false;
      sendBtn.disabled = false;
      chatInput.focus();
    }
  });
})(); 