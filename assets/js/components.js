

const getAnimeHeader = async () => {
  const response = await (
    await (await fetch("https://api.jikan.moe/v4/top/anime")).json()
  ).data;

  return response;
};

const getAnimeReviews = async () => {
  const response = await (
    await (await fetch("https://api.jikan.moe/v4/reviews/anime")).json()
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

const GenerateGenres = (genres) => {
  let div = ``;
  genres.forEach((element) => {
    div += `<div class="genres">${element.name}</div>`;
  });
  return div;
};

const GenerateHeader = async (data) => {
  // Header Components
  const animeHeaderTitle = document.querySelectorAll(".anime__title");
  const animeHeaderSpan = document.querySelectorAll(".anime__span");
  const animeHeaderText = document.querySelectorAll(".anime__text");
  const animeHeaderGenres = document.querySelectorAll(".anime__genres");
  const animeHeaderImages = document.querySelectorAll(".item img");
  const animeHeaderImagesThumb = document.querySelectorAll(
    ".thumbnail .item img"
  );
  let Data = await data;
  let count = 0;
  while (count < 5) {
    animeHeaderImages[count].src = Data[count].images.jpg.large_image_url;
    animeHeaderImagesThumb[count].src = Data[count].images.jpg.large_image_url;

    animeHeaderTitle[count].innerHTML = Data[count].title_english;
    animeHeaderText[count].innerHTML = shortenText(Data[count].synopsis, 60);
    animeHeaderGenres[count].innerHTML = GenerateGenres(Data[count].genres);
    document.querySelectorAll(".anime__btn")[count].dataset.id =
      Data[count].mal_id;

    animeHeaderSpan[
      count
    ].innerHTML = `${Data[count].type} | ${Data[count].source}`;

    count++;
  }

  document.querySelectorAll(".anime__btn").forEach((element) => {
    element.addEventListener("click", () => {
      let animeId = element.dataset.id;
      localStorage.setItem("anime__id", animeId);
      window.location.href = "/random.html";
    });
  });
};

const MainContentGrid = document.querySelectorAll(".content__grid");

const GenerateMain = async (data) => {
  MainContentGrid[0].innerHTML = "";

  let Data = await data;

  let count = 24;
  while (count > 4) {
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
          <span>${Data[count].score} / 10</span>
        </div>
        <div class="read__more__btn" data-AnimeID = '${Data[count].mal_id}'>Read More</div>
      </div>
      <img src=${Data[count].images.jpg.large_image_url} alt="" />
    </div>
    <div class="grid__text">
    ${Data[count].title_english}
      <span>${
        Data[count].year === null
        ? ''
        : Data[count].year
      }</span>
    </div>
  </div>
    `;
    MainContentGrid[0].innerHTML += div;
    count--;
  }
  document.querySelectorAll(".read__more__btn").forEach((element) => {
    element.addEventListener("click", () => {
      let animeId = element.dataset.animeid;
      localStorage.setItem("anime__id", animeId);
      window.location.href = "/random.html";
    });
  });
};
const generateStarsN = (index) => {
  let nIndex = (Math.floor(index) / 10) * 5;
  let stars = '';
  let i = 1;
  while( i < nIndex + 1) {
    stars += `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        >
        <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      />
    </svg>
    `
    i++;
  }

  if (index % 10 > 0) {
    stars += `
    <svg 
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path d="M288 0c-12.2 .1-23.3 7-28.6 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3L288 439.8V0zM429.9 512c1.1 .1 2.1 .1 3.2 0h-3.2z"/>
      </svg>
    `;
  }

  return stars;
};

const GenerateReviews = async (data) => {
  const MainReviews = document.querySelector(".main__content__review");
  MainReviews.innerHTML = "";
  let Data = await data;

  let count = 0;
  while (count < 3) {
    let div = `
    <div class="review">
              <div class="review__wrapper">
                <div class="review__image">
                  <img src=${
                    Data[count].entry.images.webp.large_image_url
                  } alt="" />
                </div>
                <div class="review__content">
                  <div class="review__span">
                    <span class="by">By James Rod</span>
                    <span class="time">10/02/2023</span>
                  </div>
                  <div class="review__title">${Data[count].entry.title}</div>
                  <div class="review__item">
                    <div class="review__stars">
                      ${generateStarsN(7)}
                    </div>
                    <div class="review__score">${Data[count].score}</div>
                    <div class="review__tag">${Data[count].tags[0]}</div>
                  </div>
                  <div class="review__text">
                    ${shortenText(Data[count].review, 65)}
                  </div>
                  <div class="review__btn">Continue Reading</div>
                </div>
              </div>
            </div>
    `;

    MainReviews.innerHTML += div;
    count++;
  }
};

const ContentLoad = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;

        GenerateMain(getAnimeHeader());

        observer.disconnect();
      }
    });
  });
  io.observe(target);
};

MainContentGrid.forEach(ContentLoad);

// Declared Function
GenerateHeader(getAnimeHeader());
GenerateReviews(getAnimeReviews());
