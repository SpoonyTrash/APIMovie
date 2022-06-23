import {getTrendingMoviesPreview, getCategoriesPreview, getMoviesByCategory, getMoviesBySearch, getTrendingMovies, getMovieById} from './index.js';

searchFormBtn.addEventListener('click', () => {
  location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
})

arrowBtn.addEventListener('click', () => {
  history.back();
})

window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false);


function navigator(){
  console.log( {location} );
  
  if(location.hash.startsWith('#trends')){
    trendsPage();
  } else if(location.hash.startsWith('#search=')){
    searchPage();
  } else if(location.hash.startsWith('#movie=')){
    moviePage();
  } else if(location.hash.startsWith('#category=')){
    categoryPage();
  } else{
    homePage();
  }
}

function homePage(){
  console.log("HOME");

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');

  getTrendingMoviesPreview()
  getCategoriesPreview()
}

function trendsPage(){
  console.log("TRENDS");

  headerSection.remove('header-container--long');
  headerSection.style.backgroclassListund = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  headerCategoryTitle.innerHTML = 'Trending'
  getTrendingMovies()
}

function searchPage(){
  console.log("SEARCH");

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, searchValue] = location.hash.split('=')
  getMoviesBySearch(searchValue)
}

function moviePage(){
  console.log("MOVIE");

  headerSection.classList.add('header-container--long');
  //headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');

  const [_, movieId] = location.hash.split('=')
  getMovieById(movieId)
}

function categoryPage(){
  window.scrollTo(0, 0);
  console.log("CATEGORY");

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.remove('inactive');
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, categoryData] = location.hash.split('=')
  const [categoryId, categoryName] = categoryData.split('-')
  headerCategoryTitle.innerHTML = decodeURI(categoryName)
  getMoviesByCategory(categoryId)
}