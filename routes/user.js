const {Router} = require('express');
const router = new Router();
const {getAllEvents, getEvent, checkTicket, addTicket, ticketsLeft} = require('../models/dbFunctions');
const {genereteTicket} = require('../models/hashPassword')


//GET endpoint to get all the event awailable 
router.get('/events', async (req,res)=>{
  const events = await getAllEvents();
  console.log(events);
  
  let resObj = {
    events : events
  }
  console.log('allEvents endPoint',resObj);
  
  res.send(JSON.stringify(resObj));
});

router.get('/event', async (req,res) =>{
   const chosenEvent = req.body;
   console.log('concert choosen ', chosenEvent);
   const event = await getEvent(chosenEvent);
   console.log('event from db', event)
   let resObj  ={
      name: event.name,
      date: event.date, 
      timeIn: event.timeIn,
      timeOut: event.timeOut,
      location: event.location,
      price: event.price,
    }
    res.send(JSON.stringify(resObj));
});

// POST after had store the info into the local.storage we send that back to perform the purchase 
router.post('/buyTicket', async (req,res)=>{
    let infoEvent = req.body;
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
      resObj.message = 'Ticket available = ' + isAvailable.tickets
      
    }
    res.send(JSON.stringify(resObj));
});

module.exports = router
