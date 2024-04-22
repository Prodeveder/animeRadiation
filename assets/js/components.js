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
const stats = document.querySelectorAll(".stats");
const animeDescription = document.querySelectorAll(".description");

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
  let count = 0;
  while (count < 5) {
    itemImages[count].src = data[count].images.jpg.large_image_url;
    thumbImages[count].src = data[count].images.jpg.large_image_url;
    animeDescription[count].innerHTML = ShortDescription(
      data[count].synopsis,
      45
    );

    itemTitle[count].innerHTML = data[count].title_english;
    stats[count].innerHTML = `${data[count].rating} | ${data[count].type}`;

    scores[count].innerHTML = Math.floor((data[count].score / 10) * 5);
    stars[count].innerHTML = displayStar(data[count].score);

    animeGenres[count].innerHTML = GenerateGenres(data[count].genres);
    count++;
  }
};

const disTv = document.querySelectorAll(".dis_tv");
const disStatus = document.querySelectorAll(".dis_status");
const disScore = document.querySelectorAll(".dis_tv");
const disImage = document.querySelectorAll(".display__img");
const disTitle = document.querySelectorAll(".display__content span");

const TopDiv = (data) => {
  let count = 0;
  while (count < 5) {
    let index = Math.floor(Math.random() * 25);
    disImage[count].src = data[index].images.jpg.large_image_url;
    disTitle[count].innerHTML = data[index].title_english;
    disScore[count].innerHTML = displayStar(data[index].score);
    disTv[count].innerHTML = data[index].type;
    disStatus[count].innerHTML = data[index].status;
    count++;
  }
};

const getYear = (data) => {
  let date = new Date(data);

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var formattedDate =
    year +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (day < 10 ? "0" + day : day);

  return formattedDate;
};

// The Reviews
const reviewTitles = document.querySelectorAll(".review__title");
const reviewImages = document.querySelectorAll(".review__img");
const reviewText = document.querySelectorAll(".review__text");
const reviewTags = document.querySelectorAll(".tags");
const reviewStar = document.querySelectorAll(".stars.review__star .star");
const reviewScore = document.querySelectorAll(".review-score");
const reviewBy = document.querySelectorAll(".by");
const reviewTime = document.querySelectorAll(".time");


// reviewAnimeTags.forEach( (element) => {
//   // element.innerHTML = '';

//   console.log(element)
// })
const reviewDiv = (data) => {
  let count = 0;
  while (count < 3) {
    let index = Math.floor(Math.random() * 25);
    reviewTitles[count].innerHTML = data[count].entry.title;
    reviewBy[count].innerHTML = data[count].user.username;
    reviewTags[count].innerHTML = data[count].tags;
    reviewScore[count].innerHTML = (data[count].score / 10 * 5);
    reviewStar[count].innerHTML = displayStar(data[count].score);



    reviewTime[count].innerHTML = getYear(data[count].date);
    reviewImages[count].src = data[count].entry.images.jpg.large_image_url;

    reviewText[count].innerHTML = ShortDescription(data[count].review, 65);

    // reviewImages[count].src = data[count].images.jpg.large_image_url;
    // console.log(data[count])
    count++;
  }
};

export { resultDiv, headerDiv, TopDiv, reviewDiv };
