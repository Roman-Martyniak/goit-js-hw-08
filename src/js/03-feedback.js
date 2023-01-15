import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';
let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  console.log(event.target.name);
  console.log(event.target.value);
  // console.dir('dir', event.target);

  formData[event.target.name] = event.target.value;
  // console.log('formData', formData);

  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

populateTextarea();

function onFormSubmit(event) {
  event.preventDefault();
  console.log(formData);
  localStorage.removeItem(LOCAL_KEY);

  event.currentTarget.reset();
}

function populateTextarea() {
  const savedInputTextForm = localStorage.getItem(LOCAL_KEY);

  if (savedInputTextForm) {
    // console.log('populateTextarea', savedInputTextForm);

    formData = JSON.parse(savedInputTextForm);
    // console.dir(' formData = ', formData);

    for (const key in formData) {
      refs.form.elements[key].value = formData[key];
    }
  }
}