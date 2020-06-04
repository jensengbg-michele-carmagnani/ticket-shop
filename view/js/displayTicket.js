ticketEle = document.querySelector('.gallery-ticket')



function getEvent() {
  return sessionStorage.getItem('Event')
}

async function displayTicket(ticket) {
  ticketEle.innerHTML = '';
  const { name, location, date, timeIn, timeOut, price } = ticket;
  ticketEle.innerHTML += `
   
    
     <article class="info">
        <p class="message">You are about to score <br> some tickets to</p>
        <p class="name">${name}</p>
        <span class="time">${date} ${timeIn}-${timeOut}</span>
        <p class="location">@${location}</p>
        <p class="price">${price}</P>
        <button class="buyTicket" id="buy">buy</button>
      
    </section>`
    buyTicket();
}


async function getTicket() {
  try {
    const ticket = getEvent() //this is the session 
    let obj = {
      name: ticket
    }
    console.log('localStorage', ticket)
    const response = await fetch(`http://localhost:3000/api/user/event`,
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

  function buyTicket(){
    buyButton = document.querySelector('#buy')
    buyButton.addEventListener('click', ()=>{
     location.href = 'http://localhost:3000/ticket.html'
  });
}
getTicket();
