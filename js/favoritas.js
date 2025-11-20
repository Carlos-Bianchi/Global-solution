// ===================================
// MENSAGENS FAVORITAS - FUTURO EM VOZ
// ===================================

let favoriteMessages = [];

// ===================================
// INICIALIZAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    loadFavoriteMessages();
    renderFavoriteMessages();
});

// ===================================
// GERENCIAMENTO DE FAVORITOS
// ===================================

function loadFavoriteMessages() {
    const stored = localStorage.getItem('futuroEmVozFavorites');
    
    if (stored && stored !== 'null') {
        try {
            favoriteMessages = JSON.parse(stored);
        } catch (error) {
            console.error('Erro ao carregar favoritos:', error);
            favoriteMessages = [];
        }
    } else {
        favoriteMessages = [];
    }
}

function saveFavoriteMessages() {
    localStorage.setItem('futuroEmVozFavorites', JSON.stringify(favoriteMessages));
}

function removeFavorite(favoriteId) {
    if (!confirm('Tem certeza que deseja remover esta mensagem dos favoritos?')) {
        return;
    }
    
    favoriteMessages = favoriteMessages.filter(fav => fav.id !== favoriteId);
    saveFavoriteMessages();
    renderFavoriteMessages();
}

// ===================================
// RENDERIZAÇÃO
// ===================================

function renderFavoriteMessages() {
    const emptyState = document.getElementById('favorites-empty-state');
    const grid = document.getElementById('favorites-grid');
    
    if (favoriteMessages.length === 0) {
        emptyState.style.display = 'flex';
        grid.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    grid.style.display = 'grid';
    
    grid.innerHTML = favoriteMessages.map(fav => {
        const messageTypeIcon = fav.type === 'user' ? 'fa-user' : 'fa-robot';
        const messageTypeLabel = fav.type === 'user' ? 'Você' : 'IA Orientadora';
        const messageTypeClass = fav.type === 'user' ? 'favorite-user' : 'favorite-ai';
        
        return `
            <div class="favorite-card ${messageTypeClass}">
                <div class="favorite-header">
                    <div class="favorite-type">
                        <i class="fas ${messageTypeIcon}"></i>
                        <span>${messageTypeLabel}</span>
                    </div>
                    <button class="btn-remove-favorite" data-id="${fav.id}" aria-label="Remover dos favoritos">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                
                <div class="favorite-content">
                    <p>${fav.text}</p>
                </div>
                
                <div class="favorite-audio-player">
                    <button class="audio-play-btn-favorite" data-favorite-id="${fav.id}" aria-label="Reproduzir áudio">
                        <i class="fas fa-play"></i>
                    </button>
                    <div class="audio-waveform-favorite paused">
                        ${generateWaveformBars()}
                    </div>
                </div>
                
                <div class="favorite-footer">
                    <div class="favorite-conversation-title">
                        <i class="fas fa-comment-dots"></i>
                        ${fav.conversationTitle}
                    </div>
                    <div class="favorite-date">${formatDate(fav.savedAt)}</div>
                </div>
            </div>
        `;
    }).join('');
    
    // Adicionar event listeners aos botões de remover
    document.querySelectorAll('.btn-remove-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFavorite(this.dataset.id);
        });
    });
    
    // Adicionar event listeners aos botões de play
    document.querySelectorAll('.audio-play-btn-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            toggleAudioPlayback(this);
        });
    });
}

function generateWaveformBars() {
    return Array(8).fill(0).map(() => '<div class="wave-bar"></div>').join('');
}

// ===================================
// REPRODUÇÃO DE ÁUDIO
// ===================================

let currentPlayingAudio = null;

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
// UTILITÁRIOS
// ===================================

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Hoje às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
        return 'Ontem às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
        return `${diffDays} dias atrás`;
    } else {
        return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
}

