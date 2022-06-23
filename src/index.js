import ENV from '../config.json' assert {type: 'json'};

const api = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json;carset=utf-8',
  },
   params:{
      api_key: ENV.API_KEY
   }
});

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const url = entry.target.getAttribute('data-img')
      entry.target.setAttribute('src', url)
    }
  })
});

function createMovies(movies, container, {lazyLoad = false, clean = true} = {}){
  if(clean){
    container.innerHTML = '';
  }
  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`;
    })

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(lazyLoad ? "data-img" : "src", `${ENV.IMG_URL}${movie.poster_path}`);

    movieImg.addEventListener('error', () => {
      movieImg.setAttribute('src', 'https://static.platzi.com/static/images/error/img404.png')
    })
    if(lazyLoad){
      lazyLoader.observe(movieImg)
    }

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);

  })
}

let page = 1

async function getPaginedTrendingMovies(){
  page++
  const {data} = await api('trending/movie/day', {
    params: {
      page
    }
  });
  const movies = data.results

  createMovies(movies, genericSection, {lazyLoad: true, clean: false});

  const btnLoadMore = document.createElement('button')
  btnLoadMore.innerHTML = 'Load more'
  genericSection.appendChild(btnLoadMore)
  btnLoadMore.addEventListener('click', () => {
    getPaginedTrendingMovies()
  })
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach(category => {  
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

export async function getTrendingMoviesPreview(){
    const {data} = await api('trending/movie/day');
    const movies = data.results

    createMovies(movies, trendingMoviesPreviewList, {lazyLoad: true, clean: true});
}

export async function getCategoriesPreview(){
  const {data} = await api('genre/movie/list');  
  const categories = data.genres
  createCategories(categories, categoriesPreviewList);
}

export async function getMoviesByCategory(id){
  const {data} = await api(`discover/movie/`, {
    params: {
      with_genres: id
    }
  });
    
  const movies = data.results
  createMovies(movies, genericSection, {lazyLoad: true, clean: false});
}

export async function getMoviesBySearch(query){
  const {data} = await api(`search/movie`, {
    params: {
      query
    }
  });
    
  const movies = data.results
  createMovies(movies, genericSection);
}

export async function getTrendingMovies(){
  const {data} = await api('trending/movie/day');
  const movies = data.results

  createMovies(movies, genericSection, {lazyLoad: true, clean: true});

  const btnLoadMore = document.createElement('button')
  btnLoadMore.innerHTML = 'Load more'
  genericSection.appendChild(btnLoadMore)
  btnLoadMore.addEventListener('click', () => {
    getPaginedTrendingMovies()
  })
}

export async function getMovieById(id){
  const {data: movie} = await api('movie/' + id);
  const movieImgUrl = `${ENV.BIG_IMG_URL}${movie.poster_path}`;
  headerSection.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 19.27%,
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})`;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);

  getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id){
  const { data } = await api('movie/' + id + '/recommendations');
  const getRelatedMovies = data.results;

  createMovies(getRelatedMovies, relatedMoviesContainer);
} 