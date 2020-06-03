const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('events.json')
const db = low(adapter)


module.exports = {

  // init the db
async initdb(){
  db.defaults({ events: [], tickets:[]}).write();
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
  },
                            //// -----USER ROUTER-----////
  // function get event to sell
  async getEvent(nameEvent){
     const event = await db.get('events').find({name : nameEvent.name}).value();
     return event;
  },
  // check if there are still tickes awailable for the event
  async checkTicket(infoEvent){
    return await db.get('events').find({name : infoEvent.name}).value();
  },
  // add the ticket number for the event name
  async addTicket(ticketNum, eventName){
    return await db.get('ticket').push({ eventName: eventName.name ,ticketNumber : ticketNum,}).write();
  },
  // add 1 to ticket sold, minus 1 to tikets awailable 
  async ticketsLeft(event){
    return await db.get('events').find({name: event.name}).assign({tickets : event.tickets -1, ticketsSold : event.ticketsSold +1 }).write();
  },
                        //// -----VERIFY ROUTER-----////
  async verifyTicketNum(number){
    return await db.get('ticket').find({ticketNumber: number.ticketNumber}).value();
  },
  async deleteTicket(ticketToCancel){
    return await db.get('ticket').remove({ticketNumber: ticketToCancel.ticketNumber}).write();
  }

}