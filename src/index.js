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

getTrendingMoviesPreview()