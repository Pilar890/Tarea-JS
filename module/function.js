// function create card
export function createCard(infooEvent) {
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

export function filterAll(array, elemento) {
  let newBoxCards = "";
  for (let infooEvent of array) {
    newBoxCards += createCard(infooEvent);
  }
  elemento.innerHTML = newBoxCards;
}
// function search
export function viewNotFound(word) {
  return `<div class = 'div-search' >${word.toUpperCase()} EVENT NOT FOUND</div>`;
}

export function filterMessageError(array, contenedor, fn) {
  let newBoxCards = "";
  for (let infooEvent of array) {
    newBoxCards += createCard(infooEvent);
  }
  contenedor.innerHTML = newBoxCards || fn;
}
export function updateSearch(array, elemento) {
  let filtradosPorSearch;
  return (filtradosPorSearch = updateCategory(array).filter((evento) =>
    evento.name.toLowerCase().includes(elemento.value.toLowerCase())
  ));
}
// function create check

export function createCheck(list, container) {
  let categoryBox = "";

  for (let infoCheck of list) {
    categoryBox += ` <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox"  value="${infoCheck}" name="food fair" id="${infoCheck}">
      <label class="form-check-label" for="${infoCheck}">${infoCheck}</label>
    </div>`;
  }
  container.innerHTML = categoryBox;
}

// function checkbox
export function updateCategory(e) {
  let valor = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((valor) => valor.value);

  if (valor.length === 0) {
    return e;
  }
  return e.filter((filtered) => valor.includes(filtered.category));
}

// function upcomming
export function addCardsUpcoming(lista, contenedor, fecha, fn) {
  let boxCards = "";
  for (let infooEvent of lista) {
    if (fecha < infooEvent.date) {
      boxCards += createCard(infooEvent);
    }
  }
  contenedor.innerHTML = boxCards || fn;
}

// function past
export function addCardsPast(lista, elemento, fecha, fn) {
  let boxCards = "";
  for (let infooEvent of lista) {
    if (fecha > infooEvent.date) {
      boxCards += createCard(infooEvent);
    }
  }
  elemento.innerHTML = boxCards || fn;
}

export function creatDetails(elemento, objeto) {
  elemento.innerHTML = `<section class="sec-details">
<div class="cont-img-details">
  <img class="img-details" src=${objeto.image} alt="books">
</div>
<div class="txt-details">
  <h3>DETAILS</h3>
  <h4>${objeto.name}</h4>
  <p class="txt-details2"> ${objeto.description}</p>
  <p class="txt-details2">DATE : ${objeto.date}</p>
  <p class="txt-details2">CATEGORY : ${objeto.category}</p>
  <p class="txt-details2">PLACE : ${objeto.place}</p>
  <p class="txt-details2">CAPACITY : ${objeto.capacity}</p>
  <p class="txt-details2">ASSISTANCE : ${
    objeto.assistance || `${objeto.capacity} aprox`
  } </p>
  <p class="txt-details2">PRICE : $${objeto.price}</p>
</div>
</section>`;
}


// function stats

export function cardsPast(events, pastDate) {
  let pastEvents = [];
  for (let event of events) {
    if (pastDate > event.date) {
      pastEvents.push(event);
    }
  }
  return pastEvents;
}

export function cardUpcoming(events, upComingDate) {
  let upComingEvents = [];
  for (let event of events) {
    if (upComingDate <event.date) {
      upComingEvents.push(event);
    }
  }
  return upComingEvents;
}


export function attendanceMax(events) {
  let highest = 0
  let highestEvent
  for (let event of events) {
      let percentageOfAttendance = (event.assistance * 100) / event.capacity
      if (highest === 0 || percentageOfAttendance > highest) {
          highest = percentageOfAttendance
          highestEvent = event
      }
  }
  return highestEvent
}

export function attendanceLow(events) {
  let lowest = 0
  let lowestEvent
  for (let event of events) {
      let percentageOfAttendance = (event.assistance * 100) / event.capacity
      if (lowest === 0 || percentageOfAttendance < lowest) {
          lowest = percentageOfAttendance
          lowestEvent = event
      }
  }
  return lowestEvent;
}

export function capacityMax(events) {
  let larger = 0;
  let largerCapacityEvent;
  for (let event of events) {
      if (larger === 0 || event.capacity > larger) {
          larger = event.capacity
          largerCapacityEvent = event
      }
  }
  return largerCapacityEvent;
}

export function upcomingEventsStatistics(events) {
  let upcomingStatistics = []; 
  let upcomingCategories = Array.from(new Set(events.map(event => event.category)))


  let upcomingRevenues = [];
  for (let category of upcomingCategories) {
      let cont = 0;
      for (let event of events) {
          if (event.category === category) {
            cont += event.estimate * event.price
          }
      }
      upcomingRevenues.push(cont);
  }


  let upcomingAttendance = [];
  for (let category of upcomingCategories) {
      let estimateAttendance = 0;
      let capacity = 0;
      for (let event of events) {
          if (event.category === category) {
              estimateAttendance += event.estimate
              capacity += event.capacity
          }
      }
      upcomingAttendance.push((estimateAttendance * 100) / capacity)
  }


  upcomingStatistics.push(upcomingCategories, upcomingRevenues, upcomingAttendance)
  return upcomingStatistics;
}


export function pastEventsStatistics(events) {
  let pastStatistics = [];
  let pastCategories = Array.from(new Set(events.map(event => event.category))) 


  let pastRevenues = [];
  for (let category of pastCategories) {
      let revenueCont = 0
      for (let event of events) {
          if (event.category === category) {
              revenueCont += event.assistance * event.price
          }
      }
      pastRevenues.push(revenueCont);
  }


  let pastPercentageOfAttendance = []; 
  for (let category of pastCategories) {
      let assistance = 0;
      let capacity = 0;
      for (let event of events) {
          if (event.category === category) {
              assistance += event.assistance
              capacity += event.capacity
          }
      }
      pastPercentageOfAttendance.push((assistance * 100) / capacity);
  }


  pastStatistics.push(pastCategories, pastRevenues, pastPercentageOfAttendance)
  return pastStatistics;
}



