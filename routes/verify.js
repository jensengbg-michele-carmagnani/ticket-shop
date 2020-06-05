const {Router} = require('express');
const router = new Router();
const {verifyTicketNum, deleteTicket} = require('../models/dbFunctions')

router.post('/ticket', async(req,res) =>{
  ticketNum = req.body
  console.log('TicketNum', ticketNum)
  let resObj = {
      success : false
    }

  isVerified = await verifyTicketNum(ticketNum)
  console.log('isVerified', isVerified)
    if (typeof isVerified !== 'undefined'){
      resObj.success = true;
      resObj.message=  'Is verify'
      resObj.event =  isVerified.eventName
      resObj.ticket = isVerified.ticketNumber
      deleteTicket(isVerified);
    }else{
      resObj.message = `Ticket code not correct!` ,
      resObj.success = false,
      resObj.ticket = ticketNum.ticketNumber
       
    }
  res.send(JSON.stringify(resObj))
});

module.exports = router