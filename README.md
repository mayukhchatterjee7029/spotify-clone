# 🎵 Spotify Clone - Web Music Player

A fully functional music streaming web application built with vanilla HTML, CSS, and JavaScript that mimics the core features and design of Spotify.

![Spotify Clone Screenshot](https://img.shields.io/badge/Status-Complete-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🎶 **Core Music Player**
- **Play/Pause/Skip Controls** - Full audio playback control
- **Previous/Next Track** - Navigate through your music library
- **Auto-Play Next Song** - Seamless music experience
- **Loop Mode Toggle** - Repeat your favorite playlists
- **Seek Bar** - Click to jump to any part of the song
- **Real-time Progress** - Visual progress indicator with smooth animations

### 📱 **Dynamic Content**
- **Auto Song Detection** - Fetches `.mp3` files from local server
- **Japanese Character Support** - Properly decodes Unicode song names
- **Smart Playlist Generation** - Auto-creates playlists based on artist names
- **Interactive Song Library** - Clickable sidebar with all available tracks

### 🎨 **Modern UI/UX**
- **Responsive Design** - Works perfectly on desktop and mobile
- **Mobile Hamburger Menu** - Clean navigation for smaller screens
- **Hover Animations** - Smooth transitions and interactive elements
- **Play Button Overlays** - Spotify-like hover effects on playlist cards
- **Custom Scrollbars** - Polished visual details

### 📋 **Playlist Management**
- **Auto-Generated Playlists** - LiSA artists and "un" themed songs
- **Clickable Playlist Cards** - Start playing with one click
- **Random Backgrounds** - Dynamic visual variety
- **Custom Playlist Names** - Organized music collections

## 🚀 Live Demo

**[View Live Demo](https://your-username.github.io/spotify-clone)** *(Replace with your actual GitHub Pages URL)*

## 📸 Screenshots

### Desktop View
```
🖥️ Clean, Spotify-inspired interface with dark theme
🎵 Interactive playlist cards with hover effects
🎛️ Full-featured music player controls
```

### Mobile View
```
📱 Responsive hamburger menu navigation
🎶 Touch-friendly playback controls
📋 Optimized playlist grid layout
```

## 🛠️ Technologies Used

- **HTML5** - Semantic structure and audio element
- **CSS3** - Advanced styling with Grid, Flexbox, and animations
- **Vanilla JavaScript** - ES6+ features, async/await, DOM manipulation
- **CSS Grid & Flexbox** - Responsive layouts
- **Web Audio API** - Audio playback and control

## ⚙️ Installation & Setup

### Prerequisites
- Local web server (Live Server extension for VS Code recommended)
- Modern web browser with JavaScript enabled

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/spotify-clone.git
   cd spotify-clone
   ```

2. **Add your music files**
   ```bash
   # Place your .mp3 files in:
   assets/songs/
   ```

3. **Start local server**
   ```bash
   # Using VS Code Live Server extension
   # Right-click on index.html → "Open with Live Server"
   
   # Or using Python
   python -m http.server 5500
   
   # Or using Node.js
   npx serve .
   ```

4. **Update server URL**
   ```javascript
   // In script.js, line 2:
   let musicDir = new URL("http://127.0.0.1:5500/Projects/Spotify%20clone/assets/songs/");
   // Change to your server URL
   ```

5. **Open in browser**
   ```
   Navigate to: http://127.0.0.1:5500
   ```

## 📁 Project Structure

```
spotify-clone/
├── 📄 index.html          # Main HTML structure
├── 🎨 style.css           # Core styling and responsive design
├── 🛠️ utilities.css       # Utility classes and component styles
├── ⚡ script.js           # Main JavaScript functionality
├── 📁 assets/
│   ├── 🎵 songs/          # Your .mp3 music files
│   ├── 🖼️ images/         # Playlist covers and backgrounds
│   └── 🔧 icons/          # SVG icons for UI elements
└── 📄 README.md
```

## 🎯 Key Features Explained

### 🔄 **Auto-Loop System**
```javascript
// Toggle loop mode with visual feedback
let isLoopEnabled = false;
currentSong.addEventListener("ended", () => {
    if (isLoopEnabled) {
        // Auto-play next song
    }
});
```

### 🎲 **Smart Playlist Generation**
```javascript
// Auto-creates playlists based on song names
let artistLisa = songNames.filter(e => e.includes('LiSA'))
let otherTaste = songNames.filter(e => e.toLowerCase().includes('un'))
```

### 📱 **Responsive Grid Layout**
```css
/* Mobile-first approach */
@media only screen and (orientation:portrait) {
    .playbar-buttons {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, auto);
    }
}
```

## 🎛️ Usage

### **Basic Controls**
- **Play/Pause**: Click the main play button
- **Skip Tracks**: Use previous/next buttons
- **Seek**: Click anywhere on the progress bar
- **Loop Mode**: Toggle the loop button (turns green when active)

### **Playlist Navigation**
- **Sidebar**: Click any song to play immediately
- **Playlist Cards**: Click cards to start playing that playlist
- **Mobile Menu**: Use hamburger menu on mobile devices

### **Customization**
- **Add Songs**: Drop `.mp3` files into `assets/songs/`
- **Change Playlists**: Modify filter criteria in `script.js`
- **Update Styling**: Edit CSS variables in `utilities.css`

## 🔧 Configuration

### **Server Settings**
```javascript
// Update your local server URL
let musicDir = new URL("http://your-ip:5500/path/to/songs/");
```

### **Playlist Filters**
```javascript
// Customize automatic playlist creation
let artistLisa = songNames.filter(e => e.includes('Your-Artist'))
let customPlaylist = songNames.filter(e => e.toLowerCase().includes('keyword'))
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### **Contribution Ideas**
- 🎨 Add more themes and color schemes
- 🔊 Implement volume controls
- 📊 Add music visualizer
- 💾 Local storage for user preferences
- 🔀 Enhanced shuffle algorithms

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Spotify** - Design inspiration
- **Font Awesome** - Icon resources
- **Google Fonts** - Montserrat typography
- **VS Code** - Development environment

## 📞 Contact

**Your Name** - [@your-twitter](https://twitter.com/your-twitter) - your.email@example.com

**Project Link**: [https://github.com/your-username/spotify-clone](https://github.com/your-username/spotify-clone)

---

⭐ **If you found this project helpful, please consider giving it a star!** ⭐

*Built with ❤️ and lots of ☕*