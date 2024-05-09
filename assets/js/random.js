const getAnime = async (id) => {
  const response = await (
    await (await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)).json()
  ).data;

  return response;
};

const getAnimeImage = async (id) => {
  const response = await (
    await (await fetch(`https://api.jikan.moe/v4/anime/${id}/pictures`)).json()
  ).data;

  return response;
};

const HeaderImage = document.querySelector(".anime__header__wrapper");

const AnimeTitle = document.querySelector(".anime__header__content .title");
const AnimeYear = document.querySelector(".content__year");
const AnimeType = document.querySelector(".type");
const AnimeSynopsis = document.querySelector(".synopsis");
const AnimeBackground = document.querySelector(".background");
const AnimeImage = document.querySelector(".anime__img");

const AnimeScores = document.querySelectorAll(".content__score");
const AnimeDurations = document.querySelectorAll(".content__duration");
const AnimeSeasons = document.querySelectorAll(".content__season");
const AnimeStatus = document.querySelectorAll(".content__status");
const AnimeGenres = document.querySelector(".content__genres");

const AnimeMoreImages = document.querySelectorAll(".anime__other__image img");

const GenerateImage = async (data) => {
  let Data = await data;

  let count = 0;
  while (count < 3) {
    try {
      AnimeMoreImages[count].src = Data[count].jpg.large_image_url;
    } catch {}
    count++;
  }
};

const GenerateGenres = (genres) => {
  let div = ``;
  genres.forEach((element) => {
    div += `<div class="genres">${element.name}</div>`;
  });
  return div;
};

const checkForBackground = (background) => {
  if (background == null) {
    document.querySelector(".main__background").style.display = "none";
  } else {
    return background;
  }
};

const GenerateList = (list) => {
  let div = ``;
  list.forEach((element) => {
    div += `${element.name}, `;
  });
  return div;
};


const GenerateAnime = async (data) => {
  let Data = await data;

  AnimeTitle.innerHTML =  Data.title_english === null ? Data.title : Data.title_english;

  let regex = /\s*\[Written by MAL Rewrite\]\s*/;
  AnimeSynopsis.innerHTML = Data.synopsis.replace(regex, "");
  AnimeImage.src = Data.images.jpg.large_image_url;

  HeaderImage.style.background = `url(${Data.images.jpg.large_image_url})`;
  HeaderImage.style.backgroundPosition = "center";
  HeaderImage.style.backgroundRepeat = "no-repeat";
  HeaderImage.style.backgroundSize = "cover";

  AnimeBackground.innerHTML = checkForBackground(Data.background);

  AnimeScores.forEach((element) => {
    element.innerHTML = Data.score;
  });
  AnimeDurations.forEach((element) => {
    element.innerHTML = Data.duration;
  });
  AnimeSeasons.forEach((element) => {
    element.innerHTML = Data.season;
  });
  AnimeStatus.forEach((element) => {
    element.innerHTML = Data.status;
  });

  AnimeYear.innerHTML = Data.year;
  AnimeType.innerHTML = Data.type;
  AnimeGenres.innerHTML =
    "<span>Genres: </span> " + GenerateGenres(Data.genres);

  document.querySelector(".studio__item span").innerHTML = Data.studios[0].name;

  document.querySelector(".an__status").innerHTML = Data.status;
  document.querySelector(".an__type").innerHTML = Data.type;
  document.querySelector(".an__score").innerHTML = Data.score;
  document.querySelector(".an__duration").innerHTML = Data.duration;
  document.querySelector(".an__season").innerHTML = Data.season;
  document.querySelector(".an__rating").innerHTML = Data.rating;
  document.querySelector(".an__source").innerHTML = Data.source;
  document.querySelector(".an__episodes").innerHTML = Data.episodes;
  document.querySelector(".an__aired").innerHTML = Data.aired.string;
  document.querySelector(
    ".an__broadcast"
  ).innerHTML = `${Data.broadcast.day} | ${Data.broadcast.timezone}`;
  document.querySelector(".an__producers").innerHTML = GenerateList(
    Data.producers
  );
  document.querySelector(".an__genres").innerHTML = GenerateList(Data.genres);
};

