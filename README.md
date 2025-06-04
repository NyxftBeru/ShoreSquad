# 🌊 ShoreSquad

A modern web application connecting beach cleanup volunteers in Singapore. Built with HTML5, CSS3, and vanilla JavaScript.

## 🚀 Features

- 🌡️ Real-time weather data from NEA's data.gov.sg API
- 🗺️ Interactive cleanup location maps
- 👥 Community activity feed
- 📱 Fully responsive design
- ⚡ Fast loading (<1s on 4G)

## 🛠️ Setup & Development

### Prerequisites
- Visual Studio Code
- Live Server extension for VS Code

### Running Locally
1. Clone this repository
2. Open the project folder in VS Code
3. Right-click `index.html` and select "Open with Live Server"
4. Visit `http://localhost:5500` in your browser

### Development Notes
- Weather data updates every 5 minutes
- Map is centered on Pasir Ris Beach by default
- Responsive design breakpoints at 768px and 1024px

## 🌐 APIs Used

### NEA Weather API (data.gov.sg)
- Base URL: `https://api.data.gov.sg/v1/environment`
- Endpoints used:
  - `/4-day-weather-forecast`
  - `/air-temperature`
  - `/relative-humidity`

## 📱 Mobile Testing

Tested and optimized for:
- Chrome (Android)
- Safari (iOS)
- Screen sizes from 320px to 2560px

## 🎨 Design Choices

### Color Palette
- Primary: `#0066cc` (Ocean Blue)
- Secondary: `#ff4b4b` (Coral Red)
- Accent: `#00cc88` (Sea Green)
- Background: `#f8fafc` (Light Gray)

### Typography
- Main Font: Inter, system UI stack
- Icons: Font Awesome 6.4.0

## 🔧 Maintenance

To update the weather display:
1. Check `js/weather.js` for the refresh interval (default: 5 minutes)
2. Weather errors are handled with retry functionality
3. Loading states are shown during data fetches

## 📦 Directory Structure

```
ShoreSquad/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Styles and animations
├── js/
│   ├── app.js         # Main application logic
│   ├── config.js      # Configuration settings
│   └── weather.js     # Weather functionality
└── README.md          # This file
```

## 🚀 Deployment

This site is deployed on GitHub Pages. To deploy updates:
1. Commit your changes
2. Push to the main branch
3. GitHub Actions will automatically deploy to Pages

## 📝 License

MIT License - Feel free to use this code for your own beach cleanup projects!
