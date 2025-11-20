// ===================================
// CHAT APPLICATION - FUTURO EM VOZ
// ===================================

// Estado global da aplicação
let conversations = [];
let currentConversationId = null;
let isRecording = false;
let currentPlayingAudio = null;

// Respostas simuladas da IA
const AI_RESPONSES = [
    "Para conseguir seu primeiro emprego, é importante ter um currículo atualizado e se preparar bem para entrevistas. Procure vagas em sites de emprego e não tenha medo de começar em posições de entrada.",
    "Existem vários cursos profissionalizantes gratuitos disponíveis. Recomendo procurar no SENAI, SENAC ou em plataformas online como o PRONATEC. Escolha algo que você goste e que tenha demanda no mercado.",
    "Para se preparar para uma entrevista, pesquise sobre a empresa, pratique suas respostas para perguntas comuns, vista-se adequadamente e chegue com antecedência. Mostre confiança e interesse pela vaga.",
    "Seus direitos trabalhistas incluem: salário mínimo, férias remuneradas, 13º salário, FGTS, descanso semanal remunerado, e licença maternidade/paternidade. Sempre exija carteira assinada.",
    "Para pedir um aumento, escolha o momento certo, prepare argumentos sobre suas conquistas, seja profissional e mostre seu valor para a empresa. Se possível, tenha dados concretos de seus resultados.",
    "Desenvolver novas habilidades é essencial. Busque cursos online gratuitos, pratique no dia a dia, peça feedback e esteja sempre disposto a aprender. A dedicação faz toda a diferença.",
    "O networking é muito importante. Participe de eventos da sua área, conecte-se com profissionais no LinkedIn, mantenha contato com ex-colegas e sempre seja prestativo. Relacionamentos abrem portas."
];

// ===================================
// INICIALIZAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Carregar conversas do localStorage ou criar dados de exemplo
    loadConversations();
    
    // Renderizar lista de conversas
    renderConversationsList();
    
    // Event listeners
    setupEventListeners();
    
    // Se houver conversas, selecionar a primeira
    if (conversations.length > 0) {
        selectConversation(conversations[0].id);
    }
});

// ===================================
// GERENCIAMENTO DE CONVERSAS
// ===================================

function loadConversations() {
    const stored = localStorage.getItem('futuroEmVozConversations');
    
    if (stored) {
        conversations = JSON.parse(stored);
    } else {
        // Criar conversas de exemplo
        conversations = [
            {
                id: generateId(),
                title: "Como conseguir emprego",
                date: new Date(Date.now() - 86400000).toISOString(), // 1 dia atrás
                messages: [
                    {
                        type: 'user',
                        text: 'Como faço para conseguir meu primeiro emprego?',
                        timestamp: new Date(Date.now() - 86400000).toISOString()
                    },
                    {
                        type: 'ai',
                        text: 'Para conseguir seu primeiro emprego, é importante ter um currículo atualizado e se preparar bem para entrevistas. Procure vagas em sites de emprego e não tenha medo de começar em posições de entrada.',
                        timestamp: new Date(Date.now() - 86395000).toISOString()
                    },
                    {
                        type: 'user',
                        text: 'E onde posso fazer cursos gratuitos?',
                        timestamp: new Date(Date.now() - 86300000).toISOString()
                    },
                    {
                        type: 'ai',
                        text: 'Existem vários cursos profissionalizantes gratuitos disponíveis. Recomendo procurar no SENAI, SENAC ou em plataformas online como o PRONATEC. Escolha algo que você goste e que tenha demanda no mercado.',
                        timestamp: new Date(Date.now() - 86295000).toISOString()
                    }
                ]
            },
            {
                id: generateId(),
                title: "Preparação para entrevista",
                date: new Date(Date.now() - 172800000).toISOString(), // 2 dias atrás
                messages: [
                    {
                        type: 'user',
                        text: 'Como me preparar para uma entrevista de emprego?',
                        timestamp: new Date(Date.now() - 172800000).toISOString()
                    },
                    {
                        type: 'ai',
                        text: 'Para se preparar para uma entrevista, pesquise sobre a empresa, pratique suas respostas para perguntas comuns, vista-se adequadamente e chegue com antecedência. Mostre confiança e interesse pela vaga.',
                        timestamp: new Date(Date.now() - 172795000).toISOString()
                    }
                ]
            },
            {
                id: generateId(),
                title: "Direitos trabalhistas",
                date: new Date(Date.now() - 259200000).toISOString(), // 3 dias atrás
                messages: [
                    {
                        type: 'user',
                        text: 'Quais são meus direitos trabalhistas?',
                        timestamp: new Date(Date.now() - 259200000).toISOString()
                    },
                    {
                        type: 'ai',
                        text: 'Seus direitos trabalhistas incluem: salário mínimo, férias remuneradas, 13º salário, FGTS, descanso semanal remunerado, e licença maternidade/paternidade. Sempre exija carteira assinada.',
                        timestamp: new Date(Date.now() - 259195000).toISOString()
                    }
                ]
            }
        ];
        
        saveConversations();
    }
}

