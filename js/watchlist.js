//Author: Jakob Edgeworth (github:coolnormal23)
import renderMovies from "./modules/renderMovies.mjs"
import { main, emptyDiv, results } from "./modules/elements.mjs"

async function renderWishlist(){
    const movieStorage = localStorage.getItem('movies')

    if(movieStorage && movieStorage != '[]'){
        main.classList.remove('blank')
        emptyDiv.style.display = 'none'
        results.style.display = 'block'
        results.children[0].innerHTML = await renderMovies(JSON.parse(movieStorage), false)
    } else {
        main.classList.add('blank')
        emptyDiv.style.display = 'block'
        results.style.display = 'none'
    }
}

async function handleRemoveWatchlist(e){
    const el = e.target.closest('[data-movie]')
    if(el){
        const movieStorage = localStorage.getItem('movies')
        const newStorage = JSON.parse(movieStorage).filter(movie => movie.imdbID !== el.dataset.movie)
        localStorage.setItem('movies',JSON.stringify(newStorage))
        console.log('Removed from watchlist',el.dataset.movie)
        await renderWishlist()
    }
}

results.addEventListener('click', handleRemoveWatchlist)

await renderWishlist()