const getAnimeCharacters = async (id) => {
  const response = await (
    await (
      await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`)
    ).json()
  ).data;

  return response;
};

const generateCharacters = async (data) => {
  let Data = await data;
  let mainChar = document.querySelector(".anime__characters__wrapper");
  mainChar.innerHTML = "";
  Data.forEach((element) => {
    try {
      if (element.role == "Supporting") {
        null;
      } else {
        let div = `
              <div class="anime__character">
                <div class="anime__character__img">
                  <img src="${element.character.images.jpg.image_url}" alt="" />
                </div>
                <div class="anime__character__content">
                  <div class="anime__character__name">
                    <span>${element.character.name}</span>
                    <span>${element.voice_actors[0].person.name}</span>
                  </div>
                  <div class="anime__character__role">
                    <span>Main</span>
                    <span>Japanese Actor</span>
                  </div>
                </div>
                <div class="anime__character__img actor">
                  <img src="${element.voice_actors[0].person.images.jpg.image_url}" alt="" />
                </div>
              </div>
              `;
        mainChar.innerHTML += div;
      }
    } catch {
      mainChar.innerHTML += "😰No Characters Found!";
    }
  });
};

const getAnimeReview = async (id) => {
  const response = await (
    await (await fetch(`https://api.jikan.moe/v4/anime/${id}/reviews`)).json()
  ).data;

  return response;
};

const shortenText = (text, textLimit) => {
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

const generateReviews = async (data) => {
  let Data = await data;

  const mainReview = document.querySelector(".anime__review__wrapper");
  mainReview.innerHTML = "";

  let count = 0;
  while (count < 3) {
    try {
      let div = `
    <div class="anime__review">
              <div class="anime__review__Span">
                <span>Reviewed by </span>
                <div class="reviewed__by">${Data[count].user.username}</div>
                <div class="review__score">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path
                      d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    />
                  </svg>
                  <div class="r__score">${Data[count].score} / 10</div>
                </div>
              </div>
              <div class="anime__review__text">
              ${shortenText(Data[count].review, 75)}
              </div>
              <div class="anime__review__read">Read More</div>
            </div>
    `;
      mainReview.innerHTML += div;
    } catch {
      mainReview.innerHTML += "😰 No Reviews";
    }
    count++;
  }
};

const getAnimeStats = async (id) => {
  const response = await (
    await (
      await fetch(`https://api.jikan.moe/v4/anime/${id}/statistics`)
    ).json()
  ).data;

  document.querySelector(".an__watching").innerHTML = response.watching;
  document.querySelector(".an__watch").innerHTML = response.plan_to_watch;
  document.querySelector(".an__hold").innerHTML = response.on_hold;
  document.querySelector(".an__drop").innerHTML = response.dropped;
  document.querySelector(".an__completed").innerHTML = response.completed;
};

const getAnimeMore = async () => {
  const animeMoreGrid = document.querySelectorAll(".anime__grid img");
  const response = await (
    await (await fetch(`https://api.jikan.moe/v4/anime`)).json()
  ).data;

  let count = 0;
  while (count < 4) {
    animeMoreGrid[count].src = response[count].images.jpg.image_url;
    document.querySelectorAll(".anime__grid")[count].dataset.id =
      response[count].mal_id;
    count++;
  }

  const contentGrid = document.querySelector(".content__grid");
  contentGrid.innerHTML = "";

  while (count < 9) {
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
                <span>${response[count].score} / 10</span>
              </div>
              <div class="read__more__btn" data-AnimeID = '${
                response[count].mal_id
              }'>Read More</div>
            </div>
            <img src="${response[count].images.jpg.image_url}" alt="" />
          </div>
          <div class="grid__text">
          ${
            response[count].title_english === null
              ? response[count].title
              : response[count].title_english
          }
            <span>${response[count].year}</span>
          </div>
        </div>
    `;
    contentGrid.innerHTML += div;
    count++;
  }
  document.querySelectorAll(".read__more__btn").forEach((element) => {
    element.addEventListener("click", () => {
      let animeId = element.dataset.animeid;
      localStorage.setItem("anime__id", animeId);
      window.location.href = "/random.html";
    });
  });

  document.querySelectorAll(".anime__grid").forEach((element) => {
    element.addEventListener("click", () => {
      let animeId = element.dataset.id;
      localStorage.setItem("anime__id", animeId);
      window.location.href = "/random.html";
    });
  });
};

// let id = 1;
const id = localStorage.getItem("anime__id");

try {
  getAnimeMore();
} catch {
  setTimeout(getAnimeMore(), 500);
}
GenerateAnime(getAnime(id));
GenerateImage(getAnimeImage(id));

setTimeout(() => {
  generateCharacters(getAnimeCharacters(id));
}, 1500);

const reviewTitle = document.querySelectorAll(".reviewTitle");
const statsTitle = document.querySelectorAll(".animeStats");

const ReviewLoad = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;

        generateReviews(getAnimeReview(id));

        observer.disconnect();
      }
    });
  });
  io.observe(target);
};
const StatsLoad = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;

        getAnimeStats(id);

        observer.disconnect();
      }
    });
  });
  io.observe(target);
};

reviewTitle.forEach(ReviewLoad);
statsTitle.forEach(StatsLoad);
