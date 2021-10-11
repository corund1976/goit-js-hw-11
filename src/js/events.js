import Notiflix from 'notiflix';
import { getUrl } from './request';
import { clearScreen } from '../index';

let searchQueryText;
let pagePagination;

// ===== Слушатель кнопки "Поиск" =====
const searchFormNode = document.querySelector('#search-form');

searchFormNode.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  clearScreen();

  const {
    elements: { searchQuery }
  } = event.currentTarget;

  searchQueryText = searchQuery.value;

  if (!searchQueryText) {
    return Notiflix.Notify.failure("Oops, there is nothing to search");
  }

  pagePagination = 1;
  
  getUrl(searchQueryText, pagePagination);
}

// ===== Слушатель кнопки "Load More" =====
const buttonLoadMoreNode = document.querySelector('.load-more');

buttonLoadMoreNode.addEventListener('click', onClick);

function onClick() {
  pagePagination = pagePagination + 1;

  getUrl(searchQueryText, pagePagination);
}