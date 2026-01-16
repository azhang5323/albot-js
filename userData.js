//const SCRIPT = "BScorpionPriest.js"
const SERVER = "US III";
let RUN_ALL = true;
let RUN_MERCH = true;

module.exports = {
    "config": {
        "fetch": false,
        "botKey": 1,
        "botWebInterface": {
            "start": true,
            "port": 3000
        }
    },
    "login": {
        "email": process.env.username,
        "password": process.env.password
    },
    "toggleMerch": function() {
      RUN_MERCH = !RUN_MERCH;
    },
    
    "toggleAll": function() {
      RUN_ALL = !RUN_ALL;
    },
    "bots": function() {
      if(!RUN_ALL) {
          return [];  
      }
      let BOTS = [
          {
              "characterName": "Bonjour",
              "characterId": "5513766260178944",
              "runScript": "merchant.js",
              "server": "US III"
          }, // */
          {
              "characterName": "trololol",
              "characterId": "6011174247202816",
              "runScript": "priest.js", 
              "server": SERVER
          }, // */
          {
              "characterName": "YTFAN",
              "characte rId": "5178085749030912",
              "runScript": "mage.js",
              "server": SERVER
          }, // */
          {
              "characterName": "derped",
              "characterId": "5931316711784448",
              "runScript": "ranger.js",
              "server": SERVER
          }, // */
        
      ]
      
      if(!RUN_MERCH) {
        BOTS.shift();
      }
      return BOTS;
    }
}
