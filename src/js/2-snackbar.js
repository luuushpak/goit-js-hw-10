import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElement = document.querySelector('.form');

formElement.addEventListener('submit', submitHandler);

function submitHandler(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const state = form.elements.state.value;
  const delay = Number(form.elements.delay.value);
  const promise = createPromise(state, delay);

  form.reset();

  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
}

function createPromise(state, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        res(delay);
      } else if (state === 'rejected') {
        rej(delay);
      }
    }, delay);
  });
}
