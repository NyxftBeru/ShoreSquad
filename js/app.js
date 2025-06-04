// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    fetchWeatherData();
    initializeScrollAnimation();
    setupAnimationObservers();

    // Animate hero section on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Initialize Map with Leaflet
function initializeMap() {
    // Set default view to Singapore
    const map = L.map('cleanup-map').setView([1.3521, 103.8198], 11);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Sample cleanup locations (replace with real data later)
    const cleanupLocations = [
        {
            location: [1.3019, 103.8625],
            title: 'East Coast Beach Cleanup',
            date: '2025-06-15',
            participants: 12,
            description: 'Join us for our monthly cleanup at East Coast Park!'
        },
        {
            location: [1.2959, 103.9070],
            title: 'Bedok Jetty Cleanup',
            date: '2025-06-22',
            participants: 8,
            description: 'Help us keep Bedok Jetty clean and safe for all!'
        }
    ];

    // Add markers for each cleanup location
    cleanupLocations.forEach(cleanup => {
        const marker = L.marker(cleanup.location).addTo(map);
        
        const popupContent = `
            <div class="map-marker-popup">
                <h3>${cleanup.title}</h3>
                <p class="cleanup-date">Date: ${formatDate(cleanup.date)}</p>
                <p>Current Squad: ${cleanup.participants} members</p>
                <p>${cleanup.description}</p>
                <button class="join-button" onclick="joinCleanup('${cleanup.title}')">Join Squad</button>
            </div>
        `;
        
        marker.bindPopup(popupContent);
    });
}

// Weather Data Fetching
async function fetchWeatherData() {
    try {
        // To be implemented with actual weather API
        console.log('Weather data fetching will go here');
        // Example: OpenWeatherMap API integration would go here
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation
function initializeScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    // Observe all sections
    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });
}

// Animation Observers
function setupAnimationObservers() {
    // Animate stats on scroll
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 0.2}s`;
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });

    // Animate events on scroll
    const eventsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.event-card').forEach(card => {
        eventsObserver.observe(card);
    });

    // Animate numbers counting up
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Animate stats when they come into view
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.textContent.replace(/,/g, ''));
                animateValue(target, 0, endValue, 2000);
                numberObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card h2').forEach(stat => {
        numberObserver.observe(stat);
    });

    // Add pulse animation to Join Squad buttons on hover
    document.querySelectorAll('.join-squad-btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'pulse 0.5s ease-in-out';
        });
        button.addEventListener('animationend', () => {
            button.style.animation = '';
        });
    });
}

// Mobile Navigation Toggle (to be implemented)
function toggleMobileNav() {
    // Mobile navigation functionality will go here
}

// Community Feed Updates
function updateCommunityFeed() {
    // Placeholder for community feed updates
    // This would typically fetch data from a backend API
}

// Weather Updates
function updateWeatherDisplay(weatherData) {
    // Placeholder for weather display updates
    // This would update the UI with weather information
}

// Map Marker Creation
function createCleanupMarker(location) {
    // Placeholder for creating map markers
    // This would add markers to the map for cleanup locations
}

// Form Validation
function validateForm(formElement) {
    // Generic form validation helper
    return true; // Placeholder
}

// Error Handling
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    // Implement user-friendly error display
}

// Join Cleanup Function
function joinCleanup(cleanupTitle) {
    // In a real application, this would connect to a backend
    alert(`Thanks for joining ${cleanupTitle}! We'll send you the details soon.`);
    
    // Example of how we would update the UI
    const button = document.querySelector(`button[onclick="joinCleanup('${cleanupTitle}')"]`);
    if (button) {
        button.textContent = 'Joined!';
        button.disabled = true;
        button.style.backgroundColor = 'var(--color-accent)';
    }
}

// Utility Functions
const utils = {
    formatDate: (date) => {
        return new Date(date).toLocaleDateString();
    },
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};
