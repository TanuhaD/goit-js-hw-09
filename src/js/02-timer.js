import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { options } from './utils/options.js';
import 'flatpickr/dist/flatpickr.min.css';
import { convertMs } from './utils/utils.js';
const buttonStartEl = document.querySelector('[data-start]');
const inputCalendar = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectedDate;
flatpickr(inputCalendar, {
  ...options,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const difference = selectedDate - Date.now();
    if (difference < 0) {
      Notify.info('Please choose a date in the future');
      return;
    }
    buttonStartEl.disabled = false;
  },
});

function handleStartClick() {
  buttonStartEl.disabled = true;
  timerId = setInterval(() => {
    const timeLeft = selectedDate - Date.now();
    const objectTime = convertMs(timeLeft);
    showTime(objectTime);
  }, 1000);
}

function showTime({ days, hours, minutes, seconds }) {
  daysEl.textContent = ('' + days).padStart(2, '0');
  hoursEl.textContent = ('' + hours).padStart(2, '0');
  minutesEl.textContent = ('' + minutes).padStart(2, '0');
  secondsEl.textContent = ('' + seconds).padStart(2, '0');
}
buttonStartEl.disabled = true;

buttonStartEl.addEventListener('click', handleStartClick);
