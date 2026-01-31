import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate;

const inputEl = document.querySelector('#datetime-picker');
const bntEl = document.querySelector('button');

const elements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      bntEl.disabled = true;
      return;
    }
    userSelectedDate = selectedDates[0];
    bntEl.disabled = false;
  },
};

flatpickr(inputEl, options);
bntEl.addEventListener('click', onClick);

function onClick() {
  bntEl.disabled = true;
  inputEl.disabled = true;

  const idInterval = setInterval(() => {
    const now = Date.now();
    const delta = userSelectedDate - now;

    const time = convertMs(delta);

    Object.entries(time).forEach(([key, value]) => {
      elements[key].textContent = addLeadingZero(value);
    });

    if (delta < 1000) {
      clearInterval(idInterval);
      inputEl.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
