// Функция запускается только при нажатии на кнопку "Запустить демо"
function initCrackVpnDemo() {
    const demoContainer = document.getElementById('crackvpn-demo');
    if (!demoContainer) return;

    // Сбрасываем историю при перезапуске демо
    const initialMessage = {
        sender: 'bot',
        text: '👋 Привет, Максим! Добро пожаловать в **CrackVPN**.\n\n⚡ У нас ты найдешь сверхбыстрые серверы до 10 ГБ/с и полную автономность работы.',
        buttons: [
            { text: '🌐 Выбрать сервер', action: 'show_servers' },
            { text: '💳 Купить подписку', action: 'buy_sub' },
            { text: '👤 Мой профиль', action: 'show_profile' }
        ]
    };

    let chatHistory = [JSON.parse(JSON.stringify(initialMessage))];

    const servers = [
        { country: '🇩🇪 Германия (Франкфурт)', speed: '10 Гб/с', ping: '35 ms' },
        { country: '🇳🇱 Нидерланды (Амстердам)', speed: '10 Гб/с', ping: '42 ms' },
        { country: '🇺🇸 США (Нью-Йорк)', speed: '10 Гб/с', ping: '110 ms' }
    ];

    renderChat();

    function renderChat() {
        demoContainer.innerHTML = '';

        const chatWindow = document.createElement('div');
        chatWindow.className = 'tg-chat-window';
        chatWindow.style.cssText = "background: #17212b; color: #fff; border-radius: 12px; padding: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; display: flex; flex-direction: column; height: 350px; box-shadow: inset 0 0 20px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.05);";

        const messagesArea = document.createElement('div');
        messagesArea.className = 'tg-messages-area';
        messagesArea.style.cssText = "flex-grow: 1; overflow-y: auto; margin-bottom: 12px; display: flex; flex-direction: column; gap: 10px; padding-right: 4px;";

        chatHistory.forEach((msg, idx) => {
            const msgRow = document.createElement('div');
            msgRow.style.cssText = `display: flex; flex-direction: column; width: 100%; align-items: ${msg.sender === 'bot' ? 'flex-start' : 'flex-end'}; margin-bottom: 4px;`;
            
            const bubble = document.createElement('div');
            bubble.style.cssText = msg.sender === 'bot' 
                ? "background: #182533; padding: 10px 14px; border-radius: 14px 14px 14px 4px; max-width: 85%; font-size: 0.85rem; line-height: 1.4; color: #f5f5f5; border: 1px solid rgba(255,255,255,0.02);"
                : "background: #2b5278; padding: 10px 14px; border-radius: 14px 14px 4px 14px; max-width: 85%; font-size: 0.85rem; line-height: 1.4; color: #ffffff;";
            
            bubble.innerHTML = formatMarkdown(msg.text);
            msgRow.appendChild(bubble);
            messagesArea.appendChild(msgRow);

            if (msg.buttons && idx === chatHistory.length - 1) {
                const btnContainer = document.createElement('div');
                btnContainer.style.cssText = "display: grid; grid-template-columns: 1fr; gap: 6px; width: 100%; max-width: 85%; margin-top: 8px; align-self: flex-start;";
                
                msg.buttons.forEach(btn => {
                    const b = document.createElement('button');
                    b.innerText = btn.text;
                    b.style.cssText = "background: #24303f; border: 1px solid rgba(255,255,255,0.05); color: #40a7e3; padding: 8px; border-radius: 6px; font-size: 0.8rem; cursor: pointer; font-weight: 600; text-align: center; transition: background 0.2s;";
                    b.onmouseover = () => b.style.background = '#2c3b4d';
                    b.onmouseout = () => b.style.background = '#24303f';
                    b.onclick = () => handleAction(btn.action, btn.text);
                    btnContainer.appendChild(b);
                });
                msgRow.appendChild(btnContainer);
            }
        });

        chatWindow.appendChild(messagesArea);
        demoContainer.appendChild(chatWindow);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    function handleAction(action, btnText) {
        chatHistory.push({ sender: 'user', text: btnText });
        renderChat();
        showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator();
            let replyText = '';
            let replyButtons = [];

            if (action === 'show_servers') {
                replyText = '📍 **Доступные локации:**\n\n' + 
                            servers.map(s => `${s.country}\n⚡ Скорость: *${s.speed}* | Пинг: *${s.ping}*`).join('\n\n');
                replyButtons = [{ text: '◀️ Вернуться в меню', action: 'main_menu' }];
            } else if (action === 'buy_sub') {
                replyText = '💳 **Выберите способ оплаты:**\n\nВсе платежи проходят мгновенно через наш API.';
                replyButtons = [
                    { text: '⭐ Telegram Stars API', action: 'pay_stars' },
                    { text: '🪙 CryptoPay (USDT)', action: 'pay_crypto' },
                    { text: '◀️ Вернуться в меню', action: 'main_menu' }
                ];
            } else if (action === 'show_profile') {
                replyText = '👤 **Профиль пользователя:**\n\n• Аккаунт: *Максим S.*\n• ID: *459021884*\n• VPN-доступ: *Активен* ✅';
                replyButtons = [
                    { text: '◀️ Вернуться в меню', action: 'main_menu' }
                ];
            } else if (action === 'pay_stars' || action === 'pay_crypto') {
                const method = action === 'pay_stars' ? 'Telegram Stars ⭐' : 'CryptoPay 🪙';
                replyText = `🎉 **Успешно!**\n\nВыбран способ оплаты: *${method}*.\n\n*(Тестовое подключение создано! Реальные средства не списываются. На аккаунте активирован демонстрационный режим)*`;
                replyButtons = [{ text: '◀️ Вернуться в меню', action: 'main_menu' }];
            } else {
                replyText = initialMessage.text;
                replyButtons = initialMessage.buttons;
            }

            chatHistory.push({ sender: 'bot', text: replyText, buttons: replyButtons });
            renderChat();
        }, 800);
    }

    function showTypingIndicator() {
        const area = demoContainer.querySelector('.tg-messages-area');
        if (!area) return;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'tg-typing-indicator';
        typingDiv.style.cssText = "align-self: flex-start; background: rgba(24,37,51,0.6); padding: 8px 14px; border-radius: 14px; font-size: 0.8rem; color: #8899a6; font-style: italic;";
        typingDiv.innerText = 'печать...';
        area.appendChild(typingDiv);
        area.scrollTop = area.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = demoContainer.querySelector('.tg-typing-indicator');
        if (indicator) indicator.remove();
    }

    function formatMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }
}

