// sourceFile.js
const colorCode = "Hello WOrld";

const resultDiv = (title, score, image) => {
  let div = `
        <div class="result" id="RedirectAnime" data-Anime_ID="3434">
        <div class="overlay__result"></div>

            <div class="result__image">
                <img
                    src="${image}"
                    alt=""
                    class="result__img"
                />
            </div>
            <div class="results__content">
                <div class="result__title">${title}</div>
                <div class="result__stars">
                    <div class="score">${score}</div>
                </div>
            </div>
        </div>
    `;

  return div;
};

const itemTitle = document.querySelectorAll(
  ".slider .list .item .content .title"
);
const itemImages = document.querySelectorAll(".slider .list .item img");
const thumbImages = document.querySelectorAll(".thumb-img");
const animeGenres = document.querySelectorAll(".anime__genres");
const stars = document.querySelectorAll(".star");
const scores = document.querySelectorAll(".score");
const stats = document.querySelectorAll(".stats")
const animeDescription = document.querySelectorAll('.description')

const GenerateGenres = (genres) => {
  let div = ``;
  genres.forEach((element) => {
    div += `<div class="genre">${element.name}</div>`;
  });
  return div;
};

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

const displayStar = (score) => {
  let limit = Math.floor((score / 10) * 5);
  let stars = ``;

  let count = 0;
  while (count < limit) {
    stars += '<i class="fa-solid fa-star fa-lg" style="color: #132543;"></i>';
    count++;
  }

  let i = 0;
  while (i < 5 - limit) {
    stars += '<i class="fa-solid fa-star fa-lg" style="color: #f0e9ec;"></i>';
    i++;
  }
  return stars;
};

const headerDiv = (data) => {
  console.log(data[0]);

  let count = 0;
  while (count < 5) {
    itemImages[count].src = data[count].images.jpg.large_image_url;
    thumbImages[count].src = data[count].images.jpg.large_image_url;
    animeDescription[count].innerHTML = ShortDescription(data[count].synopsis, 45);

    itemTitle[count].innerHTML = data[count].title_english;
    stats[count].innerHTML = `${data[count].rating} | ${data[count].type}`;

    scores[count].innerHTML = Math.floor(data[count].score / 10 * 5);
    stars[count].innerHTML = (displayStar(data[count].score));

    animeGenres[count].innerHTML = GenerateGenres(data[count].genres);
    count++;
  }
};


const disTv = document.querySelectorAll('.dis_tv');
const disStatus = document.querySelectorAll('.dis_status');
const disScore = document.querySelectorAll('.dis_tv');
const disImage = document.querySelectorAll('.display__img');
const disTitle = document.querySelectorAll('.display__content span');


console.log(disTitle);

const TopDiv = (data) => {
  console.log(data[0]);

  let count = 0;
  while (count < 5) {
    let index = Math.floor(Math.random()* 25)
    disImage[count].src = data[index].images.jpg.large_image_url;
    disTitle[count].innerHTML = data[index].title_english;
    disScore[count].innerHTML = (displayStar(data[index].score));
    disTv[count].innerHTML = data[index].type;
    disStatus[count].innerHTML = data[index].status
    count++;
  }
};
export { resultDiv, headerDiv, TopDiv };
