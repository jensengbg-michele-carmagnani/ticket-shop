const NameEv = document.querySelector('#eName');
const LocationEv = document.querySelector('#lName');
const dateEv = document.querySelector('#date');
const fromTimeEv = document.querySelector('#from-time');
const toTimeEv = document.querySelector('#to-time');
const priceEv = document.querySelector('#price');
const ticketsEv = document.querySelector('#tickets');
const createEv = document.querySelector('#createEv');
const eventElem = document.querySelector('#event');

function getToken() {
  return sessionStorage.getItem('auth');
}

async function displayAllEvents(events){
  console.log('all array',events);
  eventElem.innerHTML+= `  <section class="title"><h1>name</h1><h1>location</h1><h1>tickets</h1><h1>sold</h1></section>`
  for(event of events.events){
    console.log('event obj', event);
    const { name, location, tickets, ticketsSold } = event;
    
      eventElem.innerHTML+= `  
                          <div class = "eventToDisplay">
                              <span class="eventName">${name}</span>
                              <span class="enventLocation">${location}</span>
                              <span class="enventTickets">${tickets}</span>
                              <span class="enventSold">${ticketsSold}</span>
                          </div>`;

  }
  
}

async function allEvents(){
  eventElem.innerHTML = '';
  const url = 'http://localhost:3000/api/allEvents';
  try {
    const response = await fetch(url, { method: 'GET'});
        const data = await response.json();
        console.log('All the event',data);
        displayAllEvents(data);
        
    return await data;
    
  } catch (error) {
    console.log('error in allEvent fetch', error);
  }
}




async function createEvent(event) {

  try {
    const url = 'http://localhost:3000/api/createEvent';
    const response = await fetch(url, { 
        method: 'POST', 
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' } });
        const data = await response.json();
        allEvents();
        
    return await data;
    
  } catch (error) {
    console.log('erron in createEvent fetch', error);
  }

}

createEv.addEventListener('click', () => {
  
  let obj = {
    name :    NameEv.value,
    location: LocationEv.value,
    date:     dateEv.value,
    fromTime: fromTimeEv.value,
    toTime:   toTimeEv.value,
    price:    priceEv.value,
    tickets:   ticketsEv.value
  }
  createEvent(obj);
})

async function isLoggedIn() {
  const token = await getToken();
  try {
    const url = 'http://localhost:3000/api/auth/isLoggedin';

  const response = await fetch(url, { 
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token
      }
  });
  const data = await response.json();
  return await data;
    
  } catch (error) {
    console.log('errro ', error)
  }
  
}

async function checkToken(){
  const check = await isLoggedIn();
  console.log('check the token',check)
  if(check.success !== true || check.user.role !== 'admin'){
    location.href = 'http://localhost:3000/'
  }

}
checkToken();
allEvents();
