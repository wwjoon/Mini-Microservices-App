const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const config = [
  { key: 'posts', name: 'posts-clusterip-srv', port: '4001' },
  { key: 'comments', name: 'comments-srv', port: '4002' },
  { key: 'query', name: 'query-srv', port: '4003' },
  { key: 'moderation', name: 'moderation-srv', port: '4004' },
];

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  config.map((server) => {
    axios
      .post(`http://${server.name}:${server.port}/events`, event)
      .catch((err) => {
        console.log(err.message);
      });
  });

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
