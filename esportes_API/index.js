const express = require('express');
const routes = require('./routes/routes.js');
const cors = require('cors');

const app = express();
const port = 4000;

routes(app);

app.listen(port, () => console.log(`servidor está rodando em http://localhost:${port}`));
app.use(cors());

module.exports = app;