import {
  createCard,
  viewNotFound,
  updateSearch,
  createCheck,
  updateCategory,
  addCardsPast,
} from "./module/function.js";

const cards = document.getElementById("cont-card");
const $searchInput = document.querySelector("#search_input");
const checkbox = document.getElementById("checkbox-container");

let eventos;
let fechas;
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((res) => {
    eventos = res.events;
    fechas = res.currentDate;
    addCardsPast(eventos, cards, fechas);
    const category = [...new Set(eventos.map((event) => event.category))];
    createCheck(category, checkbox);
  })
  .catch((err) => console.log(err));

//----- event

$searchInput.addEventListener("keyup", () => {
  let word = $searchInput.value;
  let filteredSearch = updateSearch(eventos, $searchInput);
  addCardsPast(filteredSearch, cards, fechas, viewNotFound(word));
});

checkbox.addEventListener("change", () => {
  let filteredCategory = updateCategory(eventos);
  addCardsPast(filteredCategory, cards, fechas);
});
