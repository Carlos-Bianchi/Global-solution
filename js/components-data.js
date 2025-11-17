// ===================================
// DADOS DOS COMPONENTES
// ===================================

// HTML do Header
const HEADER_HTML = `<header>
    <div class="header-container">
        <div class="logo">
            <i class="fas fa-microphone-alt"></i>
            <span>Futuro em Voz</span>
        </div>
        <button class="menu-toggle" aria-label="Abrir menu">
            <i class="fas fa-bars"></i>
        </button>
        <nav>
            <ul>
                <li><a href="index.html">Início</a></li>
                <li><a href="sobre.html">Sobre</a></li>
                <li class="dropdown">
                    <button class="dropdown-toggle">
                        App <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a href="app-gravacao.html"><i class="fas fa-microphone"></i> Gravar Pergunta</a>
                        <a href="app-resposta.html"><i class="fas fa-volume-up"></i> Ouvir Resposta</a>
                    </div>
                </li>
                <li><a href="integrantes.html">Equipe</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="contato.html">Contato</a></li>
            </ul>
        </nav>
    </div>
</header>`;

// HTML do Footer
const FOOTER_HTML = `<footer>
    <div class="container">
        <p>&copy; 2024 Futuro em Voz. Todos os direitos reservados.</p>
        <p>Desenvolvido com <i class="fas fa-heart" style="color: #ff6f00;"></i> para acessibilidade</p>
    </div>
</footer>`;
