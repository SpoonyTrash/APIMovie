import ENV from '../config.json' assert {type: 'json'};

async function getTrendingMoviesPreview(){
    const response = await fetch(`${ENV.API_URL}/trending/movie/day?api_key=${ENV.API_KEY}`);
    const data = await response.json();
    
    const movies = data.results
    movies.forEach(movie => {
    const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');

      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');

      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute("alt", movie.title);
      movieImg.setAttribute("src", `${ENV.IMG_URL}${movie.poster_path}`);

      movieContainer.appendChild(movieImg);
      trendingPreviewMoviesContainer.appendChild(movieContainer);

    })
}

async function getCategoriesPreview(){
  const response = await fetch(`${ENV.API_URL}/genre/movie/list?api_key=${ENV.API_KEY}`);
  const data = await response.json();
  
  const categories = data.genres
  categories.forEach(category => {
  const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');

    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute("id", `id${category.id}`);
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    previewCategoriesContainer.appendChild(categoryContainer);
  })
}

getTrendingMoviesPreview()
getCategoriesPreview()