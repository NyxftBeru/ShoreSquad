import config from './config.js';
import { initWeather } from './weather.js';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    showLoading();
    
    Promise.all([
        initializeMap(),
        initWeather(),
        setupAnimationObservers()
    ]).then(() => {
        hideLoading();
        showToast('Welcome to ShoreSquad! 🌊');
    }).catch(error => {
        console.error('Error initializing app:', error);
        hideLoading();
        showToast('Some features may not be available.', 'error');
    });

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
    // Set default view to Pasir Ris
    const pasirRisLocation = [1.381497, 103.955574];
    const map = L.map('cleanup-map').setView(pasirRisLocation, 15);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add marker for Pasir Ris cleanup
    const marker = L.marker(pasirRisLocation).addTo(map);
    
    const popupContent = `
        <div class="map-marker-popup">
            <h3>Pasir Ris Beach Cleanup</h3>
            <p class="cleanup-date">Date: June 15, 2025</p>
            <p>Current Squad: 15 members</p>
            <p>Join us for our monthly cleanup at Pasir Ris Beach!</p>
            <button class="join-button" onclick="joinCleanup('Pasir Ris Beach Cleanup')">Join Squad</button>
        </div>
    `;
    
    marker.bindPopup(popupContent);

    // Enable user interaction
    map.on('click', function(e) {
        console.log("Clicked coordinates:", e.latlng);
    });

    // Return map instance for potential future use
    return map;
}

// Initialize scroll animations
function initializeScrollAnimation() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled * 0.003);
        }
    });
}

// Show/hide loading spinner
function showLoading() {
    document.getElementById('loading-spinner').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading-spinner').style.display = 'none';
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <p>${message}</p>
    `;
    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Set up intersection observers for animations
function setupAnimationObservers() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe elements that should animate
    document.querySelectorAll('.stat-card, .event-card, .feed-item').forEach(el => {
        observer.observe(el);
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

    showToast(`Successfully joined ${cleanupTitle}! Check your email for details.`);
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
        }
    }
};
