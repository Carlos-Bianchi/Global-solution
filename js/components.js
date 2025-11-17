// ===================================
// CARREGAMENTO DE COMPONENTES
// ===================================

// Função para inserir componentes HTML
function loadComponent(elementId, htmlContent) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = htmlContent;
    } else {
        console.error(`Elemento com id "${elementId}" não encontrado`);
    }
}

// Carregar header e footer quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Carregar header
    loadComponent('header-placeholder', HEADER_HTML);
    
    // Carregar footer
    loadComponent('footer-placeholder', FOOTER_HTML);
    
    // Aguardar um pequeno delay para garantir que os elementos foram inseridos no DOM
    setTimeout(() => {
        // Disparar evento customizado para indicar que os componentes foram carregados
        const event = new CustomEvent('componentsLoaded');
        document.dispatchEvent(event);
    }, 50);
});
