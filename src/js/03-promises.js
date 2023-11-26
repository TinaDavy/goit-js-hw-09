import { Notify } from "notiflix";

const form = document.querySelector(".form");
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
// const createBtn = document.querySelector('button[type="submit"]');
let timerId = null;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    timerId = setTimeout(() => {
      if (shouldResolve) {
        resolve(({position, delay}));
      } else {
        reject(({position, delay}));
      };
    }, delay);
  });
  };

form.addEventListener("submit", onSubmitForm);
  function onSubmitForm(event){
    event.preventDefault();

    let firstDelay = Number(delayInput.value);
    const step = Number(stepInput.value);
    const amount = Number(amountInput.value);

    for (let i = 0; i < amount; i += 1) {
      createPromise(i+1, firstDelay).then(({position, delay}) => 
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
      .catch(({position, delay}) =>
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
      firstDelay += step;
    };



  };
