const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('events.json')
const db = low(adapter)


module.exports = {

  // init the db
async initdb(){
  db.defaults({ events: [] }).write();
 },
  //function---get all the events active.
  async  getAllEvents() {
    const allEvents = db.get('events').value();
    return await allEvents;
  },

  // Functions---create the event into the DB-EVENT and set the DB-SOLD = 0
  async  addEvent(event) {
    db.get('events').push({ name: event.name, location: event.location, date: event.date, timeIn: event.fromTime, timeOut: event.toTime, tickets: parseInt(event.tickets), price: event.price, ticketsSold: 0 }).write();
    const eventCreated = db.get('events').find({ name: event.name }).value();
    return await eventCreated;
  },
  // function to get User name 
  async getUserName(user){
    return await db.get('stuff').find({username : user.username, }).value();
  }
}