import {openModal} from './utility.js';

const form = document.querySelector('.img-upload__form');
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
}, false);
const file = form.querySelector ('.img-upload__input');
const imgUploadWindow = form.querySelector ('.img-upload__overlay');
const buttonCloseUploadOverley = form.querySelector('.img-upload__cancel');
const inputTextHashtags = form.querySelector('.text__hashtags');

const textHashtagSplit = () => inputTextHashtags.value.toLowerCase().split(' ');

const onUploadOverlayKeyKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const openUploadOverlay = () => {
  imgUploadWindow.classList.remove('hidden');
  openModal();

  document.addEventListener ('keydown', onUploadOverlayKeyKeydown);
};

function closeUploadOverlay () {
  imgUploadWindow.classList.add('hidden');
  openModal();
  form.reset();

  document.removeEventListener('keydown', onUploadOverlayKeyKeydown);
}

file.addEventListener('change', () => {
  openUploadOverlay();
});
buttonCloseUploadOverley.addEventListener('click', () => {
  closeUploadOverlay ();
});

pristine.addValidator(inputTextHashtags, () => textHashtagSplit().length <= 5, 'Не больше 5 хештегов');
pristine.addValidator(inputTextHashtags, () => {
  const uniqueTextHashtagSplit = new Set(textHashtagSplit());
  return uniqueTextHashtagSplit.size === textHashtagSplit().length;
}, 'Не может быть одинаковых тегов');
pristine.addValidator(inputTextHashtags, () => inputTextHashtags.value === '' || textHashtagSplit().every((value) => value.length >= 2 && value.length <= 20), 'Хештег содержит не более 20 знаков включительно');
pristine.addValidator(inputTextHashtags, () => inputTextHashtags.value === '' || textHashtagSplit().every((value) => /^#[A-Za-zА-Яа-яЁё0-9]{0,}$/.test(value)), 'Хештег начинается с # состоит из букв и чисел и сод');

form.addEventListener ('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
