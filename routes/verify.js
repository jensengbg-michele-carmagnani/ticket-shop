const {Router} = require('express');
const router = new Router();
const {verifyTicketNum} = require('../models/dbFunctions')

router.get('/ticket', async(req,res) =>{
  ticketNum = req.body
  let resObj = {
      success : false
    }

  isVerified = await verifyTicketNum(ticketNum)
  console.log('is verified', isVerified)
    if (typeof isVerified !== 'undefined'){
      resObj.success = true;
      resObj.message =  'Is verify'
      resObj.event =  isVerified.eventName
      resObj.ticket = isVerified.ticketNumber
    }else{
      resObj.message = `Ticket code is not correct plese` 
       
    }
  res.send(JSON.stringify(resObj))
});

module.exports = router