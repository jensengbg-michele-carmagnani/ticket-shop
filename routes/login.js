const jwt = require('jsonwebtoken');
const {Router} = require('express');
const router = new Router();

const {getUserName} = require('../models/dbFunctions');
const {matchPassword } = require('../models/hashPassword')


router.post('/login', async (req,res) =>{
  const body = req.body
  console.log('--------login---------');
    console.log('User and pass from the cliente', body);

  let resObj = {
    success :false
  }
  
  
  const user = await getUserName(body);
  console.log('user from db',user);
  const isAMatch = await matchPassword(body.password, user.password);
  console.log('isAMatch: ', isAMatch);
  if (user && isAMatch){
    const token = jwt.sign({uuid : user.uuid}, 'Pokemon',{ expiresIn : 600});
    resObj.success = true;
    resObj.token = token;
    resObj.role = user.role;
  }
  console.log('resObj', resObj);
  res.send(JSON.stringify(resObj));
});



module.exports = router