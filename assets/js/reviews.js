const getAnimeReviews = async () => {
  const response = await (
    await (await fetch("https://api.jikan.moe/v4/reviews/anime")).json()
  ).data;

  return response;
};

const generateStarsN2 = (index) => {
  let nIndex = (Math.floor(index) / 10) * 5;
  let stars = "";
  let i = 1;
  while (i < nIndex + 1) {
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
  let DataList = await data;


  DataList.forEach((Data) => {
    let div = `
    <div class="review">
              <div class="review__wrapper">
                <div class="review__image">
                  <img src=${
                    Data.entry.images.webp.large_image_url
                  } alt="" />
                </div>
                <div class="review__content">
                  <div class="review__span">
                    <span class="by">By James Rod</span>
                    <span class="time">10/02/2023</span>
                  </div>
                  <div class="review__title">${Data.entry.title}</div>
                  <div class="review__item">
                    <div class="review__stars">
                      ${generateStarsN2(Data.score)}
                    </div>
                    <div class="review__score">${Data.score}</div>
                    <div class="review__tag">${Data.tags[0]}</div>
                  </div>
                  <div class="review__text">
                    ${Data.review}
                  </div>
                  <div class="review__btn" data-id = "${Data.entry.mal_id}">Check Out Anime</div>
                </div>
              </div>
            </div>
        
    `;

    MainReviews.innerHTML += div;
  });

  document.querySelectorAll(".review__btn").forEach((element) => {
    element.addEventListener("click", () => {
      let animeId = element.dataset.id;
      localStorage.setItem("anime__id", animeId);
      window.location.href = "/random.html";
      // console.log(animeId)
    });
  });
};

GenerateReviews(getAnimeReviews());
