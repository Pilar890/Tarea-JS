const cards = document.getElementById("cont-detail");
let infoEvent = data.events;

const params = new URLSearchParams(location.search);
const id = params.get("id");

const events = infoEvent.find((event) => event._id == id);

cards.innerHTML = `<section class="sec-details">
<div class="cont-img-details">
    <img class="img-details" src=${events.image} alt="books">
</div>
<div class="txt-details">
    <h3>DETAILS</h3>
    <h4>${events.name}</h4>
    <p class="txt-details2"> ${events.description}</p>
    <p class="txt-details2">DATE : ${events.date}</p>
    <p class="txt-details2">CATEGORY : ${events.category}</p>
    <p class="txt-details2">PLACE : ${events.place}</p>
    <p class="txt-details2">CAPACITY : ${events.capacity}</p>
    <p class="txt-details2">ASSISTANCE : ${events.assistance}</p>
    <p class="txt-details2">PRICE : $${events.price}</p>
</div>
</section>`;
