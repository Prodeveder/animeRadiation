// CLear Web Storage
localStorage.clear();

let headerContents = document.querySelectorAll(".header__content");

let header = document.querySelectorAll(`.header__content .header__title`);
let description = document.querySelectorAll(`.header__content .header__text`);
let genres = document.querySelectorAll(`.header__content .header__genre`);
let images = document.querySelectorAll(`.header__control__img`);

let headerButtons = document.querySelectorAll(".header__button");

const ShortDescription = (text, textLimit) => {
  let newText = text.split(" ");
  let i = 0;
  let finalText = [];
  if (newText.length > textLimit) {
    while (i < textLimit) {
      finalText.push(newText[i]);
      i++;
    }
    text = finalText.join(" ");
    return (text += "...+More");
  } else {
    return text;
  }
};

const GenerateGenres = (genres) => {
  let div = ``;
  genres.forEach((element) => {
    div += `<div class="genre">${element.name}</div>`;
  });
  return div;
};

const GenerateGenres2 = (genres) => {
  let div = ``;
  genres.forEach((element) => {
    div += `<div class="span" >${element.name}</div>`;
  });
  return div;
};

const HeaderImage = document.querySelector(".header__img");
const GetData = async () => {
  const response = await (
    await (await fetch(`https://api.jikan.moe/v4/anime`)).json()
  ).data;

  let i = 0;
  while (i < 5) {
    header[i].innerHTML = response[i].title;
    description[i].innerHTML = ShortDescription(response[i].synopsis, 35);
    genres[i].innerHTML = GenerateGenres(response[i].genres);
    images[i].src = response[i].images.jpg.image_url;
    HeaderImage.src = response[i].images.jpg.large_image_url;
    headerButtons[i].dataset.id = response[i].mal_id;
    i++;
  }
};

function hello(event) {
  let id = event.explicitOriginalTarget.dataset.id;
  localStorage.clear();
  localStorage.setItem("anime__id", id);
  // window.location.assign("/main.html");

  window.location.href = "main.html";
}

GetData();

const error = (id) => {
  try {
    DisplayRecommendation(id);
  } catch {
    setTimeout(() => {
      DisplayRecommendation(id);
    }, 500);
  }
};

const animeDisplay = document.querySelector(".anime__display__container");

const DisplayRecommendation = async (id) => {
  const response = await (
    await (await fetch(`https://api.jikan.moe/v4/anime/${id}`)).json()
  ).data;

  let div = `
  <div class="anime__display">
  <div class="anime__item">
    <img
      src="${response.images.jpg.image_url}"
      alt="Anime Image"
      class="anime__display__img"
    />
    <div class="anime__content ${response.mal_id}" onclick="goto(event)" data-data: ='${response.mal_id}'>
      <span>
        <div class="item">${response.type}</div>
      </span>
      <span>
      <div class="item dub1">${response.score}</div>

        <div class="item dub">${response.year}</div>
      </span>
    </div>
  </div>
  <div class="anime__text">
    ${response.title}
  </div>
  
</div>
  `;
  animeDisplay.innerHTML += div;
};
const recommendation = async () => {
  animeDisplay.innerHTML = "";
  const response = await (
    await (await fetch(`https://api.jikan.moe/v4/recommendations/anime`)).json()
  ).data;

  let count = 0;
  while (count < 4) {
    error(response[count].entry[1].mal_id);
    count++;
  }
};

recommendation();

const animeGenres = document.querySelector(".anime__genres__container");
const generateGenres = async () => {
  animeGenres.innerHTML = "";
  animeDisplay.innerHTML = "";
  const response = await (
    await (await fetch(`assets/js/genres.json`)).json()
  ).data;

  response.forEach((element) => {
    let div = `
        <div class="genre__item ${element.mal_id}" onclick="goto(event)">${element.name}</div>
    `;
    animeGenres.innerHTML += div;
  });
};

generateGenres();

function goto(event) {
  console.log('Working....')
  let id = event.explicitOriginalTarget.classList[1];
  localStorage.clear();
  localStorage.setItem("anime__id", id);
  // window.location.assign("/main.html");

  window.location.href = "main.html";
}

const displayStar = (score) => {
  let stars = "";
  let limit = Math.floor((score / 10) * 5);
  let i = 0;
  while (i < limit) {
    stars += `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    >
    <path
    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
    />
    </svg>
    `;
    i++;
  }

  if (score % 1) {
    stars += `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    >
    <path
    d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z"
    />
    </svg>
    `;
  }
  return stars;
};

const topAnimeContainer = document.querySelector(".anime__top__container");

topAnimeContainer.innerHTML = "";
const GetTopAnime = async () => {
  animeDisplay.innerHTML = "";
  const response = await (
    await (await fetch(`https://api.jikan.moe/v4/top/anime`)).json()
  ).data;

  let count = 0;
  while (count < 3) {
    let index = count + 1;
    let div = `
    <div class="anime__top__contents">
                <div class="anime__top__image">
                  <img src=${response[count].images.jpg.image_url} alt="" />
                  <div class="anime__top__index">${index}</div>
                </div>
                <div class="anime__top__content">
                  <div class="anime__top__overlay ${
                    response[count].mal_id
                  }" onclick="goto(event)">
                    <span class= "temp  ${response[count].mal_id}">${
      response[count].title
    }</span>
                  </div>
                  <div class="anime__top__title">
                  ${response[count].title}
                  </div>
                  <span class="anime__top__rating">
                    <span>Score:</span>
                    <div class="stars">
                     ${displayStar(response[count].score)}
                    </div>
                    <div class="score">7.5</div>
                  </span>
                  <span class="anime__top__rating">
                    <span>Status:</span>
                    <div class="score">${response[count].status}</div>
                  </span>
                </div>
              </div>
    `;
    topAnimeContainer.innerHTML += div;
    count++;
  }
};

