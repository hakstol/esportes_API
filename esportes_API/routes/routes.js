const modes = require('./modeRoute.js');
const token = require('./generateTokenRoute.js');
const cors = require('cors');

module.exports = app => {
  app.use( 
    cors(),
    token,
    modes,
  )
}
 