function saveConversations() {
    localStorage.setItem('futuroEmVozConversations', JSON.stringify(conversations));
}

function createNewConversation() {
    const newConversation = {
        id: generateId(),
        title: 'Nova Conversa',
        date: new Date().toISOString(),
        messages: []
    };
    
    conversations.unshift(newConversation); // Adicionar no início
    saveConversations();
    renderConversationsList();
    selectConversation(newConversation.id);
}

function selectConversation(conversationId) {
    currentConversationId = conversationId;
    const conversation = conversations.find(c => c.id === conversationId);
    
    if (!conversation) return;
    
    // Atualizar UI
    document.getElementById('empty-state').style.display = 'none';
    document.getElementById('messages-container').style.display = 'flex';
    
    // Renderizar mensagens
    renderMessages(conversation.messages);
    
    // Atualizar lista de conversas (marcar como ativa)
    renderConversationsList();
    
    // Fechar sidebar no mobile
    closeSidebarOnMobile();
}

function deleteConversation(conversationId) {
    if (!confirm('Tem certeza que deseja excluir esta conversa?')) {
        return;
    }
    
    conversations = conversations.filter(c => c.id !== conversationId);
    saveConversations();
    renderConversationsList();
    
    // Se a conversa deletada era a atual, limpar a tela
    if (currentConversationId === conversationId) {
        currentConversationId = null;
        document.getElementById('empty-state').style.display = 'flex';
        document.getElementById('messages-container').style.display = 'none';
        
        // Se houver outras conversas, selecionar a primeira
        if (conversations.length > 0) {
            selectConversation(conversations[0].id);
        }
    }
}

// ===================================
// RENDERIZAÇÃO
// ===================================

function renderConversationsList() {
    const list = document.getElementById('conversations-list');
    
    if (conversations.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: var(--spacing-lg); color: var(--text-light);">
                <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: var(--spacing-sm);"></i>
                <p>Nenhuma conversa ainda.<br>Clique no botão + para começar!</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = conversations.map(conv => {
        const isActive = conv.id === currentConversationId ? 'active' : '';
        const preview = conv.messages.length > 0 
            ? conv.messages[conv.messages.length - 1].text.substring(0, 50) + '...'
            : 'Sem mensagens ainda';
        
        return `
            <div class="conversation-item ${isActive}" data-id="${conv.id}">
                <div class="conversation-header">
                    <i class="fas fa-comment-dots conversation-icon"></i>
                    <span class="conversation-title">${conv.title}</span>
                    <button class="btn-delete-conversation-sidebar" data-id="${conv.id}" aria-label="Excluir conversa">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="conversation-date">${formatDate(conv.date)}</div>
                <div class="conversation-preview">${preview}</div>
            </div>
        `;
    }).join('');
    
    // Adicionar event listeners aos itens
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // Não selecionar se clicou no botão de deletar
            if (!e.target.closest('.btn-delete-conversation-sidebar')) {
                selectConversation(this.dataset.id);
            }
        });
    });
    
    // Adicionar event listeners aos botões de deletar
    document.querySelectorAll('.btn-delete-conversation-sidebar').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que selecione a conversa
            deleteConversation(this.dataset.id);
        });
    });
}

