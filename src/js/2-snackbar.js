import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form');

function createPromis(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const delay = e.target.elements.delay.value;
    const state = e.target.elements.state.value;
    
    createPromis(delay, state)
        .then(result => {
            console.log(result); 
            iziToast.success({
    title: '',
    message: `${result}`,
    position: `topRight`,
});
        })
        .catch(err => {
            console.log(err);
            iziToast.error({
    title: '',
    message: `${err}`,
    position: `topRight`,
});
        });
});