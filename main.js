const cards = document.getElementById("cont-card");
let infoEvent = data.events;

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
          <a href="./details.html">Details</a>
      </div>
  </div>
 </section>`;
}
let newBoxCards = "";
for (let infooEvent of infoEvent) {
  newBoxCards += createCard(infooEvent);
}
cards.innerHTML = newBoxCards;
// ----- search
const updateSearch = (event) => {
  const word = event.target.value;
  const filteredEvents = infoEvent.filter((event) => {
    return event.name.toLowerCase().includes(word.toLowerCase());
  });

  let newBoxCards = "";
  for (let infooEvent of filteredEvents) {
    newBoxCards += createCard(infooEvent);
  }
  cards.innerHTML = newBoxCards;
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
  return e.filter((filtrados) => valor.includes(filtrados.category));
}

checkbox.addEventListener("change", () => {
  let filteredCategory = updateCategory(infoEvent);
  let newBoxCards = "";
  for (let infooEvent of filteredCategory) {
    newBoxCards += createCard(infooEvent);
  }
  cards.innerHTML = newBoxCards;
});

// function filterCategory (eventos, value){
//     const updateCategory = (event) => {
//         const valor = event.target.value
//         console.log(valor)
//         if(valor == 'Food Fair'){
//             return category[0]

//         }else if(valor == 'Museum'){
//             console.log(category[1])
//         }

//     }
// }

// let newBoxCards = "";
// for (let infooEvent of ) {
//   newBoxCards += createCard(infooEvent)
// }
// cards.innerHTML = newBoxCards

// function filterCategory(category, value){

// }
