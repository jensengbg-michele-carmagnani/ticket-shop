const {Router} = require('express');
const router = new Router();
const {getAllEvents, getEvent, checkTicket, addTicket, ticketsLeft} = require('../models/dbFunctions');
const {genereteTicket} = require('../models/hashPassword')


//POST endpoint to get all the event awailable 
router.get('/events', async (req,res)=>{
  const events = await getAllEvents();
  console.log(events);
  
  let resObj = {
    events : events
  }
  console.log('allEvents endPoint',resObj);
  
  res.send(JSON.stringify(resObj));
});
// POST retrieve the ticket event
router.post('/event', async (req,res) =>{
  nameEvent = req.body;
   console.log('nameEvent', nameEvent);
  
   let resObj = {
    success : false
  }
   const event = await getEvent(nameEvent);
   console.log('event from db', event)
   
      resObj.success = true,
      resObj.name = event.name,
      resObj.date = event.date, 
      resObj.timeIn = event.timeIn,
      resObj.timeOut = event.timeOut,
      resObj.location =  event.location,
      resObj.price = event.price,
    
    res.send(JSON.stringify(resObj));
});

// POST after had store the info into the local.storage we send that back to perform the purchase 
router.post('/buyTicket', async (req,res)=>{
    let infoEvent = req.body;
    console.log('info event',infoEvent)
    let resObj = {
      success : false
    }
    let isAvailable = await checkTicket(infoEvent);
    console.log('db is available', isAvailable)
    if (isAvailable.tickets !== 0){
      ticketNum = await genereteTicket();
      addedTicket =  await addTicket(ticketNum, isAvailable);
      console.log('tiket added to db', addedTicket);
      left = await ticketsLeft(isAvailable);
      console.log('tiket left from db', left);
      resObj.success = true;
      resObj.name = isAvailable.name;
      resObj.date = isAvailable.date;
      resObj.timeIn = isAvailable.timeIn;
      resObj.timeOut = isAvailable.timeOut;
      resObj.location = isAvailable.location;
      resObj.price = isAvailable.price;
      resObj.ticketNumber = ticketNum;
    } else {
      
      resObj.name = 'Ticket Sold Out '; 
      resObj.date = '';
      resObj.timeIn = '';
      resObj.timeOut = '';
      resObj.location = '';
      resObj.price = '';
      resObj.ticketNumber = 'Sold out';
    }
    res.send(JSON.stringify(resObj));
});

module.exports = router
