// CLear Web Storage 
localStorage.clear();

const generateHeader = () => {
  let headerContents = document.querySelectorAll(".header__content");

  let header = document.querySelectorAll(`.header__content .header__title`);
  let description = document.querySelectorAll(`.header__content .header__text`);
  let genres = document.querySelectorAll(`.header__content .header__genre`);
  let images = document.querySelectorAll(`.header__control__img`);

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
      i++;
    }
  };

  GetData();
};

const generateSearch = () => {
  let url = "https://api.jikan.moe/v4/anime?q=";

  let searchedContainer = document.querySelector(".searched__container");

  const getScore = (score) => {
    if (score == null) {
      return "";
    } else {
      return score + "/10";
    }
  };

  const DisplaySearch = async (q) => {
    searchedContainer.style.display = "flex";
    let response = await (await (await fetch(url + q)).json()).data;
    response.forEach((element) => {
      let searched = `
    <div class="searched">
        <div class = "search__overlay" data-id="${element.mal_id}"></div>

        <div class="searched__image" >
            <img src="${
              element.images.webp.small_image_url
            }" alt="" class="search__img" />
        </div>

        <div class="searched__content">
            <div class="searched__title">${element.title}</div>
            <div class="rating">${getScore(element.score)}</div>
        </div>
    </div>
    `;

      searchedContainer.innerHTML += searched;
    });
  };

  let search = document.querySelector(".search");
  search.value = "";

  search.addEventListener("keypress", (key) => {
    searchedContainer.innerHTML = "";
    if (key.key === "Enter") {
      setTimeout(() => {
        DisplaySearch(search.value);
      }, 1000);
    }
  });

  search.addEventListener("input", function () {
    searchedContainer.style.display = "none";
    if (search.value == "") {
      searchedContainer.innerHTML = "";
      searchedContainer.style.display = "none";
    } else {
      searchedContainer.innerHTML = "";
      if (search.value == "") {
        searchedContainer.style.display = "none";
      } else {
        try {
          setTimeout(() => {
            DisplaySearch(search.value);
          }, 1500);
        } catch (error) {
          setTimeout(() => {
            DisplaySearch(search.value);
          }, 1000);
        }
      }
    }
  });

  // Close The Search Container
  window.onclick = function (event) {
    // console.log(`"${event.target.classList[0]}"`)
    if (event.target.classList == "search__overlay") {
      let q = event.target;
      console.log("ID : ", q.dataset.id);

      if (typeof Storage !== "undefined") {
        localStorage.clear();
        localStorage.setItem("anime__id", q.dataset.id);
        // window.location.assign("/main.html");

        window.location.href = 'main.html';
      } else {
        window.alert("Your Browser is not Supported!");
      }
    } else if (event.target != searchedContainer) {
      searchedContainer.style.display = "none";
    } 
  };



  const headerContents = document.querySelectorAll(".header__content");
  headerContents[0].style.display = "flex";

  let interval = 1;
  let slideIndex = 0;

  let images = document.querySelectorAll(`.header__control__img`);

  let img = [];
  let imageArray = [];
  images.forEach((element) => {
    imageArray.push(element.src);
  });

  const HeaderImage = document.querySelector(".header__img");
  HeaderImage.src = images[0].src;

  function showSlide(n) {
    slideIndex = n;
    headerContents.forEach((element) => {
      element.style.display = "none";
    });
    headerContents[slideIndex].style.display = "flex";
  }

  function ChangeSlides(n) {
    let i = (slideIndex += parseInt(n));
    if (i < 0) {
      slideIndex = 4;
      i = slideIndex;
    } else if (i > 4) {
      slideIndex = 0;
      i = slideIndex;
    }

    headerContents.forEach((element) => {
      element.style.display = "none";
    });

    headerContents[i].style.display = "flex";
    HeaderImage.src = images[i].src;
    clearOverlay();
    document.querySelectorAll(".overlay")[i].classList.add("active");
  }

  function clearOverlay() {
    document.querySelectorAll(".overlay").forEach((element) => {
      element.classList.remove("active");
    });
  }
  document.querySelectorAll(".overlay").forEach((element) => {
    element.addEventListener("click", () => {
      clearOverlay();

      let imageIndex = element.classList[1];
      headerContents.forEach((element) => {
        element.style.display = "none";
      });
      HeaderImage.src = images[imageIndex].src;

      headerContents[imageIndex].style.display = "flex";

      element.classList.add("active");
    });
  });

  const actions = document.querySelectorAll(".header__control__actions");
  actions.forEach((action) => {
    const i = Object.values(action.children);
    i.forEach((element) => {
      element.addEventListener("click", () => {
        let n = element.classList[1];
        ChangeSlides(n);
      });
    });
  });

  const buttons = document.querySelectorAll("header__button");

  buttons.forEach( (element) => {
    console.log(element)
  })
};


// generateHeader();
generateSearch();

