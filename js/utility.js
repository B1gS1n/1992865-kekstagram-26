const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};  //Возвращает рандомное число в положительном диапазоне

const getRandomArrayElement = (element) => element [getRandomPositiveInteger (0, element.length - 1)];  //Выбирает из массива рандомный элемент

const checkCommentLenght = (string, length) => string.length <= length;    //сравнивает строку с максимальным колличеством символов

const openModal = () => {
  const body = document.body;
  if (!body.classList.contains('modal-open')) {
    body.classList.add('modal-open');
  } else {
    body.classList.remove('modal-open');
  }
};//Добавляет или удаляет класс модалного окна на body

export {getRandomPositiveInteger, getRandomArrayElement, checkCommentLenght, openModal};
