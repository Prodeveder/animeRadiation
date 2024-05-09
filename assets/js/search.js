const searchHome = document.querySelector(".navbar__search");
searchHome.value = "";

searchHome.addEventListener("keypress", (key) => {
  if (key.key === "Enter") {
    searchAnime(searchHome.value);
  }
});

const searchSomething = () => {
  searchAnime(searchHome.value);
};

const searchResultsWrapper = document.querySelector(
  ".search__results__wrapper"
);

const searchAnime = async (query) => {
  const response = await (
    await (await fetch(`https://api.jikan.moe/v4/anime?q=${query}`)).json()
  ).data;

  searchResultsWrapper.innerHTML = "";
  response.forEach((data) => {
    let div = `
        <div class="results" data-id="${data.mal_id}">
            <div class="results__img">
              <img src=${data.images.jpg.large_image_url} alt="">
            </div>
            <div class="result__content">
              <div class="title">${
                data.title_english === null ? data.title : data.title_english
              }</div>
              <div class="year">${data.score}</div>
            </div>
        </div>
    `;
    searchResultsWrapper.innerHTML += div;
  });

  searchResultsWrapper.style.display = "flex";

  document.querySelectorAll(".results").forEach((element) => {
    element.addEventListener("click", () => {
      let animeId = element.dataset.id;
      localStorage.setItem("anime__id", animeId);
      window.location.href = "/random.html";
    });
  });
};

const searchMain = document.querySelector(".main__Search");
searchMain.value = "";

const contentSearch = document.querySelector(".contentSearch");

// console.log(contentSearch.children);

searchMain.addEventListener("keypress", (key) => {
  if (key.key === "Enter") {
    searchAnimeMain(searchMain.value);
  }
});

const searchAnimeMain = async (query) => {
  const response = await (
    await (await fetch(`https://api.jikan.moe/v4/anime?q=${query}`)).json()
  ).data;
  contentSearch.innerHTML = "";

  response.forEach((data) => {
    let div = `
    <div class="grid">
    <div class="grid__image">
      <div class="grid__overlay">
        <div class="overlay__star">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
            />
          </svg>
          <span>${data.score} / 10</span>
        </div>
        <div class="read__more__btn" data-AnimeID = '${
          data.mal_id
        }'>Read More</div>
      </div>
      <img src=${data.images.jpg.large_image_url} alt="" />
    </div>
    <div class="grid__text">
    ${data.title_english === null ? data.title : data.title_english}
      <span>${data.score}</span>
    </div>
  </div>
    `;
    contentSearch.innerHTML += div;
  });

  document.querySelectorAll(".read__more__btn").forEach((element) => {
    element.addEventListener("click", () => {
      let animeId = element.dataset.animeid;
      localStorage.setItem("anime__id", animeId);
      window.location.href = "/random.html";
    });
  });
};

document.querySelectorAll(".read__more__btn").forEach((element) => {
  element.addEventListener("click", () => {
    let animeId = element.dataset.animeid;
    localStorage.setItem("anime__id", animeId);
    window.location.href = "/random.html";
  });
});





