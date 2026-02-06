document.addEventListener('DOMContentLoaded', () => {
    initGreeting();
    initTypingEffect();
    initTiltEffect();
    initPiano();
});

/* 1. Time-based Greeting */
function initGreeting() {
    const greetingElement = document.querySelector('.greeting');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let text = "Hello, I'm";

    if (hour >= 5 && hour < 12) text = "Good Morning, I'm";
    else if (hour >= 12 && hour < 18) text = "Good Afternoon, I'm";
    else if (hour >= 18) text = "Good Evening, I'm";

    greetingElement.textContent = text;
}

/* 2. Typewriter Effect */
function initTypingEffect() {
    const element = document.querySelector('.hero-description');
    if (!element) return;

    const text = element.textContent.trim();
    element.textContent = '';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 30); // Typing speed
        }
    }
    
    // Start after initial fade-in
    setTimeout(type, 1500); 
}

/* 3. 3D Tilt Effect */
function initTiltEffect() {
    const cards = document.querySelectorAll('.bento-item');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // Max -5deg to 5deg
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/* 4. Playable Piano Pulse */
function initPiano() {
    const pianoCard = document.querySelector('.piano');
    if (!pianoCard) return;

    pianoCard.addEventListener('click', () => {
        // Visual Pulse
        pianoCard.classList.add('playing');
        setTimeout(() => pianoCard.classList.remove('playing'), 200);

        // Simple Audio Tone
        playTone();
    });
    
    // Hint to user it's clickable
    pianoCard.style.cursor = 'pointer';
    pianoCard.setAttribute('title', 'Click to play a note!');
}

function playTone() {
    // Basic Web Audio API for a pleasant "ding"
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // Slide up slightly

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
        console.log("Audio not supported");
    }
}
