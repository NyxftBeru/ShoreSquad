import config from './config.js';

let weatherRefreshInterval;

async function fetchWeatherData() {
    const weatherContainer = document.querySelector('.weather-container');
    
    // Show loading state
    weatherContainer.innerHTML = `
        <div class="weather-loading">
            <i class="fas fa-spinner fa-pulse"></i>
            <p>Loading weather information...</p>
        </div>
    `;

    try {
        // For demo purposes, since we don't have actual API access
        const mockWeatherData = {
            current: {
                temp: 29,
                humidity: 75,
                description: 'Partly Cloudy',
                icon: 'fas fa-cloud-sun'
            },
            forecast: [
                {
                    date: 'Wed, Jun 4',
                    tempHigh: 31,
                    tempLow: 26,
                    icon: 'fas fa-cloud-sun',
                    description: 'Partly Cloudy'
                },
                {
                    date: 'Thu, Jun 5',
                    tempHigh: 30,
                    tempLow: 25,
                    icon: 'fas fa-cloud-rain',
                    description: 'Light Rain'
                },
                {
                    date: 'Fri, Jun 6',
                    tempHigh: 29,
                    tempLow: 25,
                    icon: 'fas fa-cloud',
                    description: 'Cloudy'
                },
                {
                    date: 'Sat, Jun 7',
                    tempHigh: 30,
                    tempLow: 26,
                    icon: 'fas fa-sun',
                    description: 'Fair'
                }
            ]
        };

        updateWeatherDisplay(mockWeatherData);
    } catch (error) {
        console.error('Error fetching weather:', error);
        handleWeatherError(error);
    }
}

function updateWeatherDisplay(data) {
    const weatherContainer = document.querySelector('.weather-container');
    
    const currentWeatherHTML = `
        <div class="weather-card current-weather">
            <h3>Current Weather at ${config.weather.defaultLocation.name}</h3>
            <div class="weather-info">
                <i class="${data.current.icon} weather-icon"></i>
                <div class="temp-container">
                    <span class="temperature">${data.current.temp}°C</span>
                    <span class="humidity">Humidity: ${data.current.humidity}%</span>
                </div>
            </div>
            <p class="weather-description">${data.current.description}</p>
            <p class="last-updated">Last updated: ${new Date().toLocaleTimeString()}</p>
        </div>
        <div class="weather-card forecast">
            <h3>4-Day Forecast</h3>
            <div class="forecast-container">
                ${data.forecast.map(day => `
                    <div class="forecast-item">
                        <div class="date">${day.date}</div>
                        <i class="${day.icon}"></i>
                        <div class="temp-range">
                            <span class="temp-high">${day.tempHigh}°C</span>
                            <span class="temp-low">${day.tempLow}°C</span>
                        </div>
                        <div class="description">${day.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    weatherContainer.innerHTML = currentWeatherHTML;
}

function handleWeatherError(error) {
    const weatherContainer = document.querySelector('.weather-container');
    const errorHTML = `
        <div class="weather-card error">
            <i class="fas fa-exclamation-circle"></i>
            <h3>Weather Information Unavailable</h3>
            <p class="error-message">Sorry, we couldn't fetch the weather data at this moment.</p>
            <button onclick="window.fetchWeatherData()" class="retry-button">
                <i class="fas fa-sync"></i> Retry
            </button>
        </div>
    `;
    weatherContainer.innerHTML = errorHTML;
}

function initWeather() {
    // Make fetchWeatherData available globally for the retry button
    window.fetchWeatherData = fetchWeatherData;
    
    fetchWeatherData();
    
    // Set up auto-refresh every 5 minutes
    if (weatherRefreshInterval) {
        clearInterval(weatherRefreshInterval);
    }
    weatherRefreshInterval = setInterval(fetchWeatherData, config.weather.refreshInterval);
}

// Clean up on page unload
window.addEventListener('unload', () => {
    if (weatherRefreshInterval) {
        clearInterval(weatherRefreshInterval);
    }
});

export { initWeather };
