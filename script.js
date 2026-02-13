// Mensajes divertidos cuando intenta presionar "No"
const mensajesEscape = [
    "ve tenes que deicr si y ya",
    "¡No pero porquee!",
    "¿Seguro que quieres decir no?",
    "ya es el destino amor",
    "¡Inténtalo de nuevo JAJAJJA! ",
    "¿Por qué huyes del amor?",
    "ijole como que no",
    "Mejor dale al otro botón... ",
    "¡No seas tímida amor",
    "El destino dice que SÍ ",
    "NOOOO",
    "¿Ya te cansaste? Dale SÍ"
];

let intentos = 0;
let contadorMensajes = 0;

const btnNo = document.getElementById('btn-no');
const mensajeEscape = document.getElementById('mensaje-escape');

// Función para mover el botón "No"
function moverBoton() {
    const container = document.querySelector('.card');
    const containerRect = container.getBoundingClientRect();
    
    // Calcular nueva posición aleatoria
    const maxX = containerRect.width - btnNo.offsetWidth - 20;
    const maxY = 150; // Limitar movimiento vertical
    
    const randomX = Math.random() * maxX - maxX/2;
    const randomY = Math.random() * maxY;
    
    // Aplicar transformación
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Mostrar mensaje divertido
    mensajeEscape.textContent = mensajesEscape[contadorMensajes % mensajesEscape.length];
    contadorMensajes++;
    intentos++;
    
    // Después de varios intentos, el botón se hace más pequeño
    if (intentos > 5) {
        const scale = Math.max(0.5, 1 - (intentos - 5) * 0.1);
        btnNo.style.transform += ` scale(${scale})`;
    }
    
    // Después de muchos intentos, el botón desaparece
    if (intentos > 10) {
        btnNo.style.opacity = '0.5';
        mensajeEscape.textContent = "¡Ya mi amor queremee JAJAJJj";
    }
    
    if (intentos > 15) {
        btnNo.style.display = 'none';
        mensajeEscape.textContent = "El botón se fue! Solo queda una opción...";
    }
}

// Event listeners para el botón "No"
btnNo.addEventListener('mouseenter', moverBoton);
btnNo.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moverBoton();
});
btnNo.addEventListener('click', function(e) {
    e.preventDefault();
    moverBoton();
});

// Función cuando dice SÍ
function decirSi() {
    // Ocultar pantalla de pregunta
    document.getElementById('pregunta-container').classList.add('oculto');
    
    // Mostrar pantalla de celebración
    document.getElementById('celebracion-container').classList.remove('oculto');
    
    // Crear confeti
    crearConfeti();
    
    // Reproducir efecto de corazones flotantes extra
    crearCorazonesFlotantes();
}

// Crear efecto de confeti
function crearConfeti() {
    const colores = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
    const emojis = ['💖', '💕', '✨', '🎉', '💗', '🌹', '💝'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confeti = document.createElement('div');
            confeti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confeti.style.cssText = `
                position: fixed;
                top: -20px;
                left: ${Math.random() * 100}vw;
                font-size: ${Math.random() * 20 + 15}px;
                pointer-events: none;
                z-index: 1000;
                animation: caerConfeti ${Math.random() * 3 + 2}s linear forwards;
            `;
            document.body.appendChild(confeti);
            
            // Eliminar después de la animación
            setTimeout(() => confeti.remove(), 5000);
        }, i * 100);
    }
    
    // Agregar keyframes dinámicamente
    if (!document.querySelector('#confeti-styles')) {
        const style = document.createElement('style');
        style.id = 'confeti-styles';
        style.textContent = `
            @keyframes caerConfeti {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Crear corazones flotantes extra
function crearCorazonesFlotantes() {
    setInterval(() => {
        const corazon = document.createElement('div');
        corazon.textContent = '💕';
        corazon.style.cssText = `
            position: fixed;
            bottom: -20px;
            left: ${Math.random() * 100}vw;
            font-size: ${Math.random() * 25 + 20}px;
            pointer-events: none;
            z-index: 999;
            animation: subirCorazon ${Math.random() * 4 + 3}s linear forwards;
        `;
        document.body.appendChild(corazon);
        
        setTimeout(() => corazon.remove(), 7000);
    }, 500);
    
    // Agregar keyframes si no existen
    if (!document.querySelector('#corazones-styles')) {
        const style = document.createElement('style');
        style.id = 'corazones-styles';
        style.textContent = `
            @keyframes subirCorazon {
                0% {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) scale(1.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Hacer la función accesible globalmente
window.decirSi = decirSi;
