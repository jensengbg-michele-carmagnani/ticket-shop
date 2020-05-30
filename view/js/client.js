eventElem = document.querySelector('.events');


async function displayAllEvents(events){
  eventElem.innerHTML = '';
  eventElem.innerHTML +=`<section class="title">
  <h1>events</h1>
</section>`
  for (event of events.events){
    const {name, location, date, timeIn, timeOut, price} = event; 
    eventElem.innerHTML += `
    
    <section class="wrapper-event">

    <article class="date">
        <span>${date}</span>
      </article>

      <article class="info">
        <h3 class="name"><a href="./clientTicket.html">${name}</a></h3>
        <h4 class="location">${location}</h4>
        <span class="timeIn">${timeIn}</span>
        <span class="timeOut">${timeOut}</span>
        <span class="price">${price}</span>
      </article>
    </section>  `
  
  }
  
}

async function getEvent(){
  try {
    const response = await fetch ( `http://localhost:3000/api/user/events`, { method: 'GET' });
    const data = await response.json();
    console.log('retreive all the event avilbale',data);
    displayAllEvents(data);
    return data
    
    

  } catch (error) {
    alert('wwwooooppsss Unfortunately something went wrong', error);

  }
 }
 getEvent();