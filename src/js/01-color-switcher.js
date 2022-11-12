import { getRandomHexColor } from './utils/utils';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStartEl = document.querySelector('[data-start]');
const buttonStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

function handleStartClick(event) {
  toggleButtonStatus();
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function handleStopClick(event) {
  clearInterval(intervalId);
  toggleButtonStatus();
}

function toggleButtonStatus() {
  buttonStopEl.disabled = !buttonStopEl.disabled;
  buttonStartEl.disabled = !buttonStartEl.disabled;
}

buttonStopEl.disabled = true;
buttonStartEl.addEventListener('click', handleStartClick);
buttonStopEl.addEventListener('click', handleStopClick);
