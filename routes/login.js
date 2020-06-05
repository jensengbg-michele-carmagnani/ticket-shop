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
  console.log('wrong pass', typeof user);
  if (typeof user === 'undefined'){
    resObj.message = "Username or password not correct",
    resObj.success = false
  }else {
    const match = await matchPassword(body.password, user.password);
    if (user && match){
      const token = jwt.sign({uuid : user.uuid, role: user.role}, 'Pokemon',{ expiresIn : 600});
      resObj.success = true;
      resObj.token = token;
      resObj.role = user.role;
    } 
  }
  console.log('resObj', resObj);
  res.send(JSON.stringify(resObj));
});

router.get('/isLoggedin', async(req,res) =>{
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log('token isLoggedin', token);
  let resObj = {
    isLoggedinIn : false
  }
  console.log('token', token)
  if (token !== 'null'){
    const user = jwt.verify(token, 'Pokemon');
    console.log('user verification token', user)
    if (user){
      resObj.success = true;
      resObj.user = user;
    }
  }
  res.send(JSON.stringify(resObj));
});

router.get('/logout', (res,req) =>{
  let resObj ={
    success: true
  }
  res.send(JSON.stringify(resObj));
});


module.exports = router