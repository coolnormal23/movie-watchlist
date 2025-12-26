//Author: Jakob Edgeworth (github:coolnormal23)

//html els
const form = document.forms[0]
const main = document.getElementById('main')
const emptyDiv = document.getElementById('empty')
const seemore = document.getElementById('seemore')
const results = document.getElementById('results')
const noresults = document.getElementById('no-results')

//showing movies and tracking movie state
let searchState = []
let i = 0
const resultsToShow = 3

async function renderMovies(){
    let j = i
    let html = ''
    for(i; (i < resultsToShow+j && i < 10); i++){
        console.log(i)
        //get individual movie data
        const movieID = searchState[i].imdbID
        const movieData = await searchMovieByID(movieID)

        //update results display
        main.classList.remove("blank")
        emptyDiv.style.display = 'none'
        noresults.style.display = 'none'
        results.style.display = 'block'
        seemore.style.display = 'block'

        
        console.log(`movie ${i} =`,movieData)
        const img = await doesImageExist(movieData.Poster)
        //render movie
        html += `
            <div class="movie">
                <div class="posterdiv flex center">
                    <img class="poster" src="${img}"></img>
                </div>
                <div class="infodiv">
                    <div class="flex center">
                        <p id="title">${movieData.Title}</p>
                        <i class="fa-solid fa-star star"></i>
                        <p>${movieData.imdbRating}</p>
                    </div>
                    <div class="secondaryinfo">
                        <p>${movieData.Runtime}</p>
                        <p>${movieData.Genre}</p>
                        <div role="button" class="flex center">
                            <i class="fa-regular fa-square-plus"></i>
                            <p>Watchlist</p>
                        </div>
                    </div>
                    <p class="description">${movieData.Plot}</p>
                </div>
            </div>
        `
    }
    //push to dom
    results.children[0].innerHTML += html
}

async function doesImageExist(url){
    try {
        const response = await fetch(url)
        console.log('doesimageexist: ',response)
        return response.ok ? url : '/img/noposter.webp'
    } catch(e) {
        console.log(e)
        return '/img/noposter.webp'
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
        results.children[0].innerHTML = ''
        console.log(data);
        if(data.Response !== "False"){
            searchState = data.Search
            await renderMovies()
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

async function handleSeeMore(e){
    renderMovies()
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