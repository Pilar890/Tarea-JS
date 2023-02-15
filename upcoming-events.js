import {
  createCard,
  viewNotFound,
  updateSearch,
  createCheck,
  updateCategory,
  addCardsUpcoming,
} from "./module/function.js";

const $searchInput = document.querySelector("#search_input");
const cards = document.getElementById("cont-card");
const checkbox = document.getElementById("checkbox-container");

let eventos;
let fechas;
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((res) => {
    eventos = res.events;
    fechas = res.currentDate;
    addCardsUpcoming(eventos, cards, fechas);
    const category = [...new Set(eventos.map((event) => event.category))];
    createCheck(category, checkbox);
  })
  .catch((err) => console.log(err));

// eventos

$searchInput.addEventListener("keyup", () => {
  let word = $searchInput.value;
  let filteredSearch = updateSearch(eventos, $searchInput);
  addCardsUpcoming(filteredSearch, cards, fechas, viewNotFound(word));
});

checkbox.addEventListener("change", () => {
  let filteredCategory = updateCategory(eventos);
  addCardsUpcoming(filteredCategory, cards, fechas);
});
