// Set default lifespan
const LIFE_EXPECTANCY = 80;

// Elements for controls and displaying progress
const birthdateInput = document.getElementById('birthdate');
const currentAgeElem = document.getElementById('current-age');
const weeksLivedElem = document.getElementById('weeks-lived');
const weeksLeftElem = document.getElementById('weeks-left');
const lifeGrid = document.getElementById('life-grid');

// Check if name is stored; if not, prompt the user
document.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('userName');
    const userNameElement = document.getElementById('user-name');
    const userNameDisplay = document.getElementById('user-name-display');

    // Check if user name is already saved
    if (!savedName) {
        // Prompt for name if it’s the first visit
        const userName = prompt("Welcome! What's your name?");
        if (userName) {
            localStorage.setItem('userName', userName);
            userNameElement.textContent = userName;
            userNameDisplay.textContent = userName;
        } else {
            userNameElement.textContent = "Friend"; // Default if name isn't provided
            userNameDisplay.textContent = "Friend";
        }
    } else {
        userNameElement.textContent = savedName;
        userNameDisplay.textContent = savedName;
    }

    // Load saved birthdate
    const savedBirthdate = localStorage.getItem('birthdate');
    if (savedBirthdate) {
        birthdateInput.value = savedBirthdate;
        generateGrid();
    }

    // Apply saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
});

// Save birthdate and regenerate grid on change
birthdateInput.addEventListener('change', () => {
    localStorage.setItem('birthdate', birthdateInput.value);
    generateGrid();
});

// Function to calculate and update the grid
function generateGrid() {
    // Clear existing grid
    lifeGrid.innerHTML = '';

    // Get birthdate and calculate age in weeks
    const birthdate = new Date(birthdateInput.value);
    if (isNaN(birthdate)) {
        alert("Please select a valid birthdate.");
        return;
    }

    const currentDate = new Date();
    const ageInWeeks = Math.floor((currentDate - birthdate) / (1000 * 60 * 60 * 24 * 7));
    const totalWeeks = LIFE_EXPECTANCY * 52;
    const weeksLeft = totalWeeks - ageInWeeks;

    // Update progress display
    const currentAge = Math.floor(ageInWeeks / 52);
    currentAgeElem.textContent = currentAge;
    weeksLivedElem.textContent = ageInWeeks;
    weeksLeftElem.textContent = Math.max(weeksLeft, 0);

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

// Toggle between light and dark mode
function toggleTheme() {
    document.body.classList.toggle('dark');
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
}
