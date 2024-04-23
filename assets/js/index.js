// External Files
// destinationFile.js
import {
  resultDiv,
  headerDiv,
  TopDiv,
  reviewDiv,
  TopAnimeDiv,
} from "./components.js";
import { SearchAnime, HeaderAnime, ReviewAnime } from "./request.js";

// The Header
let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");

let slider = document.querySelector(".slider");
let sliderList = slider.querySelector(".slider .list");
let thumbnail = document.querySelector(".slider .thumbnail");
let thumbnailItems = thumbnail.querySelectorAll(".item");

thumbnail.appendChild(thumbnailItems[0]);

nextBtn.onclick = function () {
  moveSlider("next");
};

prevBtn.onclick = function () {
  moveSlider("prev");
};

function moveSlider(direction) {
  let sliderItems = sliderList.querySelectorAll(".item");
  let thumbnailItems = document.querySelectorAll(".thumbnail .item");

  if (direction === "next") {
    sliderList.appendChild(sliderItems[0]);
    thumbnail.appendChild(thumbnailItems[0]);
    slider.classList.add("next");
  } else {
    sliderList.prepend(sliderItems[sliderItems.length - 1]);
    thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
    slider.classList.add("prev");
  }

  slider.addEventListener(
    "animationend",
    function () {
      if (direction === "next") {
        slider.classList.remove("next");
      } else {
        slider.classList.remove("prev");
      }
    },
    { once: true }
  );
}

// Local Storage Data Handling
const ClearLocalStorage = () => {
  localStorage.clear();
};

const RemoveLocalStorageItem = (data) => {
  localStorage.removeItem(data);
};

const AddLocalStorageItem = (itemName, data) => {
  localStorage.setItem(itemName, data);
};

const GetLocalStorageItem = (data) => {
  const result = localStorage.getItem(data);
  return result;
};

const RedirectAnime = document.querySelectorAll("display__content span");
const RedirectAnimeContent = document.querySelectorAll(".results__content");

RedirectAnime.forEach((redirect) => [
  redirect.addEventListener("click", () => {
    // let id = redirect.dataset.anime_id;
    // AddLocalStorageItem("anime_id", id);
    window.location.href = "/page.html";
  }),
]);

RedirectAnimeContent.forEach((redirect) => [
  redirect.addEventListener("click", () => {
    let id = redirect.dataset.anime_id;
    AddLocalStorageItem("anime_id", id);
    window.location.href = "/page.html";
  }),
]);
// Search Functions
const search = document.querySelector(".search");
search.value = "";
const searchResults = document.querySelector(".search__results");

const generateSearch = () => {
  const checkNullYear = (year) => {
    if (year == null) {
      return "";
    } else {
      return year;
    }
  };

  const generateQ = async () => {
    const searchQuery = event.target.value;

    const generateDiv = (results) => {
      searchResults.innerHTML = "";

      results.forEach((result) => {
        searchResults.innerHTML += resultDiv(
          result.title,
          checkNullYear(result.year),
          result.images.jpg.image_url,
          result.mal_id
        );
      });
    };

    if (searchQuery === "") {
      searchResults.style.display = "none";
    } else {
      searchResults.style.display = "flex";

      try {
        let results = await SearchAnime(searchQuery);
        generateDiv(results);
      } catch (error) {
        generateDiv(results);

        // console.error("Error fetching search results:", error);
        // searchResults.innerHTML = "An error occurred while fetching results. Please hit 'enter '";
      }
    }
  };

  search.addEventListener("keypress", async function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      generateQ();
    }
  });
};

generateSearch();

const Overlays = document.querySelectorAll(".overlay__result");

Overlays.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(element);
  });
});

window.onclick = function (event) {
  // console.log(event.target.classList);

  if (event.target.classList[0] == "overlay__result") {
    console.log("Working");

    // searchResults.style.display = "none";
    let id = event.target.dataset.anime_id;
    AddLocalStorageItem("anime_id", id);
    window.location.href = "/page.html";

    search.value = "";
  } else if (event.target.classList[0] != "overlay__result") {
    searchResults.style.display = "none";
    search.value = "";
  }
};

const readMoreBtn = document.querySelectorAll(".readMore");

readMoreBtn.forEach((element) => {
  element.addEventListener("click", () => {
    let id = element.dataset.anime_id;
    AddLocalStorageItem("anime_id", id);
    window.location.href = "/page.html";
  });
});

const generateHeader = async () => {
  let data = await HeaderAnime();
  TopAnimeDiv(data);
  headerDiv(data);
  TopDiv(data);
};

generateHeader();
reviewDiv(await ReviewAnime());

const alphabetContainer = document.querySelector(".alphabet__wrapper");

const getAlphabets = async () => {
  alphabetContainer.innerHTML = "";
  // moreAnime[0].innerHTML = "";
  const response = await (await fetch(`assets/js/alphabet.json`)).json();

  let count = 1;
  while (count < 27) {
    alphabetContainer.innerHTML += `<div class="alphabet">${response[count]}</div>`;

    count++;
  }
};

getAlphabets();

let div = document.querySelector(".anime__genres__container");

const getGenres = async () => {
  div.innerHTML = "";
  const response = await (await fetch(`assets/js/genres.json`)).json();

  let count = 1;
  while (count < 77) {
    div.innerHTML += `<div class="genre__item">${response.data[count].name}</div>`;
    count++;
  }
};

getGenres();
