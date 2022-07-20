const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const port = {
  Posts     : '4001',
  Comments  : '4002',
  Query     : '4003',
  Moderation: '4004'
}

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post(`http://localhost:${port.Posts}/events`     , event).catch((err) => { console.log(err.message) });
  axios.post(`http://localhost:${port.Comments}/events`  , event).catch((err) => { console.log(err.message) });
  axios.post(`http://localhost:${port.Query}/events`     , event).catch((err) => { console.log(err.message) });
  axios.post(`http://localhost:${port.Moderation}/events`, event).catch((err) => { console.log(err.message) });

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});