try {
  GetTopAnime();
} catch {
  GetTopAnime();
}

const animeReviewContainer = document.querySelector(
  ".anime__display__reviews__container"
);
const getDate = (date) => {
  let currentDate = new Date(date);
  let newDate = currentDate.toLocaleDateString();
  return newDate.split("/").join("-");
};

const GetAnimeReviews = async () => {
  animeReviewContainer.innerHTML = "";
  const response = await (
    await (await fetch(`https://api.jikan.moe/v4/reviews/anime`)).json()
  ).data;
  console.log();

  let count = 0;
  while (count < 3) {
    let review = `
<div class="review__container">
                <div class="review">
                  <div class="review__image">
                    <img
                      src=${response[count].entry.images.jpg.image_url}
                      alt="Review Anime Image"
                    />
                  </div>
                  <div class="review__content">
                    <div class="review__user">
                      <span>by ${response[count].user.username}</span>
                      <span>${getDate(response[count].date)}</span>
                    </div>
                    <div class="review__title">${
                      response[count].entry.title
                    }</div>
                    <div class="review__stat">
                      <div class="stars">${displayStar(
                        (response[count].score / 5) * 5
                      )}</div>
                      <span>${response[count].score}</span>
                    </div>
                    <div class="review__text" onclick="goto(event)">
                      ${ShortDescription(response[count].review, 45)}
                    </div>
                    <div class="review__read ${response[count].mal_id} " onclick="goto(event)">
                      <span class="temp ${response[count].mal_id}">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path class="temp ${response[count].mal_id}"
                            d="M528.3 46.5H388.5c-48.1 0-89.9 33.3-100.4 80.3-10.6-47-52.3-80.3-100.4-80.3H48c-26.5 0-48 21.5-48 48v245.8c0 26.5 21.5 48 48 48h89.7c102.2 0 132.7 24.4 147.3 75 .7 2.8 5.2 2.8 6 0 14.7-50.6 45.2-75 147.3-75H528c26.5 0 48-21.5 48-48V94.6c0-26.4-21.3-47.9-47.7-48.1zM242 311.9c0 1.9-1.5 3.5-3.5 3.5H78.2c-1.9 0-3.5-1.5-3.5-3.5V289c0-1.9 1.5-3.5 3.5-3.5h160.4c1.9 0 3.5 1.5 3.5 3.5v22.9zm0-60.9c0 1.9-1.5 3.5-3.5 3.5H78.2c-1.9 0-3.5-1.5-3.5-3.5v-22.9c0-1.9 1.5-3.5 3.5-3.5h160.4c1.9 0 3.5 1.5 3.5 3.5V251zm0-60.9c0 1.9-1.5 3.5-3.5 3.5H78.2c-1.9 0-3.5-1.5-3.5-3.5v-22.9c0-1.9 1.5-3.5 3.5-3.5h160.4c1.9 0 3.5 1.5 3.5 3.5v22.9zm259.3 121.7c0 1.9-1.5 3.5-3.5 3.5H337.5c-1.9 0-3.5-1.5-3.5-3.5v-22.9c0-1.9 1.5-3.5 3.5-3.5h160.4c1.9 0 3.5 1.5 3.5 3.5v22.9zm0-60.9c0 1.9-1.5 3.5-3.5 3.5H337.5c-1.9 0-3.5-1.5-3.5-3.5V228c0-1.9 1.5-3.5 3.5-3.5h160.4c1.9 0 3.5 1.5 3.5 3.5v22.9zm0-60.9c0 1.9-1.5 3.5-3.5 3.5H337.5c-1.9 0-3.5-1.5-3.5-3.5v-22.8c0-1.9 1.5-3.5 3.5-3.5h160.4c1.9 0 3.5 1.5 3.5 3.5V190z"
                          />
                        </svg>
                        Read More</span
                      >
                    </div>
                  </div>
                </div>
              </div>

`;
    count++;
    animeReviewContainer.innerHTML += review;
  }
};

GetAnimeReviews();

const moreAnime = document.querySelector(".anime__display__more");

const getAnime = async () => {
  moreAnime.innerHTML = "";
  const response = await (
    await (await fetch(`https://api.jikan.moe/v4/top/anime`)).json()
  ).data;

  let count = 0;
  while (count < 8) {
    let div = `
    <div class="anime__more__wrapper">
    <div class="anime__more__image">
      <img src=${response[count].images.jpg.image_url} alt="" />
    </div>
    <div class="anime__more__content">
      <div class="anime__more__overlay ${response[count].mal_id}" onclick=goto(event)>
        <span class='temp ${response[count].mal_id}'>${response[count].title}</span>
      </div>

      <div class="anime__more__title">${response[count].title}</div>
      <div class="anime__more__rating">
        Rating : <span>${response[count].rating}</span>
      </div>
      <div class="anime__more__rating">
        Status : <span>${response[count].status}</span>
      </div>
      <div class="anime__more__genres">
        ${GenerateGenres2(response[count].genres)}
      </div>
    </div>
  </div>
    `;
    count++;
    moreAnime.innerHTML += div;
  }
};


try {
  DisplayRecommendation(id);
} catch {
  setTimeout(() => {
    getAnime();
  }, 500);
}

