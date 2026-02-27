// ============================================
// PROGRAMOVACÍ SEMINÁŘ - SCRIPT.JS
// Interakce, animace a Easter eggy
// ============================================

// Zpráva v DevTools
console.log('%c🐍 Tebe rozhodně hledám! Přijď na seminář.', 'color: #00ff41; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);');
console.log('%c💡 Hint: Zkus Konami kód (↑↑↓↓←→←→BA)', 'color: #00d4ff; font-size: 12px;');
console.log('%c📧 Dotazy? vladislav.valek@mgvsetin.cz', 'color: #ffcc00; font-size: 12px;');

// ============================================
// INTERSECTION OBSERVER PRO FADE-IN SEKCE
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Sledování všech fade-section prvků
document.querySelectorAll('.fade-section').forEach(section => {
    observer.observe(section);
});

// ============================================
// KONAMI KÓD (↑↑↓↓←→←→BA)
// ============================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    const key = e.key === 'b' || e.key === 'a' ? e.key.toLowerCase() : e.code;
    
    if (key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        // Konami kód aktivován! 🎮
        if (konamiIndex === konamiCode.length) {
            triggerKonamiMagic();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
        if (key === konamiCode[konamiIndex]) {
            konamiIndex++;
        }
    }
});

// Konami efekt: neon animace + text change
function triggerKonamiMagic() {
    console.log('%c🎮 KONAMI KÓD AKTIVOVÁN! 🎮', 'color: #00ff41; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 255, 65, 0.8);');
    
    // Body zmizí na moment a vrátí se s neonem
    document.body.style.transition = 'all 0.3s ease';
    document.body.style.filter = 'brightness(1.5) saturate(1.5)';
    
    setTimeout(() => {
        document.body.style.filter = 'brightness(1) saturate(1)';
    }, 300);
    
    // Změní text na tlačítku na peníze
    const button = document.querySelector('.cta-button');
    if (button) {
        const originalText = button.textContent;
        button.textContent = '💰 TEHDÁ HURÁ! 💰';
        button.style.animation = 'pulse 0.5s ease-in-out';
        
        setTimeout(() => {
            button.textContent = originalText;
        }, 3000);
    }
    
    // Blikající animace všech sekcí
    document.querySelectorAll('section').forEach((section, index) => {
        setTimeout(() => {
            section.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.5), inset 0 0 20px rgba(0, 255, 65, 0.1)';
            setTimeout(() => {
                section.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.1)';
            }, 300);
        }, index * 100);
    });
    
    // Matrix efekt s padajícím textem
    createMatrixRain();
}

// Matrix rain efekt
function createMatrixRain() {
    const chars = '01abcdefghijklmnopqrstuvwxyzPYTH0N';
    const duration = 2000;
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = '-20px';
        particle.style.color = Math.random() > 0.5 ? '#00ff41' : '#00d4ff';
        particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        particle.style.fontWeight = 'bold';
        particle.style.zIndex = '10000';
        particle.style.textShadow = '0 0 10px currentColor';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = '0.7';
        
        document.body.appendChild(particle);
        
        const startY = -20;
        const endY = window.innerHeight + 20;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                particle.style.top = (startY + (endY - startY) * progress) + 'px';
                particle.style.opacity = 1 - progress;
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// ============================================
// DYNAMICKÁ ANIMACE NA TYPEWRITER NADPISU
// ============================================
window.addEventListener('load', () => {
    const titleElement = document.getElementById('typewriter');
    
    // Přeaguje na drugi klik - glitch efekt
    let clickCount = 0;
    titleElement.addEventListener('click', () => {
        clickCount++;
        titleElement.style.animation = 'none';
        
        setTimeout(() => {
            titleElement.style.animation = 'glitch 0.5s infinite';
        }, 10);
        
        if (clickCount === 3) {
            titleElement.textContent = '⚡ PROGRAMOVÁNÍ JE COOL ⚡';
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    });
});

// ============================================
// SMOOTH SCROLL EFEKT
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// RANDOM IMAGE POSITIONS (PŘIROZENÝ LOOK)
// ============================================
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Náhodné zpoždění načítání
        const randomDelay = Math.random() * 0.5;
        img.style.animationDelay = randomDelay + 's';
    });
});

// ============================================
// TERMINAL BLIK EFEKT NA KLIKNUTÍ
// ============================================
document.addEventListener('click', (e) => {
    const terminals = document.querySelectorAll('.terminal-output, .terminal-prompt');
    terminals.forEach(terminal => {
        terminal.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.5)';
        setTimeout(() => {
            terminal.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.1)';
        }, 200);
    });
});

// ============================================
// MOBILE OPTIMIZATION
// ============================================
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
    // Změní scanline overlay na slabší verzi pro mobil
    document.body.style.opacity = '1';
    
    // Zvětší klikatelné prvky
    document.querySelectorAll('.cta-button').forEach(btn => {
        btn.style.padding = '20px 50px';
        btn.style.fontSize = '16px';
    });
}

// ============================================
// EASTER EGG: RANDOM CONSOLE MESSAGES
// ============================================
const messages = [
    '🔍 Pořádně si čteš! Asi budeš dobrý/á programátor/ka.',
    '💻 Toto je čistý HTML5, CSS3 a vanilla JS. Žádný Bootstrap!',
    '🐍 Python je krásný jazyk. Pojď se ho naučit.',
    '🎮 Zkus Konami kód: ↑↑↓↓←→←→BA',
    '📧 Otázky? vladislav.valek@mgvsetin.cz',
    '⚡ Seminář tě čeká!',
    '🔗 git commit -m "Chci se přihlásit"',
    '🌟 Úspětí vám!',
];

// Vyber náhodnou zprávu każých 5 minut
setInterval(() => {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    console.log(`%c${randomMsg}`, 'color: #00d4ff; font-size: 12px;');
}, 5 * 60 * 1000);

// ============================================
// AUDIO FEEDBACK (OPTIONAL - Pouze pokud chceš zvuk)
// ============================================
function playBeep() {
    // Jednoduché zvukové API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 400;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Přehraje zvuk při aktivaci Konami kódu
document.addEventListener('keydown', (e) => {
    if (e.key === 'a' || e.key === 'b') {
        try {
            playBeep();
        } catch (err) {
            // Audio Context není dostupný - ignoruj
        }
    }
});

// ============================================
// PULSE ANIMACE PRO NEON GLOW
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 20px var(--accent), 0 0 40px var(--accent);
        }
        50% {
            box-shadow: 0 0 30px var(--accent), 0 0 60px var(--accent);
        }
    }
    
    @keyframes matrixFall {
        to {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// DETEKTOR ZÁJMU: LOG POKUD UŽIVATEL ČTE DEVTOOLS
// ============================================
let devToolsOpen = false;
setInterval(() => {
    const threshold = 160;
    if (window.outerHeight - window.innerHeight > threshold) {
        if (!devToolsOpen) {
            devToolsOpen = true;
            console.log('%c💡 Vidím, že máš DevTools otevřené!', 'color: #00ff41; font-size: 14px; font-weight: bold;');
            console.log('%cAbys se přihlásil/a, jdi na: vladislav.valek@mgvsetin.cz', 'color: #ffcc00; font-size: 12px;');
        }
    } else {
        devToolsOpen = false;
    }
}, 500);

console.log('%c════════════════════════════════════════', 'color: #00ff41;');
console.log('%c  VÍTEJ NA STRÁNCE PROGRAMOVACÍHO SEMINÁŘE', 'color: #00d4ff; font-size: 14px; font-weight: bold;');
console.log('%c════════════════════════════════════════', 'color: #00ff41;');
