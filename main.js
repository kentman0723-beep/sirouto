/**
 * 素人開発くん - Portfolio JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initProjectCards();
    initAdModal();
    initSmoothScroll();
    updateProjectCount();
});

/**
 * Initialize project card click handlers
 */
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card:not(.coming-soon)');
    
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const projectUrl = card.dataset.url;
            
            if (projectUrl && projectUrl !== '#') {
                // Show interstitial ad before navigating
                showAdModal(() => {
                    window.open(projectUrl, '_blank');
                });
            } else {
                // For demo: just show the ad modal
                showAdModal(() => {
                    console.log('Project URL not set');
                });
            }
        });
    });
}

/**
 * Ad Modal Controller
 */
let adModalCallback = null;
let countdownInterval = null;

function initAdModal() {
    const modal = document.getElementById('adModal');
    const closeBtn = document.getElementById('adCloseBtn');
    const skipBtn = document.getElementById('adSkipBtn');
    const timerSpan = document.getElementById('closeTimer');
    
    // Close button click
    closeBtn.addEventListener('click', () => {
        const remaining = parseInt(timerSpan.textContent);
        if (remaining <= 0) {
            closeAdModal();
        }
    });
    
    // Skip button click
    skipBtn.addEventListener('click', () => {
        closeAdModal();
        if (adModalCallback) {
            adModalCallback();
        }
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            const skipBtn = document.getElementById('adSkipBtn');
            if (!skipBtn.disabled) {
                closeAdModal();
            }
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const skipBtn = document.getElementById('adSkipBtn');
            if (!skipBtn.disabled && modal.classList.contains('active')) {
                closeAdModal();
            }
        }
    });
}

function showAdModal(callback) {
    const modal = document.getElementById('adModal');
    const timerSpan = document.getElementById('closeTimer');
    const skipBtn = document.getElementById('adSkipBtn');
    
    adModalCallback = callback;
    
    // Reset state
    timerSpan.textContent = '5';
    skipBtn.disabled = true;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Start countdown
    let countdown = 5;
    countdownInterval = setInterval(() => {
        countdown--;
        timerSpan.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            timerSpan.textContent = '✕';
            skipBtn.disabled = false;
        }
    }, 1000);
}

function closeAdModal() {
    const modal = document.getElementById('adModal');
    
    // Clear interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    
    // Hide modal
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    adModalCallback = null;
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Update project count in hero stats
 */
function updateProjectCount() {
    const projectCards = document.querySelectorAll('.project-card:not(.coming-soon)');
    const statNumber = document.querySelector('.stat-number');
    
    if (statNumber && projectCards.length > 0) {
        statNumber.textContent = projectCards.length;
    }
}

/**
 * Utility: AdSense placeholder for future integration
 * Replace these placeholders with actual AdSense code
 */
const AdSenseConfig = {
    topBanner: {
        slot: 'ca-pub-XXXXXXXXXXXXXXXX',
        format: 'horizontal'
    },
    sidebar: {
        slot: 'ca-pub-XXXXXXXXXXXXXXXX',
        format: 'rectangle'
    },
    interstitial: {
        slot: 'ca-pub-XXXXXXXXXXXXXXXX',
        format: 'interstitial'
    },
    bottomBanner: {
        slot: 'ca-pub-XXXXXXXXXXXXXXXX',
        format: 'horizontal'
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdSenseConfig };
}
