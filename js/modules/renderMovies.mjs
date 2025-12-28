export default async function renderMovies(movies, add){
    let html = ''
    for(let i = 0; i < movies.length; i++){
        const movieData = movies[i]
        console.log(`movie ${i} =`,movieData)
        const img = await doesImageExist(movieData.Poster)
        //render movie
        html += `
            <div class="movie">
                <div class="posterdiv flex justifycenter">
                    <img class="poster" src="${img}"></img>
                </div>
                <div class="infodiv">
                    <div class="flex aligncenter">
                        <p id="title">${movieData.Title}</p>
                        <i class="fa-solid fa-star star"></i>
                        <p>${movieData.imdbRating}</p>
                    </div>
                    <div class="secondaryinfo">
                        <p>${movieData.Runtime}</p>
                        <p>${movieData.Genre}</p>
                        ${movieInWatchlist(movieData, add)}
                    </div>
                    <p class="description">${movieData.Plot}</p>
                </div>
            </div>
        `
    }
    return html
}

//helper functions
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

function movieInWatchlist(movieData, add){
    if(add){
        const movieStorage = localStorage.getItem('movies')
        if(movieStorage){
            const movieStorageJSON = JSON.parse(movieStorage)
            if(movieStorageJSON.find(movie => movie.imdbID == movieData.imdbID)){
                return ''
            }
        }

        return `
            <div role="button" class="flex aligncenter moviebutton" data-movie="${movieData.imdbID}">
                ${'<i class="fa-regular fa-square-plus"></i><p>Watchlist</p>'}
            </div>
        `
    } else {
        return `
            <div role="button" class="flex aligncenter moviebutton" data-movie="${movieData.imdbID}">
                ${'<i class="fa-solid fa-circle-minus"></i><p>Remove</p>'}
            </div>
        `
    }
}