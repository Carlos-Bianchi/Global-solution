# Futuro em Voz

## 📋 Descrição do Projeto

O **Futuro em Voz** é uma aplicação web de acessibilidade focada em pessoas analfabetas, oferecendo orientação profissional através de comunicação por áudio com inteligência artificial. O projeto elimina barreiras de leitura e escrita, permitindo que qualquer pessoa possa receber orientação sobre carreira, emprego e desenvolvimento profissional.

### 🎯 Objetivo

Democratizar o acesso à orientação de carreira, tornando-a acessível para pessoas que não sabem ler ou escrever, através de uma interface intuitiva baseada em áudio e ícones visuais.

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização responsiva e moderna
- **JavaScript Vanilla** - Interatividade e funcionalidades
- **Font Awesome 6.4.0** - Ícones intuitivos

## 📁 Estrutura de Pastas

```
Global-solution/
│
├── index.html              # Página inicial
├── sobre.html              # Sobre o projeto
├── integrantes.html        # Equipe do projeto
├── faq.html                # Perguntas frequentes
├── contato.html            # Formulário de contato
├── app-gravacao.html       # Interface de gravação de áudio
├── app-resposta.html       # Interface de resposta da IA
│
├── components/             # Componentes reutilizáveis
│   ├── header.html         # Header do site
│   └── footer.html         # Footer do site
│
├── css/
│   └── style.css           # Todos os estilos do projeto
│
├── js/
│   ├── components-data.js  # Dados dos componentes (HTML)
│   ├── components.js       # Carregamento de componentes
│   ├── script.js           # Lógica principal da aplicação
│   └── menu.js             # Lógica do menu responsivo
│
├── assets/                 # Pasta para imagens e ícones
│
└── README.md               # Documentação do projeto
```

## 🎨 Características de Design

### Acessibilidade para Analfabetos
- ✅ Ícones grandes e intuitivos
- ✅ Botões gigantes (especialmente o de microfone)
- ✅ Cores de alto contraste (WCAG AA)
- ✅ Layout limpo com pouco texto
- ✅ Comunicação visual prioritária

### Responsividade
- 📱 **Mobile**: até 480px
- 📱 **Tablet**: 481px a 768px
- 💻 **Desktop**: acima de 768px

## 🛠️ Funcionalidades Implementadas

### 1. Menu Responsivo (Hambúrguer)
- Menu adaptativo que aparece como hambúrguer em dispositivos móveis
- Animação suave de abertura/fechamento
- Ícone muda de "barras" para "X" quando ativo

### 2. Validação de Formulário
- Validação em tempo real dos campos
- Mensagens de erro exibidas no DOM (não apenas alert)
- Validação de formato de email
- Uso de `preventDefault()` para controle do envio

### 3. FAQ com Acordeão
- Sistema de perguntas e respostas expansíveis
- Apenas uma resposta aberta por vez
- Animação suave de abertura/fechamento
- Ícone rotativo para indicar estado

### 4. Simulação do App de Gravação
- Botão de microfone pulsante com animação CSS
- Mudança de estado visual ao gravar (vermelho)
- Feedback visual claro do estado de gravação
- Redirecionamento automático após envio

### 5. Simulação do App de Resposta
- Visualizador de áudio com barras animadas
- Botão de play/pause funcional
- Botões de feedback (like/dislike)
- Animações sincronizadas com reprodução

## 🎯 Páginas do Projeto

### Páginas Institucionais
1. **index.html** - Apresentação da proposta com CTA claro
2. **sobre.html** - Explicação do problema e da solução
3. **integrantes.html** - Cards dos 5 integrantes com fotos, RM, turma e redes sociais
4. **faq.html** - Perguntas frequentes com acordeão interativo
5. **contato.html** - Formulário de contato com validação

### Páginas da Solução
1. **app-gravacao.html** - Interface para gravar perguntas por áudio
2. **app-resposta.html** - Interface para ouvir respostas da IA

## 👥 Integrantes do Projeto

| Nome | RM | Turma | LinkedIn | GitHub |
|------|-----|-------|----------|--------|
| Ana Paula Silva | 123456 | 1TDSPF | [LinkedIn](#) | [GitHub](#) |
| Carlos Eduardo Santos | 234567 | 1TDSPF | [LinkedIn](#) | [GitHub](#) |
| Mariana Costa Oliveira | 345678 | 1TDSPF | [LinkedIn](#) | [GitHub](#) |
| Rafael Almeida Ferreira | 456789 | 1TDSPF | [LinkedIn](#) | [GitHub](#) |
| Juliana Rodrigues Lima | 567890 | 1TDSPF | [LinkedIn](#) | [GitHub](#) |

## 🔗 Links do Projeto

- **GitHub**: [Adicionar URL do repositório]
- **Deploy**: [Adicionar URL do deploy]

## 📦 Como Executar o Projeto

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
```

2. Navegue até a pasta do projeto:
```bash
cd Global-solution
```

3. Abra o arquivo `index.html` em seu navegador ou use um servidor local:
```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server
```

4. Acesse no navegador:
```
http://localhost:8000
```

## ✨ Destaques Técnicos

### HTML Semântico
- Uso correto de tags semânticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Apenas um `<h1>` por página
- Hierarquia correta de headings
- Atributos ARIA para acessibilidade

### CSS Modular
- Variáveis CSS para cores e espaçamentos
- Mobile-first approach
- Animações CSS para melhor UX
- Grid e Flexbox para layouts responsivos

### JavaScript Limpo
- Código separado em módulos (components.js, script.js e menu.js)
- Event listeners eficientes
- Manipulação do DOM sem bibliotecas externas
- Feedback visual em todas as interações
- Sistema de componentes reutilizáveis (header e footer)

### Arquitetura de Componentes
- **Header e Footer Centralizados**: Componentes HTML armazenados como variáveis JavaScript
- **Manutenção Simplificada**: Edite apenas `js/components-data.js` para atualizar header/footer em todas as páginas
- **Carregamento Instantâneo**: Componentes são injetados diretamente no DOM via JavaScript
- **Compatibilidade Total**: Funciona com arquivos locais (file://) e em qualquer servidor web

## 🎨 Paleta de Cores

- **Primária**: #1a237e (Azul Escuro)
- **Secundária**: #ff6f00 (Laranja)
- **Destaque**: #00c853 (Verde)
- **Fundo**: #ffffff (Branco)
- **Texto**: #212121 (Preto)
- **Erro**: #d32f2f (Vermelho)

## 📱 Compatibilidade

- ✅ Chrome/Edge (versões recentes)
- ✅ Firefox (versões recentes)
- ✅ Safari (versões recentes)
- ✅ Opera (versões recentes)
- ✅ Navegadores móveis (iOS e Android)

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais como parte de um trabalho universitário.

## 🤝 Contribuições

Este é um projeto acadêmico. Para sugestões ou melhorias, entre em contato através da página de contato do site.

---

**Desenvolvido com ❤️ para acessibilidade**