// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;

const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1000);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    lapCount = 0;
    updateTime(true);
    lapsList.innerHTML = '';
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

function updateTime(reset = false) {
    let elapsedTime;
    if (reset) {
        elapsedTime = 0;
        display.textContent = "00:00:00";
    } else {
        updatedTime = new Date().getTime();
        elapsedTime = (updatedTime - startTime) / 1000;
        const hours = Math.floor(elapsedTime / 3600);
        const minutes = Math.floor((elapsedTime % 3600) / 60);
        const seconds = Math.floor(elapsedTime % 60);
        display.textContent = 
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    const secondsDegrees = ((elapsedTime % 60) / 60) * 360 + 90;
    const minutesDegrees = ((elapsedTime / 60) % 60) * 360 / 60 + 90;
    const hoursDegrees = ((elapsedTime / 3600) % 12) * 360 / 12 + 90;

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}
