
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import cards from './templates/listCardMenu.hbs';
import './css/styles.css';
import NewApiService from './js/apiService.js';



const refs = {
  searchFormEl: document.getElementById('search-form'),
  galerryListEl: document.querySelector('.gallery'),
  searchBtnEl: document.querySelector('.searchBtn'),
  searchMoreEl: document.querySelector('.searchMore'),
};

const newsApiService = new NewApiService();



refs.searchFormEl.addEventListener('submit', onSearch);
refs.searchMoreEl.addEventListener('click', onBtnMore);

hideBtnMore();


function onSearch(evt) {
  evt.preventDefault();


  clearOnSearchInput();
  newsApiService.query = evt.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return error({
      title: 'Введите пожалуйста запрос',
    });
    hideBtnMore();
  }

  newsApiService.fetchPictures().then(hits => {
    if (hits.length < 1) {
      return error({
        text: 'Проверьте пожалуйста корректность запроса',
      });
      hideBtnMore();
    }
  });

  newsApiService.resetPage();
  newsApiService.fetchPictures().then(addGalleryList);
  showBtnMore();
  
}

function onBtnMore() {
  newsApiService.fetchPictures().then(hits => {
    addGalleryList(hits);
    scroll();
  });
}

function hideBtnMore() {
  const hide = refs.searchMoreEl.classList.add('is-hidden');
}

function showBtnMore() {
  const show = refs.searchMoreEl.classList.remove('is-hidden');
}

function scroll() {
  const element = document.getElementById('scroll');
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function addGalleryList(hits) {
  refs.galerryListEl.insertAdjacentHTML('beforeend', cards(hits));
}

function clearOnSearchInput() {
  refs.galerryListEl.innerHTML = '';
}
