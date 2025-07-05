// Lista de verdades y retos
const verdades = [
    "¿Cuál es tu mayor miedo?",
    "¿Cuál es tu peor hábito?",
    "¿Alguna vez has mentido para salir de un compromiso?",
    "¿Cuál es tu mayor arrepentimiento?",
    "¿Qué es lo más vergonzoso que has hecho borracho?",
    "¿Has hecho trampa en un examen?",
    "¿Cuál es tu mayor inseguridad?",
    "¿Qué es lo más raro que te atrae de alguien?",
    "¿Alguna vez has robado algo?",
    "¿Cuál es tu mayor secreto que nadie en esta habitación sepa?"
];

const retos = [
    "Imita a alguien en la habitación hasta tu próximo turno.",
    "Baila durante 30 segundos como si nadie te estuviera viendo.",
    "Deja que el grupo vea las últimas 5 fotos de tu galería.",
    "Haz 10 sentadillas con alguien en tus hombros.",
    "Canta el coro de tu canción favorita en voz alta.",
    "Publica algo vergonzoso en tus redes sociales.",
    "Deja que alguien te haga un peinado loco y así te quedarás todo el juego.",
    "Llama a un contacto aleatorio y canta feliz cumpleaños.",
    "Come una cucharada de algo picante.",
    "Haz 10 flexiones con alguien sentado en tu espalda."
];

// Elementos del DOM
const card = document.getElementById('card');
const challengeText = document.getElementById('challenge-text');
const verdadBtn = document.getElementById('verdad');
const retoBtn = document.getElementById('reto');
const siguienteBtn = document.getElementById('siguiente');
const timerElement = document.getElementById('timer');
const challengeButtons = document.querySelector('.challenge-buttons');

// Variables del juego
let timer;
let timeLeft = 30;
let isChallengeActive = false;

// Función para obtener un elemento aleatorio de un array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Función para iniciar el temporizador
function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    updateTimer();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            challengeText.textContent = "¡Tiempo terminado! Elige otra opción.";
            resetGameState();
        }
    }, 1000);
}

// Función para actualizar el temporizador
function updateTimer() {
    timerElement.textContent = timeLeft;
    
    // Cambiar color según el tiempo restante
    if (timeLeft <= 10) {
        timerElement.style.backgroundColor = "#f44336";
        timerElement.style.animation = "pulse 0.5s infinite";
    } else if (timeLeft <= 20) {
        timerElement.style.backgroundColor = "#ff9800";
        timerElement.style.animation = "pulse 1s infinite";
    } else {
        timerElement.style.backgroundColor = "#4caf50";
        timerElement.style.animation = "pulse 1.5s infinite";
    }
}

// Función para reiniciar el estado del juego
function resetGameState() {
    clearInterval(timer);
    isChallengeActive = false;
    timeLeft = 30;
    updateTimer();
    challengeButtons.style.display = 'flex';
    siguienteBtn.classList.remove('visible');
    siguienteBtn.style.display = 'none';
}

// Función para mostrar un desafío
function showChallenge(type) {
    if (isChallengeActive) return;
    
    isChallengeActive = true;
    let challenge;
    
    // Ocultar botones de desafío temporalmente
    challengeButtons.style.display = 'none';
    
    if (type === 'verdad') {
        challenge = getRandomItem(verdades);
        card.style.transform = 'rotateY(180deg) rotateZ(5deg)';
        setTimeout(() => card.style.transform = 'rotateY(0) rotateZ(0)', 100);
    } else {
        challenge = getRandomItem(retos);
        card.style.transform = 'rotateY(-180deg) rotateZ(-5deg)';
        setTimeout(() => card.style.transform = 'rotateY(0) rotateZ(0)', 100);
    }
    
    // Efecto de escritura
    let i = 0;
    challengeText.textContent = "";
    const speed = 30; // Velocidad de escritura en milisegundos
    
    function typeWriter() {
        if (i < challenge.length) {
            challengeText.textContent += challenge.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Mostrar botón de siguiente cuando termina la animación
            siguienteBtn.classList.add('visible');
            siguienteBtn.style.display = 'block';
            startTimer();
        }
    }
    
    typeWriter();
}

// Función para manejar el botón Siguiente
function handleSiguiente() {
    resetGameState();
    challengeText.textContent = "Elige Verdad o Reto";
}

// Event Listeners
verdadBtn.addEventListener('click', () => showChallenge('verdad'));
retoBtn.addEventListener('click', () => showChallenge('reto'));
siguienteBtn.addEventListener('click', handleSiguiente);

// Permitir usar la barra espaciadora o Enter para ir al siguiente desafío
document.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && isChallengeActive) {
        handleSiguiente();
    }
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    updateTimer();
});
