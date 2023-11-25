import { Notify } from "notiflix";

const form = document.querySelector(".form");
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const createBtn = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve(({position, delay}));
    } else {
      reject(({position, delay}));
    };
  });
  };

createBtn.addEventListener("click", onSubmit);
  function onSubmit(event){
    event.preventDefault();

    let firstDelay = Number(delayInput.value);
    const step = Number(stepInput.value);
    const amount = Number(amountInput.value);

    const promises = [];
    for (let i = 0, j = firstDelay; i < amount; i += 1, j +=step) {
      promises.push(createPromise(i+1, j));
    };
    console.log(promises)

    Promise.allSettled(promises).then((results) => {
      results.forEach((result) => {
        console.log(result)
        setTimeout(() => {
          result.then(({position, delay}) =>
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
          .catch(({position, delay}) =>
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`))
        },
        firstDelay +=step)
      });
    });



    console.log(firstDelay)
    console.log(step)
    console.log(amount)
  };


    

        // Викликати ф-ю кріейт проміс емаунт разів
    // кожен проміс викликати із затримкою делей та збільшенням затрики на степ мілісекунд
    // перший проміс делей, 2-й - делей+степ і т.д.
