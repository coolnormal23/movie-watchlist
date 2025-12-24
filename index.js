const form = document.forms[0]
const main = document.getElementById('main')
const emptyDiv = document.getElementById('empty')
const results = document.getElementById('results')

let i = 0
const resultsToShow = 3

console.log(form, main)

/*
    Title
    Runtime
    Genres
    Poster
    IMDB
    Description
*/

const testObj = {
  "Title": "Blade Runner",
  "Year": "1982",
  "Rated": "R",
  "Released": "25 Jun 1982",
  "Runtime": "117 min",
  "Genre": "Action, Drama, Sci-Fi",
  "Director": "Ridley Scott",
  "Writer": "Hampton Fancher, David Webb Peoples, Philip K. Dick",
  "Actors": "Harrison Ford, Rutger Hauer, Sean Young",
  "Plot": "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.",
  "Language": "English, German, Cantonese, Japanese, Hungarian, Arabic, Korean",
  "Country": "United States, United Kingdom, Hong Kong",
  "Awards": "Nominated for 2 Oscars. 13 wins & 22 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/MV5BOWQ4YTBmNTQtMDYxMC00NGFjLTkwOGQtNzdhNmY1Nzc1MzUxXkEyXkFqcGc@._V1_SX300.jpg",
  "Ratings": [
    {
      "Source": "Internet Movie Database",
      "Value": "8.1/10"
    },
    {
      "Source": "Rotten Tomatoes",
      "Value": "89%"
    },
    {
      "Source": "Metacritic",
      "Value": "84/100"
    }
  ],
  "Metascore": "84",
  "imdbRating": "8.1",
  "imdbVotes": "868,708",
  "imdbID": "tt0083658",
  "Type": "movie",
  "DVD": "N/A",
  "BoxOffice": "$32,914,489",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
}

results.children[0].innerHTML = `
    <div class="movie">
        <div>
            <img class="poster" src="${testObj.Poster}"></img>
        </div>
        <div>
            <div class="flexcenter">
                <p>${testObj.Title}</p>
                <i class="fa-solid fa-star"></i>
                <p>${testObj.imdbRating}</p>
            </div>
            <div class="flexcenter">
                <p>${testObj.Runtime}</p>
                <p>${testObj.Genre}</p>
                <div role="button" class="flexcenter">
                    <i class="fa-regular fa-square-plus"></i>
                    <p>Watchlist</p>
                </div>
            </div>
            <p>${testObj.Plot}</p>
        </div>
    </div>
`

async function renderMovies(data){
    let j = i
    for(i; i < resultsToShow+j; i++){
        const movieID = data.Search[i].imdbID
        const movieData = await searchMovieByID(movieID)
        console.log(movieData)
    }
}

async function searchMovieByID(id){
    const url = `http://www.omdbapi.com/?apikey=1845bac2&i=${id}`;
    const options = {method: 'GET'};

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function searchMoviesByName(title){
    const url = `http://www.omdbapi.com/?apikey=1845bac2&type=movie&s=${title}`;
    const options = {method: 'GET'};

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        await renderMovies(data)
    } catch (error) {
        console.error(error);
    }
}

function handleSearchSubmit(e){
    e.preventDefault()
    if(form[0].value){
        searchMoviesByName(form[0].value.trimEnd().replaceAll(' ','+'))
    }
}

form.addEventListener('submit', handleSearchSubmit)