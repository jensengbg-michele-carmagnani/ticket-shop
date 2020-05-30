const bcrypt = require('bcrypt');
const saltRound = 10;

module.exports = {
// hash the pass we get from the user 
    async hashPassword(passwordToHash){
      return await bcrypt.hash(passwordToHash, saltRound);
    },

    async matchPassword(userPassword, hash){ 
      const match = await bcrypt.compare(userPassword, hash);
      return match;
    },
    async genereteTicket(){
     const ticketNum = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
     return ticketNum;
    }


}