ticketElem = document.querySelector('.ticket-place')

function getEvent() {
  return sessionStorage.getItem('Event')
}
async function displayTicket(ticketEvent) {
  ticketElem.innerHTML = '';
  ticketElem.innerHTML += ' <a href="index.html" id="logo"><img src="./pics/logo-colour.png" alt=""></a>';
  const { name, location, date, timeIn, timeOut, ticketNumber } = ticketEvent;
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
        
        <span class="ticket-number"> ${ticketNumber }   <span class="copy"><i class="far fa-copy" data-clipboard-target=".ticket-number" alt="Copy to clipboard"></i></span></span>
      
       
        
        </article>
      <article>
    </section>`
    
//copyNumber();
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
// copy number
async function copyNumber(){

  const text = document.querySelector('.ticket-number');
   text.addEventListener('click', ()=>{
  copiedText = text.innerText;
  copiedText.execCommand("copy");

  });
  function copyText(){
    
    text.select(); //select the text area
    document.execCommand("copy");
  
  }
}

printTicket();