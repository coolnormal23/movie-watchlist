//Author: Jakob Edgeworth (github:coolnormal23)
import renderMovies from "./modules/renderMovies.mjs"

//html els
const form = document.forms[0]
const main = document.getElementById('main')
const emptyDiv = document.getElementById('empty')
const seemore = document.getElementById('seemore')
const results = document.getElementById('results')
const noresults = document.getElementById('no-results')

let searchState = [] //search results
let i = 0 //track what movie we are on
const resultsToShow = 3 //how many results should show at a time (so i can save api calls)

async function searchMoviesByName(title){
    const url = `http://www.omdbapi.com/?apikey=1845bac2&type=movie&s=${title}`;
    const options = {method: 'GET'};

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        results.children[0].innerHTML = ''
        console.log(data);
        if(data.Response !== "False"){
            searchState = data.Search
            main.classList.remove("blank")
            emptyDiv.style.display = 'none'
            noresults.style.display = 'none'
            results.style.display = 'block'
            seemore.style.display = 'block'
            await seeMore()
        } else {
            //if no search, toggle on our no results display
            results.style.display = 'none'
            seemore.style.display = 'none'
            emptyDiv.style.display = 'none'
            noresults.style.display = 'block'
        }
    } catch (error) {
        console.error(error);
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

async function seeMore(){
    const movies = []
    const j = i+resultsToShow
    for(i; (i < j && i < 10); i++){
        const movieID = searchState[i].imdbID
        movies.push(await searchMovieByID(movieID))
    }
    results.children[0].innerHTML += await renderMovies(movies)
}

async function handleSeeMore(e){
    await seeMore()
}

function handleSearchSubmit(e){
    e.preventDefault()
    if(form[0].value){
        i = 0 //reset movie counter back to 0
        searchMoviesByName(form[0].value.trimEnd().replaceAll(' ','+'))
    }
}

form.addEventListener('submit', handleSearchSubmit)
seemore.addEventListener('click', handleSeeMore)