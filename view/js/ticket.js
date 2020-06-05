ticketElem = document.querySelector('.ticket-place')

function getEvent() {
  return sessionStorage.getItem('Event')
}
async function displayTicket(ticketEvent) {
  ticketElem.innerHTML = '';
  const { name, location, date, timeIn, timeOut, price, ticketNumber } = ticketEvent;
  ticketElem.innerHTML += `
    

    <section class="wrapper-event">

      <article class="info">
        <p class="name"><span class="what">What</span><span>${name}</span></p>
        <p class="location">
          <span class="where">Where</span>
          <span class="loc"> ${location}</span>
        </p>
        
        <article class="ticketNumber">
        <div class="time">
          <p class="date"><span>When</span><span>${date}</span></p> 
          <p class="timeIn"><span>From</span><span>${timeIn}</span></P>
          <P class="timeOut"><span>To</span><span>${timeOut}</span></P>
        </div>
        <img src="./pics/A2ED7barcode.png" alt="">
        <span class="ticket-number">ticket Number: ${ticketNumber}</span> 
        </article>
      <article>
    </section>`
    

}
async function printTicket(){
  try {
    const ticket = getEvent() //this is the session 
    let obj = {
      name: ticket
    }
    console.log('localStorage', ticket)
    const response = await fetch(`http://localhost:3000/api/user/buyTicket`,
      {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: { 'Content-type': 'application/json' }
      });
    const data = await response.json();
    console.log('tiket event', data);
    await displayTicket(data);




  } catch (error) {
    alert('wwwooooppsss Unfortunately something went wrong', error);

  }
}

printTicket();