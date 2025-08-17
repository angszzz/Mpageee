class ProposalPage {
    constructor() {
        this.yesBtn = document.getElementById('yesBtn');
        this.noBtn = document.getElementById('noBtn');
        this.questionText = document.getElementById('questionText');
        this.loveMessage = document.getElementById('loveMessage');
        this.buttonsContainer = document.getElementById('buttonsContainer');
        this.proposalContainer = document.getElementById('proposalContainer');
        this.characterImg = document.getElementById('characterImg');
        
        this.attemptCount = 0;
        this.maxAttempts = 8;
        this.yespressed = false;
        
        this.init();
    }

    init() {
        this.yesBtn.addEventListener('click', () => this.handleYes());
        this.noBtn.addEventListener('mouseenter', () => this.handleNoHover());
        this.noBtn.addEventListener('click', (e) => this.handleNoClick(e));
        
        this.setupGifLoop();
    }

    setupGifLoop() {
        const gifs = document.querySelectorAll('.gif img, .character img');
        gifs.forEach(gif => {
            const originalSrc = gif.src;
            setInterval(() => {
                if (gif.id === 'characterImg' && this.yespressed) return;
                gif.src = originalSrc + '?t=' + Date.now();
            }, 3000);
        });
    }

    handleYes() {
        this.yespressed = true;
        
        this.proposalContainer.classList.add('celebrating');
        
        this.questionText.style.display = 'none';
        this.buttonsContainer.style.display = 'none';
        
        this.loveMessage.style.display = 'block';
        this.characterImg.src = 'images/bg2.gif';
        
        document.querySelector('.header').style.background = 
            'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 25%, #DDA0DD 50%, #DA70D6 75%, #FF69B4 100%)';
        
        this.createHeartParticles();
        
        setTimeout(() => {
            this.proposalContainer.classList.remove('celebrating');
        }, 800);
    }

    handleNoHover() {
        if (this.attemptCount < this.maxAttempts) {
            this.moveNoButton();
        }
    }

    handleNoClick(e) {
        e.preventDefault();
        this.moveNoButton();
        
        this.attemptCount++;
        
        if (this.attemptCount >= this.maxAttempts) {
            this.noBtn.style.display = 'none';
        }
    }

    moveNoButton() {
        const btnRect = this.noBtn.getBoundingClientRect();
        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        const margin = 80;
        const buttonWidth = 160;
        const buttonHeight = 60;
        
        const minX = margin;
        const maxX = viewportWidth - buttonWidth - margin;
        const minY = margin + 100;
        const maxY = viewportHeight - buttonHeight - margin - 100;
        
        const safeMaxX = Math.max(minX + 50, maxX);
        const safeMaxY = Math.max(minY + 50, maxY);
        
        const centerAreaWidth = (safeMaxX - minX) * 0.5;
        const centerAreaHeight = (safeMaxY - minY) * 0.5;
        
        const centerStartX = minX + (safeMaxX - minX - centerAreaWidth) / 2;
        const centerStartY = minY + (safeMaxY - minY - centerAreaHeight) / 2;
        
        let newX = Math.random() * centerAreaWidth + centerStartX;
        let newY = Math.random() * centerAreaHeight + centerStartY;
        
        newX = Math.max(margin, Math.min(newX, viewportWidth - buttonWidth - margin));
        newY = Math.max(margin + 100, Math.min(newY, viewportHeight - buttonHeight - margin - 100));
        
        this.noBtn.style.position = 'fixed';
        this.noBtn.style.left = newX + 'px';
        this.noBtn.style.top = newY + 'px';
        this.noBtn.style.zIndex = '1000';
    }

    createHeartParticles() {
        const colors = ['#FF69B4', '#FFC0CB', '#FFB6C1', '#FF1493', '#DA70D6'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${window.innerHeight + 50}px;
                    font-size: ${Math.random() * 20 + 15}px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: floatUp 3s ease-out forwards;
                `;
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    document.body.removeChild(heart);
                }, 3000);
            }, i * 100);
        }
        
        if (!document.querySelector('#heartParticleStyle')) {
            const style = document.createElement('style');
            style.id = 'heartParticleStyle';
            style.textContent = `
                @keyframes floatUp {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProposalPage();
});