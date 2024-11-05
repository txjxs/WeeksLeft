// Configurable lifespan in years
const LIFE_EXPECTANCY = 80;

// Calculate the number of weeks that have passed based on age
const startDate = new Date(2000, 0, 1); // Replace with your birthdate (year, month-1, day)
const currentDate = new Date();
const ageInWeeks = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 7));

const lifeGrid = document.getElementById('life-grid');

// Generate grid cells
for (let i = 0; i < LIFE_EXPECTANCY * 52; i++) {
    const weekBox = document.createElement('div');
    weekBox.classList.add('week-box');
    if (i < ageInWeeks) {
        weekBox.classList.add('past-week');
    }
    lifeGrid.appendChild(weekBox);
}
