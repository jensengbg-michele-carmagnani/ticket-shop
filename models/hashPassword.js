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
    }


}