function renderMessages(messages) {
    const container = document.getElementById('chat-messages');
    
    if (messages.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: var(--spacing-xl); color: var(--text-light);">
                <i class="fas fa-microphone" style="font-size: 64px; margin-bottom: var(--spacing-md); color: var(--secondary-color);"></i>
                <p style="font-size: var(--font-size-lg);">Clique no microfone abaixo para começar a conversa!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = messages.map((msg, index) => {
        const messageId = `msg-${index}`;
        const isFavorited = isMessageFavorited(msg, index);
        const favoriteIcon = isFavorited ? 'fa-solid fa-star' : 'fa-regular fa-star';
        const favoriteClass = isFavorited ? 'favorited' : '';
        
        return `
            <div class="chat-message ${msg.type}">
                <div class="message-bubble">
                    <div class="message-header">
                        <div class="message-header-left">
                            <i class="fas ${msg.type === 'user' ? 'fa-user' : 'fa-robot'} message-icon"></i>
                            <span>${msg.type === 'user' ? 'Você' : 'IA Orientadora'}</span>
                        </div>
                        <button class="btn-favorite ${favoriteClass}" data-message-index="${index}" aria-label="Adicionar aos favoritos">
                            <i class="${favoriteIcon}"></i>
                        </button>
                    </div>
                    <div class="message-text">${msg.text}</div>
                    <div class="message-audio-player">
                        <button class="audio-play-btn" data-message-id="${messageId}" aria-label="Reproduzir áudio">
                            <i class="fas fa-play"></i>
                        </button>
                        <div class="audio-waveform paused">
                            ${generateWaveformBars()}
                        </div>
                    </div>
                    <div class="message-timestamp">${formatTime(msg.timestamp)}</div>
                </div>
            </div>
        `;
    }).join('');
    
    // Scroll para o final
    container.scrollTop = container.scrollHeight;
    
    // Adicionar event listeners aos botões de play
    document.querySelectorAll('.audio-play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            toggleAudioPlayback(this);
        });
    });
    
    // Adicionar event listeners aos botões de favorito
    document.querySelectorAll('.btn-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            toggleFavorite(parseInt(this.dataset.messageIndex));
        });
    });
}

function generateWaveformBars() {
    return Array(8).fill(0).map(() => '<div class="wave-bar"></div>').join('');
}

function addMessage(type, text) {
    const conversation = conversations.find(c => c.id === currentConversationId);
    if (!conversation) return;
    
    const message = {
        type: type,
        text: text,
        timestamp: new Date().toISOString()
    };
    
    conversation.messages.push(message);
    
    // Atualizar título da conversa se for a primeira mensagem
    if (conversation.messages.length === 1) {
        conversation.title = text.substring(0, 30) + (text.length > 30 ? '...' : '');
    }
    
    saveConversations();
    renderMessages(conversation.messages);
    renderConversationsList();
}

