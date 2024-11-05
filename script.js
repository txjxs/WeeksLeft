// Set default lifespan
const LIFE_EXPECTANCY = 80;

// Elements for controls and displaying progress
const birthdateInput = document.getElementById('birthdate');
const lifeGrid = document.getElementById('life-grid');
const themeIcon = document.getElementById('theme-icon');
const controls = document.getElementById('controls'); // Date selector container
const nameInputSection = document.getElementById('name-input-section'); // Name input section
const userNameInput = document.getElementById('user-name-input');
const userNameDisplay = document.getElementById('user-name-display');
const userNameElement = document.getElementById('user-name');

// Elements for stat cards
const daysLivedElem = document.getElementById('days-lived');
const weeksLivedCardElem = document.getElementById('weeks-lived-card');
const monthsLivedElem = document.getElementById('months-lived');
const secondsLivedElem = document.getElementById('seconds-lived');

// Elements for quote display
const quoteTextElem = document.getElementById('quote-text');
const quoteAuthorElem = document.getElementById('quote-author');

// Variable to store the base seconds lived and interval reference
let baseSecondsLived = 0;
let secondsInterval;

// Function to fetch and display a stoic quote
async function fetchStoicQuote() {
    try {
        const response = await fetch('https://stoic.tekloon.net/stoic-quote');
        const data = await response.json();
        quoteTextElem.textContent = `"${data.data.quote}"`;
        quoteAuthorElem.textContent = `- ${data.data.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteTextElem.textContent = "Failed to load quote. Try refreshing the page.";
        quoteAuthorElem.textContent = "";
    }
}

// Check if name and birthdate are stored; if not, prompt the user
document.addEventListener('DOMContentLoaded', () => {
    fetchStoicQuote(); // Fetch the quote when the page loads

    const savedName = localStorage.getItem('userName');
    const savedBirthdate = localStorage.getItem('birthdate');

    // Check if user name is already saved
    if (!savedName) {
        nameInputSection.style.display = 'flex';
    } else {
        userNameElement.textContent = savedName;
        userNameDisplay.textContent = savedName;
        nameInputSection.style.display = 'none';
    }

    // Check if birthdate is set in localStorage
    if (savedBirthdate) {
        birthdateInput.value = savedBirthdate;
        controls.style.display = "none"; // Hide the date selector container
        generateGrid(); // Generate grid if birthdate is already set
    } else {
        controls.style.display = "flex"; // Show the date selector if birthdate is not set
    }

    // Apply saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeIcon.src = 'assets/sun.svg';
    }
});

// Save the user's name and hide the input field
function saveName() {
    const userName = userNameInput.value.trim();
    if (userName) {
        localStorage.setItem('userName', userName);
        userNameElement.textContent = userName;
        userNameDisplay.textContent = userName;
        nameInputSection.style.display = 'none';
    }
}

// Save birthdate and hide the date selector after setting
birthdateInput.addEventListener('change', () => {
    const selectedDate = birthdateInput.value;
    if (selectedDate) {
        localStorage.setItem('birthdate', selectedDate);
        controls.style.display = "none"; // Hide the date selector after setting
        generateGrid(); // Generate the grid once birthdate is set
    }
});

// Function to calculate and update the grid and stats cards
function generateGrid() {
    // Clear existing grid and reset interval if it exists
    lifeGrid.innerHTML = '';
    clearInterval(secondsInterval);

    const birthdate = new Date(birthdateInput.value);
    if (isNaN(birthdate)) {
        alert("Please select a valid birthdate.");
        return;
    }

    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthdate;
    const ageInWeeks = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 7));
    const totalWeeks = LIFE_EXPECTANCY * 52;

    // Calculate and display values for stat cards
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
    const ageInMonths = Math.floor(ageInDays / 30.44);
    baseSecondsLived = Math.floor(ageInMilliseconds / 1000);

    daysLivedElem.textContent = ageInDays;
    weeksLivedCardElem.textContent = ageInWeeks;
    monthsLivedElem.textContent = ageInMonths;
    secondsLivedElem.textContent = baseSecondsLived;

    // Start real-time seconds counter
    startRealTimeCounter();

    // Generate grid cells based on lifespan
    for (let i = 0; i < totalWeeks; i++) {
        const weekBox = document.createElement('div');
        weekBox.classList.add('week-box');
        weekBox.setAttribute('data-week', `Week ${i + 1}`);
        if (i < ageInWeeks) {
            weekBox.classList.add('past-week');
        }
        lifeGrid.appendChild(weekBox);
    }
}

// Function to start the real-time seconds counter
function startRealTimeCounter() {
    secondsInterval = setInterval(() => {
        baseSecondsLived += 1;
        secondsLivedElem.textContent = baseSecondsLived;
    }, 1000);
}

// Toggle between light and dark mode, updating the theme icon
function toggleTheme() {
    document.body.classList.toggle('dark');
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);

    // Update icon based on the current theme
    themeIcon.src = theme === 'dark' ? 'assets/sun.svg' : 'assets/moon.svg';
}
