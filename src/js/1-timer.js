
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startButton = document.querySelector('button[data-start]');
const inputDate = document.querySelector('input#datetime-picker');
let userSelectedDate;
startButton.disabled = true;
let timerInterval;

const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] > Date.now()) {
      startButton.disabled = false;
      updateTimerDisplay();
      userSelectedDate = selectedDates[0];
    } else {userSelectedDate = undefined;
      startButton.disabled = true;
      iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
    position: 'topRight',
    icon: '',
});
    }
  },
};

flatpickr(`input#datetime-picker`, options);

startButton.addEventListener('click', () => {
  if (userSelectedDate) {
    startTimer(); 
    startButton.disabled = true;
  }
});

function updateTimerDisplay() {
const timeDifference = userSelectedDate - Date.now();
const { days, hours, minutes, seconds } = convertMs(timeDifference);

  if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
    daysDisplay.textContent = addLeadingZero(days);
    hoursDisplay.textContent = addLeadingZero(hours);
    minutesDisplay.textContent = addLeadingZero(minutes);
    secondsDisplay.textContent = addLeadingZero(seconds);
  }

  if (timeDifference <= 0) {
    stopTimer();
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function startTimer() {
  timerInterval = setInterval(updateTimerDisplay, 1000);
  document.getElementById("datetime-picker").disabled = true;
  
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);

    daysDisplay.textContent = '00';
    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';

    timerInterval = null;
  }
}