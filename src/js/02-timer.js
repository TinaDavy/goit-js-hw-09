import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";
import {convertMs, addLeadingZero} from "./02-helpers"

const timerDays = document.querySelector("span[data-days]");
const timerHours = document.querySelector("span[data-hours]");
const timerMinutes = document.querySelector("span[data-minutes]");
const timerSeconds = document.querySelector("span[data-seconds]");
let timerId = null;

const startBtn = document.querySelector("button[data-start]");
startBtn.disabled = true;

const datePicker = document.querySelector("#datetime-picker");
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0].getTime() < new Date().getTime()){
        Notify.failure("Please choose a date in the future")
      } else{
        startBtn.disabled = false;
      };

    },
  };

flatpickr(datePicker, options);

startBtn.addEventListener("click", onClick);
function onClick(){
  startBtn.disabled = true;

  timerId = setInterval(() => {
    const inputDate = new Date(datePicker.value).getTime();
    const today = new Date().getTime();
    const timerTime = inputDate - today;
    const timer = convertMs(timerTime);

    timerDays.textContent = `${addLeadingZero(timer.days)}`;
    timerHours.textContent = `${addLeadingZero(timer.hours)}`;
    timerMinutes.textContent = `${addLeadingZero(timer.minutes)}`;
    timerSeconds.textContent = `${addLeadingZero(timer.seconds)}`;


    // console.log(convertMs(timerTime))
    // console.log(timerTime)

    if(timerTime < 1000){
      clearInterval(timerId);
      Notify.success("Time's up!")
    }
  }, 1000);


};





