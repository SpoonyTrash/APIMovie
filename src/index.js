import ENV from '../config.json' assert {type: 'json'};

console.log(`API URL = https://api.themoviedb.org/3/movie/76341?api_key=${ENV.API_KEY}`);