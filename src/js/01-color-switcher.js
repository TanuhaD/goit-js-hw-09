import { getRandomHexColor } from './utils/utils';
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;
function handleStartClick() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  toggleButtons();
}
function handleStopClick() {
  clearInterval(timerId);
  toggleButtons();
}
function toggleButtons() {
  buttonStart.disabled = !buttonStart.disabled;
  buttonStop.disabled = !buttonStop.disabled;
}

buttonStop.disabled = true;
buttonStart.addEventListener('click', handleStartClick);
buttonStop.addEventListener('click', handleStopClick);
