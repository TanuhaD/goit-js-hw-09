import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import { options } from './utils/options.js';
import { convertMs } from './utils/utils.js';
const buttonStartEl = document.querySelector('[data-start]');
let daysEl = document.querySelector('[data-days]');
let hoursEl = document.querySelector('[data-hours]');
let minutesEl = document.querySelector('[data-minutes]');
let secondsEl = document.querySelector('[data-seconds]');
let selectedDate = null;
let timerId = null;
flatpickr('#datetime-picker', {
  ...options,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    console.log(Date.now());
    selectedDate = +selectedDates[0];
    const difference = Date.now() - selectedDate;
    if (difference > 0) {
      // alert('Please choose a date in the future');
      Notify.info('Please choose a date in the future');
      return;
    }
    buttonStartEl.disabled = false;
  },
});

function handleStartClick() {
  buttonStartEl.disabled = true;
  timerId = setInterval(() => {
    const time = selectedDate - Date.now();
    showTime(convertMs(time));
    if (time < 1100) {
      clearInterval(timerId);
    }
  }, 1000);
}
function showTime({ days, hours, minutes, seconds }) {
  daysEl.textContent = ('' + days).padStart(2, '0');
  hoursEl.textContent = ('' + hours).padStart(2, '0');
  minutesEl.textContent = ('' + minutes).padStart(2, '0');
  secondsEl.textContent = ('' + seconds).padStart(2, '0');
  // padStart(2,'0');
}
buttonStartEl.disabled = true;

buttonStartEl.addEventListener('click', handleStartClick);
