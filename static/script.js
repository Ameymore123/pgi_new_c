


// Dynamically update the current year for the copyright notice
document.getElementById('current-year-advanced-refined').textContent = new Date().getFullYear();














document.addEventListener('DOMContentLoaded', function () {
    // --- Existing Hamburger Menu Toggle Logic ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function () {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.backgroundColor = 'rgba(53, 73, 84, 0.95)';
        navMenu.style.padding = '20px 0';
        navMenu.style.alignItems = 'center';
        navMenu.style.gap = '15px';
        navMenu.style.zIndex = '100';
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'row';
            navMenu.style.position = 'static';
            navMenu.style.backgroundColor = 'transparent';
            navMenu.style.padding = '0';
            navMenu.style.gap = '30px';
        }
    });

    // --- Existing Intersection Observer for Counting Animation ---
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                let current = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // ~60fps

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        entry.target.textContent = Math.round(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target; // Ensure final target is exact
                        if (entry.target.dataset.target === '98') {
                            entry.target.textContent += '%';
                        }
                    }
                };
                updateCounter();
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => {
        observer.observe(number);
    });

    // --- NEW: Dynamic Horizon Services Interaction Logic ---
    const horizonBlocks = document.querySelectorAll('.service-block-horizon');
    const horizonTrack = document.querySelector('.horizon-track');

    // Function to set an active block
    const setActiveBlock = (blockToActivate) => {
        horizonTrack.classList.add('active-mode'); // Enable dimming for others
        horizonBlocks.forEach(block => {
            if (block === blockToActivate) {
                block.classList.add('active');
            } else {
                block.classList.remove('active');
            }
        });
    };

    // Function to reset all blocks
    const resetBlocks = () => {
        horizonTrack.classList.remove('active-mode'); // Disable dimming
        horizonBlocks.forEach(block => {
            block.classList.remove('active');
        });
    };

    // Desktop: Hover interaction
    if (window.innerWidth > 992) {
        horizonBlocks.forEach(block => {
            block.addEventListener('mouseenter', () => setActiveBlock(block));
            block.addEventListener('mouseleave', () => resetBlocks());
        });
    }
    // Mobile/Tablet: Click interaction
    else {
        horizonBlocks.forEach(block => {
            block.addEventListener('click', () => {
                // If clicking an already active block, deactivate it
                if (block.classList.contains('active')) {
                    resetBlocks();
                } else {
                    setActiveBlock(block);
                }
            });
        });
    }

    // Handle resize to switch between hover/click behavior and reset state
    window.addEventListener('resize', () => {
        // Reset all active states on resize to prevent weird transitions
        resetBlocks();

        // Remove all previous event listeners to prevent duplicates
        horizonBlocks.forEach(block => {
            block.removeEventListener('mouseenter', () => setActiveBlock(block));
            block.removeEventListener('mouseleave', () => resetBlocks());
            block.removeEventListener('click', () => { /* handler */ }); // Need to replicate the exact handler to remove
        });

        // Re-add event listeners based on new window size
        if (window.innerWidth > 992) {
            horizonBlocks.forEach(block => {
                block.addEventListener('mouseenter', () => setActiveBlock(block));
                block.addEventListener('mouseleave', () => resetBlocks());
            });
        } else {
            horizonBlocks.forEach(block => {
                block.addEventListener('click', function clickHandler() { // Named function to remove later
                    if (this.classList.contains('active')) {
                        resetBlocks();
                    } else {
                        setActiveBlock(this);
                    }
                });
            });
        }
    });

    // Initial check on load for mobile (if page loads on mobile size, expand all by default)
    if (window.innerWidth <= 992) {
        horizonBlocks.forEach(block => block.classList.add('active'));
    }
});