function showTypingIndicator() {
    const container = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// ===================================
// GRAVAÇÃO DE ÁUDIO
// ===================================

function toggleRecording() {
    const micButton = document.getElementById('chat-mic-button');
    const recordingIndicator = document.getElementById('recording-indicator');
    const inputHint = document.querySelector('.chat-input-hint');
    
    if (!currentConversationId) {
        alert('Por favor, crie ou selecione uma conversa primeiro!');
        return;
    }
    
    isRecording = !isRecording;
    
    if (isRecording) {
        // Iniciar gravação
        micButton.classList.add('recording');
        micButton.innerHTML = '<i class="fas fa-stop"></i>';
        recordingIndicator.style.display = 'flex';
        inputHint.style.display = 'none';
    } else {
        // Parar gravação e processar
        micButton.classList.remove('recording');
        micButton.innerHTML = '<i class="fas fa-microphone"></i>';
        recordingIndicator.style.display = 'none';
        inputHint.style.display = 'flex';
        
        // Simular processamento da mensagem
        processRecordedMessage();
    }
}

function processRecordedMessage() {
    // Simular texto da pergunta do usuário
    const userQuestions = [
        'Como faço para conseguir um emprego?',
        'Que cursos devo fazer?',
        'Como me preparar para uma entrevista?',
        'Quais são meus direitos trabalhistas?',
        'Como pedir um aumento de salário?',
        'Como desenvolver novas habilidades?',
        'Qual a importância do networking?'
    ];
    
    const randomQuestion = userQuestions[Math.floor(Math.random() * userQuestions.length)];
    
    // Adicionar mensagem do usuário
    addMessage('user', randomQuestion);
    
    // Mostrar indicador de "digitando"
    showTypingIndicator();
    
    // Simular resposta da IA após 2 segundos
    setTimeout(() => {
        removeTypingIndicator();
        const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
        addMessage('ai', randomResponse);
    }, 2000);
}

// ===================================
// REPRODUÇÃO DE ÁUDIO
// ===================================

function toggleAudioPlayback(button) {
    const waveform = button.nextElementSibling;
    const isPlaying = button.classList.contains('playing');
    
    // Parar qualquer áudio que esteja tocando
    if (currentPlayingAudio && currentPlayingAudio !== button) {
        currentPlayingAudio.classList.remove('playing');
        currentPlayingAudio.innerHTML = '<i class="fas fa-play"></i>';
        const prevWaveform = currentPlayingAudio.nextElementSibling;
        prevWaveform.classList.add('paused');
    }
    
    if (isPlaying) {
        // Pausar
        button.classList.remove('playing');
        button.innerHTML = '<i class="fas fa-play"></i>';
        waveform.classList.add('paused');
        currentPlayingAudio = null;
    } else {
        // Reproduzir
        button.classList.add('playing');
        button.innerHTML = '<i class="fas fa-pause"></i>';
        waveform.classList.remove('paused');
        currentPlayingAudio = button;
        
        // Simular fim da reprodução após 5 segundos
        setTimeout(() => {
            if (button.classList.contains('playing')) {
                button.classList.remove('playing');
                button.innerHTML = '<i class="fas fa-play"></i>';
                waveform.classList.add('paused');
                currentPlayingAudio = null;
            }
        }, 5000);
    }
}

// ===================================
// EVENT LISTENERS
// ===================================

function setupEventListeners() {
    // Botões de nova conversa
    document.querySelectorAll('.btn-new-conversation, .btn-new-conversation-main').forEach(btn => {
        btn.addEventListener('click', createNewConversation);
    });
    
    // Botão de microfone
    const micButton = document.getElementById('chat-mic-button');
    if (micButton) {
        micButton.addEventListener('click', toggleRecording);
    }
    
    // Toggle sidebar no mobile
    const sidebarToggle = document.querySelector('.chat-sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Fechar sidebar ao clicar fora (mobile)
    document.addEventListener('click', function(e) {
        const sidebar = document.querySelector('.chat-sidebar');
        const toggle = document.querySelector('.chat-sidebar-toggle');
        
        if (window.innerWidth <= 480 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !toggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

function toggleSidebar() {
    const sidebar = document.querySelector('.chat-sidebar');
    sidebar.classList.toggle('active');
}

function closeSidebarOnMobile() {
    if (window.innerWidth <= 480) {
        const sidebar = document.querySelector('.chat-sidebar');
        sidebar.classList.remove('active');
    }
}

// ===================================
// UTILITÁRIOS
// ===================================

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Hoje';
    } else if (diffDays === 1) {
        return 'Ontem';
    } else if (diffDays < 7) {
        return `${diffDays} dias atrás`;
    } else {
        return date.toLocaleDateString('pt-BR');
    }
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// ===================================
// GERENCIAMENTO DE FAVORITOS
// ===================================

function isMessageFavorited(message, messageIndex) {
    const favorites = JSON.parse(localStorage.getItem('futuroEmVozFavorites') || '[]');
    const conversation = conversations.find(c => c.id === currentConversationId);
    
    if (!conversation) return false;
    
    return favorites.some(fav => 
        fav.conversationId === currentConversationId && 
        fav.messageIndex === messageIndex
    );
}

function toggleFavorite(messageIndex) {
    const conversation = conversations.find(c => c.id === currentConversationId);
    if (!conversation || !conversation.messages[messageIndex]) return;
    
    const message = conversation.messages[messageIndex];
    const favorites = JSON.parse(localStorage.getItem('futuroEmVozFavorites') || '[]');
    
    // Verificar se já está nos favoritos
    const favoriteIndex = favorites.findIndex(fav => 
        fav.conversationId === currentConversationId && 
        fav.messageIndex === messageIndex
    );
    
    if (favoriteIndex !== -1) {
        // Remover dos favoritos
        favorites.splice(favoriteIndex, 1);
        showNotification('Mensagem removida dos favoritos');
    } else {
        // Adicionar aos favoritos
        const favorite = {
            id: generateId(),
            conversationId: currentConversationId,
            conversationTitle: conversation.title,
            messageIndex: messageIndex,
            type: message.type,
            text: message.text,
            timestamp: message.timestamp,
            savedAt: new Date().toISOString()
        };
        favorites.push(favorite);
        showNotification('Mensagem adicionada aos favoritos!');
    }
    
    localStorage.setItem('futuroEmVozFavorites', JSON.stringify(favorites));
    renderMessages(conversation.messages);
}

function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificação
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