// Функция инициализации демо CrackVPN
function initCrackVpnDemo() {
    const demoContainer = document.getElementById('crackvpn-demo');
    if (!demoContainer) return;

    // Начальное состояние меню
    demoContainer.innerHTML = `
        <div class="tg-bot-interface" style="background: #17212b; color: #f5f5f5; padding: 15px; border-radius: 10px; font-family: sans-serif; height: 300px; display: flex; flex-direction: column;">
            <div class="tg-header" style="border-bottom: 1px solid #2b3a4a; padding-bottom: 10px; margin-bottom: 10px; font-weight: bold;">CrackVPN Bot</div>
            <div class="tg-messages" style="flex-grow: 1; overflow-y: auto; font-size: 0.9rem; margin-bottom: 10px;">
                <p>👋 Привет! Добро пожаловать в <b>CrackVPN</b>.<br>Выбери действие ниже:</p>
            </div>
            <div class="tg-menu" style="display: grid; gap: 5px;">
                <button onclick="handleCrackVpnAction('servers')" style="background: #2b5278; border: none; color: white; padding: 8px; border-radius: 5px; cursor: pointer;">🌐 Выбрать сервер</button>
                <button onclick="handleCrackVpnAction('profile')" style="background: #2b5278; border: none; color: white; padding: 8px; border-radius: 5px; cursor: pointer;">👤 Мой профиль</button>
            </div>
        </div>
    `;
}

// Функция обработки нажатий
window.handleCrackVpnAction = function(action) {
    const demoContainer = document.getElementById('crackvpn-demo');
    const msgArea = demoContainer.querySelector('.tg-messages');

    if (action === 'servers') {
        msgArea.innerHTML += `<p style="color: #6fb9f0;">📡 Доступные серверы:<br>1. 🇩🇪 Германия (10 Гб/с)<br>2. 🇳🇱 Нидерланды (10 Гб/с)</p>`;
    } else if (action === 'profile') {
        msgArea.innerHTML += `<p style="color: #6fb9f0;">👤 Ваш статус: <b>Premium</b><br>⏳ Подписка активна до: 01.09.2026</p>`;
    }
    
    // Прокрутка вниз
    msgArea.scrollTop = msgArea.scrollHeight;
};

// Вызываем инициализацию, когда пользователь нажмет "Запустить демо"
// В твоем app.js добавь вызов initCrackVpnDemo() внутри функции toggleProjectDemo