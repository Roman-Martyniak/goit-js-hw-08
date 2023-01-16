import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';
let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

populateTextarea();

function onFormSubmit(event) {
  event.preventDefault();
  localStorage.removeItem(LOCAL_KEY);

  event.currentTarget.reset();
}

function populateTextarea() {
  const savedInputTextForm = localStorage.getItem(LOCAL_KEY);

  if (savedInputTextForm) {

    formData = JSON.parse(savedInputTextForm);

    for (const key in formData) {
      refs.form.elements[key].value = formData[key];
    }
  }
}