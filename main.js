import {
  createCard,
  viewNotFound,
  filterAll,
  filterMessageError,
  updateSearch,
  createCheck,
  updateCategory,
} from "./module/function.js";

const cards = document.getElementById("cont-card");
const checkbox = document.getElementById("checkbox-container");
const $searchInput = document.querySelector("#search_input");

let eventos;
let eventosAll;
let searchWord = "";
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((res) => {
    eventos = res.events;
    eventosAll = res.events;
    filterAll(eventos, cards);
    const category = [...new Set(eventos.map((event) => event.category))];
    createCheck(category, checkbox);
  })
  .catch((err) => console.log(err));

// event
checkbox.addEventListener("change", () => {
  let eventosFiltrados = searchWord
    ? eventosAll.filter((evento) =>
        evento.name.toLowerCase().includes(searchWord.toLowerCase())
      )
    : eventos;
  let filteredCategory = updateCategory(eventosFiltrados);
  filterAll(filteredCategory, cards);
});

$searchInput.addEventListener("keyup", () => {
  let word = $searchInput.value;
  let filteredSearch = updateSearch(eventos, $searchInput);
  searchWord = word;
  filterMessageError(filteredSearch, cards, viewNotFound(word));
});
