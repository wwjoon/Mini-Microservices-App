const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const server = {
  Posts     : 'posts-clusterip-srv',
  Comments  : 'comments-clusterip-srv',
  Query     : 'query-clusterip-srv',
  Moderation: 'moderation-clusterip-srv'
}

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

  axios.post(`http://${server.Posts}:${port.Posts}/events`     , event).catch((err) => { console.log(err.message) });
  // axios.post(`http://${server.Comments}:${port.Comments}/events`  , event).catch((err) => { console.log(err.message) });
  // axios.post(`http://${server.Query}:${port.Query}/events`     , event).catch((err) => { console.log(err.message) });
  // axios.post(`http://${server.Moderation}:${port.Moderation}/events`, event).catch((err) => { console.log(err.message) });

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});