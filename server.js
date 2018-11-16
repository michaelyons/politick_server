const express = require('express');
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send('werks');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
