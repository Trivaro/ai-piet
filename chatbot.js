// Ai Piet Standalone Chatbot Widget met afbeelding als knop
(function() {
  // --- CSS ---
  const style = document.createElement('style');
  style.textContent = `
    .ai-piet-chatbot-btn {
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
    .ai-piet-chatbot-btn img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      display: block;
    }
    .ai-piet-chatbot-btn:hover {
      background: #a07a10;
    }
    .ai-piet-chatbot-window {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 370px;
      height: 600px;
      background: #fff;
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
    }
    .ai-piet-chatbot-window.closed {
      opacity: 0;
      pointer-events: none;
      transform: translateY(40px);
    }
    .chatbot-header {
      background: #111;
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
      color: #b6f09c;
      margin-left: 8px;
      display: flex;
      align-items: center;
    }
    .chatbot-status-dot {
      width: 9px;
      height: 9px;
      background: #b6f09c;
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
    }
    .chatbot-messages {
      flex: 1;
      padding: 24px 16px 0 16px;
      background: #fff;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .chatbot-message {
      background: #111;
      color: #fff;
      padding: 12px 16px;
      border-radius: 10px;
      max-width: 75%;
      font-size: 1em;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
      word-break: break-word;
    }
    .chatbot-message.user {
      background: #111;
      color: #fff;
      align-self: flex-end;
    }
    .chatbot-input-row {
      display: flex;
      align-items: center;
      padding: 12px 14px;
      background: #111;
      border-top: 1px solid #444;
    }
    .chatbot-input-row input {
      flex: 1;
      padding: 10px 14px;
      border-radius: 20px;
      border: none;
      background: #fff;
      color: #111;
      font-size: 1em;
      outline: none;
      margin-right: 10px;
    }
    .chatbot-input-row input::placeholder {
      color: #bbb;
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
      fill: #111;
      transition: fill 0.2s;
      display: block;
    }
    .chatbot-input-row button:hover svg {
      fill: #b6f09c;
    }
    .chat-type-anim {
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
    @media (max-width: 500px) {
      .ai-piet-chatbot-window {
        width: 98vw;
        height: 80vh;
        min-width: 0;
        right: 1vw;
        bottom: 17vw;
      }
      .ai-piet-chatbot-btn {
        right: 7vw;
        bottom: 7vw;
        width: 80px;
        height: 80px;
      }
      .ai-piet-chatbot-btn img {
        width: 100%;
        height: 100%;
      }
      .chat-type-anim {
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
  // Chat open/close button
  const chatBtn = document.createElement('button');
  chatBtn.className = 'ai-piet-chatbot-btn';
  chatBtn.setAttribute('aria-label', 'Open/close chat');
  chatBtn.innerHTML = `<img src="https://ai-piet.vercel.app/pietimg.png" alt="Chatbot" />`;
  // Type animatie
  const typeAnimSpan = document.createElement('span');
  typeAnimSpan.className = 'chat-type-anim';
  chatBtn.appendChild(typeAnimSpan);

  // Chatbot window
  const chatWindow = document.createElement('div');
  chatWindow.className = 'ai-piet-chatbot-window';

  // Header
  const header = document.createElement('div');
  header.className = 'chatbot-header';
  header.innerHTML = `
    <div>
      <span class="chatbot-title">Ai Piet</span><br>
      <span class="chatbot-status"><span class="chatbot-status-dot"></span>Online</span>
    </div>
    <div class="chatbot-header-icons">
      <button id="chat-close" title="Sluiten">&#x2715;</button>
    </div>
  `;

  // Messages
  const messages = document.createElement('div');
  messages.className = 'chatbot-messages';
  // Eerste bericht
  const firstMsg = document.createElement('div');
  firstMsg.className = 'chatbot-message';
  firstMsg.textContent = 'Hi! What can I help you with?';
  messages.appendChild(firstMsg);

  // Input row
  const form = document.createElement('form');
  form.className = 'chatbot-input-row';
  form.setAttribute('autocomplete', 'off');
  form.innerHTML = `
    <input type="text" id="chatbot-input" placeholder="Ask me anything..." autocomplete="off" required />
    <button type="submit" aria-label="Verzenden">
      <svg viewBox="0 0 24 24"><path d="M2 21l21-9-21-9v7l15 2-15 2z" fill="#111"/></svg>
    </button>
  `;

  // Opbouw chatbot window
  chatWindow.appendChild(header);
  chatWindow.appendChild(messages);
  chatWindow.appendChild(form);

  // Voeg toe aan body
  document.body.appendChild(chatBtn);
  document.body.appendChild(chatWindow);

  // --- Functionaliteit ---
  let chatOpen = false;
  const input = form.querySelector('input');
  const closeBtn = header.querySelector('#chat-close');
  // Type animatie logica
  const animText = 'Chat met Piet!';
  let animIndex = 0;
  let animDir = 1;
  let animTimeout;
  let animStopped = false;
  function typeAnim() {
    if (animStopped) return;
    typeAnimSpan.textContent = animText.slice(0, animIndex);
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
  chatBtn.addEventListener('click', () => {
    animStopped = true;
    clearTimeout(animTimeout);
    typeAnimSpan.style.display = 'none';
  });

  // Chat altijd open bij laden
  chatWindow.classList.remove('closed');
  chatOpen = true;
  input.disabled = false;
  setTimeout(() => { input.focus(); }, 500);

  // Toggle open/close
  chatBtn.addEventListener('click', () => {
    chatOpen = !chatOpen;
    if (chatOpen) {
      chatWindow.classList.remove('closed');
      input.disabled = false;
      setTimeout(() => { input.focus(); }, 200);
    } else {
      chatWindow.classList.add('closed');
      input.disabled = true;
    }
  });

  // Close chat when X button is clicked
  closeBtn.addEventListener('click', () => {
    chatOpen = false;
    chatWindow.classList.add('closed');
    input.disabled = true;
  });

  // Berichten sturen
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.disabled) return;
    const msg = input.value.trim();
    if (!msg) return;
    // User message
    const userMsg = document.createElement('div');
    userMsg.className = 'chatbot-message user';
    userMsg.textContent = msg;
    messages.appendChild(userMsg);
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
    // Simuleer bot reactie
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'chatbot-message';
      botMsg.textContent = 'Bedankt voor je bericht! Ai Piet komt zo bij je terug.';
      messages.appendChild(botMsg);
      messages.scrollTop = messages.scrollHeight;
    }, 800);
  });
})(); 