import ENV from '../config.json' assert {type: 'json'};

async function getTrendingMoviesPreview(){
    const response = await fetch(`${ENV.API_URL}/trending/movie/day?api_key=${ENV.API_KEY}`);
    const data = await response.json();
    
    const movies = data.results
    console.log({ data, movies})
}

getTrendingMoviesPreview()