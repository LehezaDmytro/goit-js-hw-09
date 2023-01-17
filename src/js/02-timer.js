import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/material_green.css");

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let selectedDateMs = 0;
flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < new Date().getTime()) {
            Notify.failure('Please choose a date in the future');
            btnStart.setAttribute("disabled", "");
        } else {
            btnStart.removeAttribute("disabled");
            selectedDateMs = selectedDates[0].getTime();
        }
    },
});

function convertMs(ms) {

  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    days.textContent = value.days.toString().padStart(2, "0");
    hours.textContent = value.hours.toString().padStart(2, "0");
    minutes.textContent = value.minutes.toString().padStart(2, "0");
    seconds.textContent = value.seconds.toString().padStart(2, "0");
}

btnStart.addEventListener('click', clickStart);

function clickStart() {
    const intervalId = setInterval(countdown, 1000);
    function countdown() {
        const differenceMs = selectedDateMs - new Date().getTime();
        if (differenceMs > 0) {
            addLeadingZero(convertMs(differenceMs));
        } else {
            clearInterval("intervalId")
        }
    }
    input.disabled = true;
    btnStart.disabled = true;
}

