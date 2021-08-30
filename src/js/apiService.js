const MY_KEY = '23163904-8c80bcea9221614911235e8ca';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export default class NewApiService {
  constructor() {
    this.page = 1;
    this.perPage = 12;
    this.searchQuery = '';
  }

  fetchPictures() {
    const url = `${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${MY_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.changePage();

        return hits;
      });
  }

  changePage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
