const cards = document.getElementById('cont-card')
let infoEvent = data.events
let currentDate = data.currentDate


function addCards(lista, elemento){
    let boxCards = ''
    for(let infooEvent of lista){
        if(currentDate > infooEvent.date ){
            boxCards += createCard(infooEvent)
    
        }
     
    }
    elemento.innerHTML += boxCards

}
function createCard(infooEvent){
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
addCards(infoEvent, cards)

//----- search

const updateSearch = (event) => {
    const word = event.target.value;
    const filteredEvents = infoEvent.filter((event) => {
      return event.name.toLowerCase().includes(word.toLowerCase());
    });
  
    
    let newBoxCards = "";
    for (let infooEvent of filteredEvents) {
        if(currentDate > infooEvent.date ){
            newBoxCards += createCard(infooEvent)
    
        }
    }
    cards.innerHTML = newBoxCards;
  };
  const $searchInput = document.querySelector("#search_input");
  
  $searchInput.addEventListener("input", updateSearch);