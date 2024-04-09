
const animeId = localStorage.getItem("anime__id")

console.log('Anime Id : ',animeId)


const home = document.querySelector('.home')
home.innerHTML = animeId;