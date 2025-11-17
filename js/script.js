// ===================================
// VALIDAÇÃO DE FORMULÁRIO DE CONTATO
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const errorMessage = document.querySelector('.error-message');
            const successMessage = document.querySelector('.success-message');
            
            // Limpar mensagens anteriores
            errorMessage.classList.remove('show');
            successMessage.classList.remove('show');
            
            // Validar campos
            let errors = [];
            
            if (!name.value.trim()) {
                errors.push('Por favor, preencha seu nome.');
            }
            
            if (!email.value.trim()) {
                errors.push('Por favor, preencha seu email.');
            } else if (!isValidEmail(email.value)) {
                errors.push('Por favor, insira um email válido.');
            }
            
            if (!message.value.trim()) {
                errors.push('Por favor, escreva uma mensagem.');
            }
            
            // Exibir erros ou sucesso
            if (errors.length > 0) {
                errorMessage.innerHTML = errors.join('<br>');
                errorMessage.classList.add('show');
                
                // Scroll suave até a mensagem de erro
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                successMessage.innerHTML = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                successMessage.classList.add('show');
                
                // Limpar formulário
                contactForm.reset();
                
                // Scroll suave até a mensagem de sucesso
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
    
    // Função auxiliar para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// ===================================
// FAQ ACORDEÃO
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Fechar todas as respostas
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });
            document.querySelectorAll('.faq-answer').forEach(a => {
                a.classList.remove('show');
            });
            
            // Abrir a resposta clicada (se não estava ativa)
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('show');
            }
        });
    });
});

// ===================================
// SIMULAÇÃO DO APP DE GRAVAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const micButton = document.querySelector('.mic-button');
    const sendButton = document.getElementById('send-audio');
    const instruction = document.querySelector('.instruction');
    
    if (micButton) {
        let isRecording = false;
        
        micButton.addEventListener('click', function() {
            isRecording = !isRecording;
            
            if (isRecording) {
                // Iniciar gravação
                this.classList.add('recording');
                this.innerHTML = '<i class="fas fa-stop"></i>';
                instruction.innerHTML = '<i class="fas fa-circle"></i> Gravando... Clique novamente para parar';
                instruction.style.color = '#d32f2f';
                
                if (sendButton) {
                    sendButton.style.display = 'none';
                }
            } else {
                // Parar gravação
                this.classList.remove('recording');
                this.innerHTML = '<i class="fas fa-microphone"></i>';
                instruction.innerHTML = '<i class="fas fa-volume-up"></i> Fale sua dúvida sobre carreira';
                instruction.style.color = '#212121';
                
                if (sendButton) {
                    sendButton.style.display = 'inline-block';
                }
            }
        });
    }
    
    if (sendButton) {
        sendButton.addEventListener('click', function() {
            // Simular envio e redirecionar para página de resposta
            this.textContent = 'Enviando...';
            this.disabled = true;
            
            setTimeout(function() {
                window.location.href = 'app-resposta.html';
            }, 1000);
        });
    }
});

// ===================================
// SIMULAÇÃO DO APP DE RESPOSTA
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('.play-button');
    const visualizer = document.querySelector('.audio-visualizer');
    const feedbackButtons = document.querySelectorAll('.feedback-btn');
    
    if (playButton) {
        let isPlaying = false;
        
        playButton.addEventListener('click', function() {
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                // Iniciar reprodução
                this.classList.add('playing');
                this.innerHTML = '<i class="fas fa-pause"></i>';
                
                // Ativar visualizador
                if (visualizer) {
                    const bars = visualizer.querySelectorAll('.bar');
                    bars.forEach(bar => {
                        bar.style.animationPlayState = 'running';
                    });
                }
                
                // Simular fim da reprodução após 5 segundos
                setTimeout(() => {
                    if (isPlaying) {
                        playButton.click();
                    }
                }, 5000);
            } else {
                // Pausar reprodução
                this.classList.remove('playing');
                this.innerHTML = '<i class="fas fa-play"></i>';
                
                // Pausar visualizador
                if (visualizer) {
                    const bars = visualizer.querySelectorAll('.bar');
                    bars.forEach(bar => {
                        bar.style.animationPlayState = 'paused';
                    });
                }
            }
        });
    }
    
    // Feedback buttons
    feedbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const feedbackType = this.classList.contains('like') ? 'positivo' : 'negativo';
            
            // Feedback visual
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Mostrar mensagem
            const message = document.createElement('div');
            message.className = 'success-message show';
            message.style.marginTop = '20px';
            message.textContent = `Obrigado pelo seu feedback ${feedbackType}!`;
            
            const container = this.closest('.app-container');
            const existingMessage = container.querySelector('.success-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            container.appendChild(message);
            
            // Remover mensagem após 3 segundos
            setTimeout(() => {
                message.remove();
            }, 3000);
        });
    });
    
    // Pausar animação do visualizador inicialmente
    if (visualizer) {
        const bars = visualizer.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    }
});

// ===================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
