
// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    boxEl: document.createElement("div"),
    pEl: document.querySelector("p"),
    inputDateTimePicker: document.querySelector("#datetime-picker"),
    btnStart: document.querySelector('button[data-start]'),
    divTimer: document.querySelector(".timer"),
    selectedDate: 0,
    dateNowGlobal: 0,
    timerId: "",
    daysValue: document.querySelector('span.value[data-days]'),
    hoursValue: document.querySelector('span.value[data-hours]'),
    minutesValue: document.querySelector('span.value[data-minutes]'),
    secondsValue: document.querySelector('span.value[data-seconds]'),
};



refs.boxEl.className = "boxElement";
refs.boxEl.style.height = "40vh";
refs.pEl.after(refs.boxEl);
refs.boxEl.prepend(refs.inputDateTimePicker, refs.btnStart);
refs.boxEl.after(refs.divTimer);
refs.btnStart.setAttribute("disabled", "");


// flatpickr options and init
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const dateNow = new Date();
        refs.selectedDate = selectedDates[0].getTime();
        console.log(selectedDates[0]);
        
      if (selectedDates[0].getTime() >= dateNow.getTime()) {
          refs.btnStart.removeAttribute("disabled");
          Notify.success("GOOD!!! CLICK START 🥳🥳🥳")
      } else {
          refs.btnStart.setAttribute("disabled", "");
          Notify.failure('Please choose a date in the future', {
             
          });
        
      }
    },
};

flatpickr(refs.inputDateTimePicker, options);

// start timer
refs.btnStart.addEventListener("click", () => {
    
    refs.btnStart.setAttribute("disabled", "");
    refs.inputDateTimePicker.setAttribute("disabled", "");

    refs.timerId = setInterval(timerRun, 1000);

});

// reset page
btnReset.addEventListener("click", () => {
    document.location.reload();
 });

function timerRun() {

    refs.dateNowGlobal = new Date();
    // console.log(refs.dateNowGlobal);

    let deltaTimeMs = refs.selectedDate - refs.dateNowGlobal;

    console.log(deltaTimeMs);
    let deltaTimeMsObj = convertMs(deltaTimeMs);
    
    // adding textContent to html elements days, hours, minutes, seconds
    const { days, hours, minutes, seconds } = deltaTimeMsObj;
    
    refs.daysValue.textContent = addLeadingZero(days);
    refs.hoursValue.textContent = addLeadingZero(hours);
    refs.minutesValue.textContent = addLeadingZero(minutes);
    refs.secondsValue.textContent = addLeadingZero(seconds);

    // check timer deltaTimeMs < 1s
    if (deltaTimeMs < 1000) {
        Notify.success('Timer is Over! Good luck!', {
              clickToClose: true,
              timeout: 4000,
              position: 'center-center',
          });
        clearInterval(refs.timerId);
    };

};

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
};
function addLeadingZero(value) {
    if (value < 10) {
return `${value}`.padStart(2, "0");    
    } else { return `${value}`};
};