
const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('events.json')
const app = express()

const loginRouter = require('./routes/login')
const adminRounter = require('./routes/admin')
const userRouter = require('./routes/user')
const verifyRouter = require('./routes/verify')

app.use(bodyParser.json());
app.use(express.static('view'));

const { hashPassword, matchPassword } = require('./models/hashPassword');

// Created uuid and hashed the password for the 2 users

// async function getPass() {
//   const myPlaintextPassword = 'pwd1234!';
//   console.log(myPlaintextPassword);
//   const hash = await hashPassword(myPlaintextPassword);
//   console.log('Hash: ', hash);
//   const match = await matchPassword(myPlaintextPassword, hash);
//   console.log('Password match: ', match);
// }
// const uuid = uuidv4();
// function createUuid(uuid) {
//   console.log('uuid',uuid);

// }
// getPass();
// createUuid(uuid);






//Endpoint 
app.use('/api', adminRounter)
app.use('/api/auth', loginRouter)
app.use('/api/user', userRouter)
app.use('/api/verify', verifyRouter)




const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server is running at port : ${port}`)
})

