function initP2pDemo() {
    const demoContainer = document.getElementById('p2p-demo');
    if (!demoContainer) return;

    let isOnline = true;
    let isEncrypted = true;
    let offlineQueue = [];

    demoContainer.innerHTML = `
        <div class="p2p-simulator" style="background: #0b0f19; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; font-family: monospace; display: flex; flex-direction: column; gap: 14px; color: #fff;">
            <div class="p2p-controls" style="display: flex; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px;">
                <button id="p2p-network-toggle" class="p2p-ctrl-btn" style="background: rgba(0, 255, 102, 0.1); border: 1px solid #00ff66; color: #00ff66; padding: 6px 12px; border-radius: 6px; font-size: 0.75rem; cursor: pointer; font-weight: bold;">
                    📡 Сеть: ONLINE
                </button>
                <button id="p2p-crypto-toggle" class="p2p-ctrl-btn" style="background: rgba(130, 71, 229, 0.15); border: 1px solid #8247e5; color: #d0b3ff; padding: 6px 12px; border-radius: 6px; font-size: 0.75rem; cursor: pointer; font-weight: bold;">
                    🔒 E2EE: ВКЛ (AES-GCM)
                </button>
            </div>

            <div class="p2p-screens" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; height: 180px;">
                <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; display: flex; flex-direction: column; overflow: hidden;">
                    <div style="background: rgba(255,255,255,0.03); padding: 6px 10px; font-size: 0.75rem; color: #888; border-bottom: 1px solid rgba(255,255,255,0.05);">Узел А (Отправитель)</div>
                    <div id="chat-a" style="flex-grow: 1; overflow-y: auto; padding: 8px; font-size: 0.75rem; display: flex; flex-direction: column; gap: 6px;">
                        <div style="color: #666; font-style: italic;">[Система] Локальный пир готов.</div>
                    </div>
                </div>
                
                <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; display: flex; flex-direction: column; overflow: hidden;">
                    <div style="background: rgba(255,255,255,0.03); padding: 6px 10px; font-size: 0.75rem; color: #888; border-bottom: 1px solid rgba(255,255,255,0.05);">Узел Б (Получатель)</div>
                    <div id="chat-b" style="flex-grow: 1; overflow-y: auto; padding: 8px; font-size: 0.75rem; display: flex; flex-direction: column; gap: 6px;">
                        <div style="color: #666; font-style: italic;">[Система] Удаленный пир готов.</div>
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 8px;">
                <input type="text" id="p2p-msg-input" placeholder="Введите сообщение..." style="flex-grow: 1; background: #080a10; border: 1px solid rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 6px; color: #fff; font-family: monospace; font-size: 0.8rem; outline: none;">
                <button id="p2p-send-btn" style="background: #ffffff; border: none; color: #000; padding: 8px 16px; border-radius: 6px; font-weight: bold; font-size: 0.8rem; cursor: pointer;">
                    ОТПРАВИТЬ
                </button>
            </div>
        </div>
    `;

    const networkToggle = document.getElementById('p2p-network-toggle');
    const cryptoToggle = document.getElementById('p2p-crypto-toggle');
    const chatA = document.getElementById('chat-a');
    const chatB = document.getElementById('chat-b');
    const msgInput = document.getElementById('p2p-msg-input');
    const sendBtn = document.getElementById('p2p-send-btn');

    networkToggle.onclick = () => {
        isOnline = !isOnline;
        if (isOnline) {
            networkToggle.style.background = 'rgba(0, 255, 102, 0.1)';
            networkToggle.style.borderColor = '#00ff66';
            networkToggle.style.color = '#00ff66';
            networkToggle.innerText = '📡 Сеть: ONLINE';
            appendLog(chatA, '[СЕТЬ] Соединение установлено.', '#00ff66');
            appendLog(chatB, '[СЕТЬ] Соединение установлено.', '#00ff66');

            if (offlineQueue.length > 0) {
                appendLog(chatA, `⏳ Доставка сообщений (${offlineQueue.length})...`, '#ffaa00');
                setTimeout(() => {
                    offlineQueue.forEach(msg => {
                        appendLog(chatB, `📩 Доставлено: "${msg}" (E2EE расшифровано)`, '#8247e5');
                    });
                    offlineQueue = [];
                }, 1000);
            }
        } else {
            networkToggle.style.background = 'rgba(255, 68, 68, 0.15)';
            networkToggle.style.borderColor = '#ff4444';
            networkToggle.style.color = '#ff4444';
            networkToggle.innerText = '⚠️ Сеть: OFFLINE';
            appendLog(chatA, '[СЕТЬ] Связь потеряна. Очередь включена.', '#ff4444');
            appendLog(chatB, '[СЕТЬ] Пир оффлайн.', '#ff4444');
        }
    };

    cryptoToggle.onclick = () => {
        isEncrypted = !isEncrypted;
        if (isEncrypted) {
            cryptoToggle.style.background = 'rgba(130, 71, 229, 0.15)';
            cryptoToggle.style.borderColor = '#8247e5';
            cryptoToggle.style.color = '#d0b3ff';
            cryptoToggle.innerText = '🔒 E2EE: ВКЛ (AES-GCM)';
            appendLog(chatA, '[E2EE] Шифрование включено.', '#d0b3ff');
        } else {
            cryptoToggle.style.background = 'rgba(255, 170, 0, 0.1)';
            cryptoToggle.style.borderColor = '#ffaa00';
            cryptoToggle.style.color = '#ffaa00';
            cryptoToggle.innerText = '🔓 E2EE: ВЫКЛ';
            appendLog(chatA, '[E2EE] Внимание! Сообщения передаются открыто!', '#ffaa00');
        }
    };

    function sendMessage() {
        const text = msgInput.value.trim();
        if (!text) return;

        appendLog(chatA, `📤 Вы отправили: "${text}"`, '#fff');

        if (isEncrypted) {
            const fakeCipher = btoa(unescape(encodeURIComponent(text))).slice(0, 10) + '...[AES-GCM]';
            appendLog(chatA, `🔐 Зашифровано: [${fakeCipher}]`, '#8247e5');
        }

        if (isOnline) {
            setTimeout(() => {
                const displayText = isEncrypted ? `📩 Получено: "${text}" (AES-декодировано)` : `📩 Получено: "${text}" (Открытый текст!)`;
                appendLog(chatB, displayText, isEncrypted ? '#8247e5' : '#ffaa00');
            }, 500);
        } else {
            offlineQueue.push(text);
            appendLog(chatA, `💾 Сохранено в оффлайн-буфер`, '#ffaa00');
        }

        msgInput.value = '';
    }

    sendBtn.onclick = sendMessage;
    msgInput.onkeypress = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    function appendLog(target, text, color = '#ddd') {
        const line = document.createElement('div');
        line.style.color = color;
        line.style.marginBottom = '2px';
        line.innerText = `[${new Date().toLocaleTimeString()}] ${text}`;
        target.appendChild(line);
        target.scrollTop = target.scrollHeight;
    }
}