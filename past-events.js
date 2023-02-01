const cards = document.getElementById('cont-card')
let infoEvent = data.events
let currentDate = data.currentDate
let boxCards = ''

for(let infooEvent of infoEvent){
    if(currentDate > infooEvent.date ){
        boxCards += `<section class="sec2">
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
                        </section>` 

    }
 
}
cards.innerHTML = boxCards