// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. FUNCIONALIDADE DO MENU HAMBÚRGUER
    // =========================================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // =========================================================
    // 2. ROLAGEM SUAVE (Smooth Scroll)
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    // =========================================================
    // 3. EFEITO DE MÁQUINA DE ESCREVER (Typing Effect)
    // =========================================================
    const textElement = document.getElementById('typing-text');
    const textsToType = [
        "Paulo Dos Santos."
    ]; 
    let textIndex = 0;
    let charIndex = 0;

    function typeWriter() {
        if (textIndex < textsToType.length) {
            const currentText = textsToType[textIndex];

            // Digitando
            if (charIndex < currentText.length) {
                textElement.textContent += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100); 
            } 
            // Pausa
            else if (charIndex === currentText.length) {
                setTimeout(eraseText, 2500); 
            }
        } 
        // Reinicia o loop
        else {
            textIndex = 0;
            setTimeout(typeWriter, 500); 
        }
    }

    function eraseText() {
        const currentText = textsToType[textIndex];
        
        // Apagando
        if (charIndex > 0) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, 50); 
        } 
        // Próximo texto
        else {
            textIndex++;
            setTimeout(typeWriter, 500); 
        }
    }

    // Inicia a digitação
    typeWriter();


    // =========================================================
    // 4. INICIALIZAÇÃO DO BACKGROUND DE PARTÍCULAS
    // =========================================================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 60,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00FFFF" // Azul Neon
                },
                "shape": {
                    "type": "circle",
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                },
                "size": {
                    "value": 2, 
                    "random": true,
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00FFFF", 
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2, 
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
            },
            "retina_detect": true
        });
    }

    // =========================================================
    // 5. ENVIAR FORMULÁRIO PARA WHATSAPP
    // =========================================================
    const whatsappForm = document.getElementById('whatsapp-form');
    // 🚨 IMPORTANTE: SUBSTITUA PELO SEU NÚMERO (código do país + DDD + número)
    const phoneNumber = "5513996586501"; 

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const name = document.getElementById('inputName').value;
            const email = document.getElementById('inputEmail').value;
            const message = document.getElementById('inputMessage').value;

            // Formata a mensagem com quebras de linha (serão codificadas)
            let fullMessage = `
Olá! Gostaria de falar sobre um projeto.
Meu nome: ${name}
Meu e-mail: ${email}
---
Mensagem:
${message}
            `.trim();

            // Codifica a mensagem para URL, substituindo as quebras de linha para o formato WhatsApp
            const encodedMessage = encodeURIComponent(fullMessage).replace(/%0A/g, '%0D%0A');

            // Constrói a URL final
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

            // Abre o link em uma nova aba/janela
            window.open(whatsappUrl, '_blank');
        });
    }
});