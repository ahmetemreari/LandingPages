// DOM Elements
const nameInput = document.getElementById('nameInput');
const displayText = document.getElementById('displayText');
const welcomeElement = document.getElementById('welcome');
const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');

// Update clock function
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const dayName = days[now.getDay()];
    
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    dateElement.textContent = dayName;
}

// Update greeting based on time of day
function updateGreeting(name) {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';
    
    welcomeElement.textContent = `${greeting}, ${name}`;
}

// Handle input changes with debounce
let debounceTimeout;
nameInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const value = e.target.value.toUpperCase();
        displayText.textContent = value || 'ARIZENTRIX';
        updateGreeting(value || 'AriZentrix');
    }, 100);
});

// Enhanced 3D effect on mouse move with throttle
let lastMove = 0;
const throttleDelay = 1000 / 60; // 60fps

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMove >= throttleDelay) {
        const container = document.querySelector('.container');
        const xAxis = (window.innerWidth / 2 - e.pageX) / 70;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 70;
        const floatOffset = -20 * Math.sin(Date.now() / 4000);
        
        container.style.transform = `
            rotateY(${xAxis}deg) 
            rotateX(${yAxis}deg) 
            translateY(${floatOffset}px)
        `;
        
        lastMove = now;
    }
});

// Initialize
setInterval(updateClock, 1000);
updateClock();
updateGreeting('AriZentrix');

// Add smooth transition when page loads
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    });
});