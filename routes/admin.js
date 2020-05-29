
const {Router} = require('express');
const router = new Router();
const {initdb, getAllEvents, addEvent} = require('../models/dbFunctions')

// POST endpoint to create en event
router.post('/createEvent', async (req, res)=>{
  initdb();
  const event = req.body;
  const createdEvent = await addEvent(event);
  console.log('/createdEvent', createdEvent);
  let resObj = {
    name: createdEvent.name,
    location: createdEvent.location,
    tickets: createdEvent.tickets,
    ticketsSold: createdEvent.ticketsSold
  }
  console.log('resObj',resObj);
  res.send(JSON.stringify(resObj));

});


//GET endpoint to get all the event awailable 
router.get('/allEvents', async (req,res)=>{
  const events = await getAllEvents();
  console.log(events);
 
  let resObj = {
    events : events,
  }
  console.log('allEvents endPoint',resObj);
  
  res.send(JSON.stringify(resObj));
});

module.exports = router;