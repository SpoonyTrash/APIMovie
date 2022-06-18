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

function createMovies(movies, container){
  container.innerHTML = '';
  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute("src", `${ENV.IMG_URL}${movie.poster_path}`);

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);

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

    createMovies(movies, trendingMoviesPreviewList);
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
  createMovies(movies, genericSection);
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

  createMovies(movies, genericSection);
}