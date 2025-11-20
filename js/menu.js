// ===================================
// MENU HAMBÚRGUER RESPONSIVO
// ===================================

let menuInitialized = false;

// Função para inicializar o menu
function initializeMenu() {
    // Evitar inicialização duplicada
    if (menuInitialized) return;
    
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    // Verificar se os elementos existem antes de inicializar
    if (!menuToggle || !nav) {
        console.log('Aguardando carregamento dos componentes...');
        return;
    }
    
    menuInitialized = true;
    console.log('Menu inicializado!');
    
    // Menu hambúrguer
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Mudar ícone do menu
        const icon = this.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fechar menu ao clicar em um link (mobile)
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 480) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Fechar menu ao clicar fora (mobile)
    document.addEventListener('click', function(e) {
        // Verificar se o menu está aberto e se o clique foi fora do menu e do botão
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 480 && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // ===================================
    // DROPDOWN MENU
    // ===================================
    
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    
    if (dropdown && dropdownToggle) {
        console.log('Dropdown encontrado, inicializando...');
        
        // Toggle dropdown ao clicar
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Dropdown clicado!');
            dropdown.classList.toggle('active');
        });
        
        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
        
        // Fechar dropdown ao clicar em um link interno
        const dropdownLinks = dropdown.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                dropdown.classList.remove('active');
            });
        });
    } else {
        console.log('Dropdown não encontrado!');
    }
}

// Inicializar quando os componentes forem carregados
document.addEventListener('componentsLoaded', function() {
    console.log('Evento componentsLoaded disparado');
    initializeMenu();
});

// Fallback: inicializar no DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded disparado');
    // Aguardar um pouco para dar tempo dos componentes carregarem
    setTimeout(function() {
        initializeMenu();
    }, 300);
});
