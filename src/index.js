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

export async function getTrendingMoviesPreview(){
    const {data} = await api('trending/movie/day');
    
    const movies = data.results

    trendingMoviesPreviewList.innerHTML = '';
    movies.forEach(movie => {

      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');

      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute("alt", movie.title);
      movieImg.setAttribute("src", `${ENV.IMG_URL}${movie.poster_path}`);

      movieContainer.appendChild(movieImg);
      trendingMoviesPreviewList.appendChild(movieContainer);

    })
}

export async function getCategoriesPreview(){
  const {data} = await api('genre/movie/list');
  
  const categories = data.genres

  categoriesPreviewList.innerHTML = '';
  categories.forEach(category => {  

    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute("id", `id${category.id}`);
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    categoriesPreviewList.appendChild(categoryContainer);
  })
}

