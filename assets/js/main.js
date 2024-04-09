

let headerContents = document.querySelectorAll(".header__content");

let header = document.querySelectorAll(`.header__content .header__title`);
let description = document.querySelectorAll(`.header__content .header__text`);
let genres = document.querySelectorAll(`.header__content .header__genre`);
let images = document.querySelectorAll(`.header__control__img`);

let headerButtons = document.querySelectorAll('.header__button')

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
    headerButtons[i].dataset.id = response[i].mal_id
    i++;
  }
};

function hello(event) {
    let id = (event.explicitOriginalTarget.dataset.id)
    localStorage.clear();
    localStorage.setItem("anime__id", id);
    // window.location.assign("/main.html");

    window.location.href = 'main.html';
}

GetData();

