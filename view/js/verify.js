ticketNum = document.querySelector('#ticket-number')
checkTicket = document.querySelector('#verify-ticket')
eventName = document.querySelector('#name-event')
ticketCode = document.querySelector('#ticket-code')
respTicket = document.querySelector('.response')

function getToken() {
  return sessionStorage.getItem('auth');
}
async function ticketToCheck(ticket){
  try {
    const url = 'http://localhost:3000/api/verify/ticket'
    const response = await fetch(url, {
      method: 'POST',
      body:JSON.stringify(ticket),
      headers: {'content-Type': 'application/json'}
      });
      
    const data = await response.json()
    return await data
  } catch (error) {
     console.log('Network problem',error)
  }
}


checkTicket.addEventListener('click', async ()=> {
  
  let obj = {
    ticketNumber : ticketNum.value
  }
  const ticket = await ticketToCheck(obj)
  console.log('ticket', ticket)
 
  if (ticket.success){

    respTicket.innerHTML = '';
    respTicket.innerHTML += `
    <section class="hvr-grow-rotate">
    <p id="name-event" class="resp">Event: ${ticket.event}</p>
    <p id="ticket-code" class="resp">Verified: ${ticket.ticket}</p>
    </section>`;
  } else {
    respTicket.innerHTML = '';
    respTicket.innerHTML += `
    <section class="hvr-grow-rotate not-correct">
    <p id="name-event" class="resp">Event: ${ticket.message}</p>
    <p id="ticket-code" class="resp">Not Verified: ${ticket.ticket}</p>
    </section>`;
  }
  
});
async function isloggedIn() {
  const token = await getToken();
  console.log('token', token)
  const url = 'http://localhost:3000/api/auth/isLoggedin';

  const response = await fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token
      }
  });
  const data = await response.json();
  return await data;
}
async function checkToken(){
  
  const check = await isloggedIn();

  if(check.success !== true || check.user.role !== 'user'){
    location.href = 'http://localhost:3000/login.html'
  }

}
checkToken();


