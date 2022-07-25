import {photos} from './data-creation.js';
import {openModal} from './utility.js';

const pictures = document.querySelectorAll ('.picture');
const body = document.body;
const bigPictureElement = document.querySelector ('.big-picture');
const buttonBigPictureCancel = bigPictureElement.querySelector ('.big-picture__cancel');

const addingPhotoComments = (index) => {
  const socialComments = bigPictureElement.querySelector('.social__comments');
  const socialComment = bigPictureElement.querySelector('.social__comment');
  socialComments.innerHTML = '';
  const similarListFragment = document.createDocumentFragment();
  photos[index].comments.forEach(({avatar, name, message}) => {
    const photosCommentsClone = socialComment.cloneNode(true);
    const socialPictureElementClone = photosCommentsClone.querySelector('.social__picture');
    socialPictureElementClone.src = avatar;
    socialPictureElementClone.alt = name;
    photosCommentsClone.querySelector('.social__text').textContent = message;
    similarListFragment.append(photosCommentsClone);
    socialComments.append(similarListFragment);
  });
}; //Добавление комментариев к полноразмерной фотографии

const onBigPictureEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (picture, photogphiess) => {
  picture.forEach ((element, index) => {
    element.addEventListener('click', () => {
      bigPictureElement.classList.remove('hidden');
      openModal();
      bigPictureElement.querySelector('.big-picture__img img').src = photogphiess[index].url;
      bigPictureElement.querySelector('.likes-count').textContent = photogphiess[index].likes;
      bigPictureElement.querySelector('.comments-count').textContent = photogphiess[index].comments.length;
      bigPictureElement.querySelector('.social__caption').textContent = photogphiess[index].description;
      bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
      bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
      addingPhotoComments(index);
    });
  });

  document.addEventListener('keydown', onBigPictureEscKeydown);
}; //Открытие окна с полноразмерным изображением

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureElement.querySelector('.social__comment-count').classList.remove('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.remove('hidden');

  document.removeEventListener('keydown', onBigPictureEscKeydown);
} //Закрытие окна с полноразмерным изображением клавишей Escape

buttonBigPictureCancel.addEventListener ('click', () => {
  closeBigPicture();
});  //Закрытие окна с полноразмерным изображением кликом по кнопке крестик

openBigPicture(pictures, photos);
