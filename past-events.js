const cards = document.getElementById("cont-card");
let infoEvent = data.events;
let currentDate = data.currentDate;

function addCards(lista, elemento) {
  let boxCards = "";
  for (let infooEvent of lista) {
    if (currentDate > infooEvent.date) {
      boxCards += createCard(infooEvent);
    }
  }
  elemento.innerHTML = boxCards;
}
function createCard(infooEvent) {
  return `<section class="sec2">
    <div class="cards">
        <div class="img-card-cont">
            <img class="festival" src=${infooEvent.image} alt="feria">
        </div>
        <h5>${infooEvent.name}</h5>
        <p class="txt">${infooEvent.description}</p>
        <div class="price">
            <p>Price $${infooEvent.price}</p>
            <a href="./details.html?id=${infooEvent._id}&name=${infooEvent.name}">Details</a>
        </div>
    </div>
</section>`;
}
addCards(infoEvent, cards);

function viewNotFound(word) {
  return `<div class = 'div-search' >${word} NOT FOUND</div>`;
}

//----- search

const updateSearch = (event) => {
  const word = event.target.value;
  const filteredEvents = infoEvent.filter((event) => {
    return event.name.toLowerCase().includes(word.toLowerCase());
  });
  let fil = updateCategory(filteredEvents);

  let newBoxCards = "";
  for (let infooEvent of fil) {
    if (currentDate > infooEvent.date) {
      newBoxCards += createCard(infooEvent);
    }
  }
  cards.innerHTML = newBoxCards || viewNotFound(word.toUpperCase());
};
const $searchInput = document.querySelector("#search_input");

$searchInput.addEventListener("input", updateSearch);

//---- categorias

const checkbox = document.getElementById("checkbox-container");

const category = [...new Set(infoEvent.map((event) => event.category))]; // importante saber como funciona , se ejecuta de dentro para afuera

function createCheck(lista, elementos) {
  let categoryBox = "";

  for (let infoCheck of category) {
    categoryBox += ` <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox"  value="${infoCheck}" name="food fair" id="${infoCheck}">
    <label class="form-check-label" for="${infoCheck}">${infoCheck}</label>
  </div>`;
  }
  checkbox.innerHTML = categoryBox;
}
createCheck(category, checkbox);

//evento

function updateCategory(e) {
  let valor = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((valor) => valor.value);
  if (valor.length === 0) {
    return e;
  }
  return e.filter((filtered) => valor.includes(filtered.category));
}

checkbox.addEventListener("change", () => {
  let filteredCategory = updateCategory(infoEvent);
  addCards(filteredCategory, cards);
});
