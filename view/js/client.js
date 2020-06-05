eventsElem = document.querySelector('.events');


 function saveEvent(nameEvent) {
  return sessionStorage.setItem('Event', nameEvent);
  
}


async function displayAllEvents(events) {
  eventsElem.innerHTML = '';
  eventsElem.innerHTML += `<section class="title">
  <h1>Events</h1>
</section>`
  for (event of events.events) {
    const { name, location, date, timeIn, timeOut, price } = event;
    eventsElem.innerHTML += `
    
    <section class="wrapper-event hvr-pulse">

        <article class="date">
          <span>${date}</span>
        </article>

        <article class="info" value="${name}">
          <p class="name" value="${name}" id="name" >${name}</p>
          <p class="location">${location}</p>
          <P class="time-price">
            <span class="timeIn">${timeIn}-${timeOut}</span>
            <span class="price">${price}</span>
          </p>
        </article>
    </section>  `

  }
  
     getNamasEvent();
}

async function getEvent() {
  try {
    const response = await fetch(`http://localhost:3000/api/user/events`, { method: 'GET',
   });
    const data = await response.json();
    console.log('retreive all the event avilbale', data);
    displayAllEvents(data);
    return data



  } catch (error) {
    alert('wwwooooppsss Unfortunately something went wrong', error);

  }

}

getEvent();

//  nameElems = document.querySelectorAll('.name')
function getNamasEvent() {
  nameEvents = document.querySelectorAll('.info')

  for (let i = 0; i < nameEvents.length; i ++  ) {
    nameEvents[i].addEventListener('click', async () => {
      console.log(nameEvents[i].getAttribute('value'))
      let nameEvent = nameEvents[i].getAttribute('value') 
      console.log('nameEvent', nameEvent)
      saveEvent(nameEvent);
    location.href = 'http://localhost:3000/displayTicket.html';
    });
  }



}
