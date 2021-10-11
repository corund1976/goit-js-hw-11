import './css/styles.css';
import './js/events';
import { getRequest } from './js/request';
import config from './config.json';

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const divGalleryNode = document.querySelector('.gallery');
const buttonLoadMoreNode = document.querySelector('.load-more');

buttonLoadMoreNode.classList.add("is-hidden");

const cardsArrayToRender = [];

export function clearScreen() {
  divGalleryNode.innerHTML = '';

  buttonLoadMoreNode.classList.add("is-hidden");

  cardsArrayToRender.length = 0;
    
  return;
}

export function getDataFromServer(url) {
  getRequest(url)
    .then(dataFromServer => {
      const { hits: cardsArray, totalHits } = dataFromServer;

      if (cardsArray.length === 0) {
        clearScreen();
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again...");
      }
              
      if (cardsArray.length === config.per_page) {
        buttonLoadMoreNode.classList.remove("is-hidden");
      }

      cardsArrayToRender.push(...cardsArray);

      if (cardsArrayToRender.length >= totalHits) {
        buttonLoadMoreNode.classList.add("is-hidden");
        Notiflix.Notify.success(`We're sorry, but you've reached the end of search results`)
      }

      if (cardsArrayToRender.length <= cardsArray.length) {
        Notiflix.Notify.success(`Hooray! We found over ${totalHits} images`);
      }

      renderCard(cardsArrayToRender);
    })
    .catch(error => console.error(error));
}

function renderCard(cardsArrayToRender) {
  const markup = cardsArrayToRender.map(card => {
    const {
      webformatURL: webformatURL,
      largeImageURL: largeImageURL,
      tags: tags,
      likes: likes,
      views: views,
      comments: comments,
      downloads: downloads
    } = card;
        
    return `
      <div class="photo-card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
          <b>Likes</b>
            ${likes}
          </p>
          <p class="info-item">
          <b>Views</b>
            ${views}
          </p>
          <p class="info-item">
          <b>Comments</b>
            ${comments}
          </p>
          <p class="info-item">
          <b>Downloads</b>
            ${downloads}
          </p>
        </div>
      </div>
    `;
  })
  .join("");
    
  divGalleryNode.innerHTML = markup;

  const lightbox = new SimpleLightbox('.gallery a');

  const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
};