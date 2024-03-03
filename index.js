const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let devices = [
  {
    id: 1,
    name: 'Living room lights',
    type: 'light',
    status: 'off'
  },
  {
    id: 2,
    name: 'Kitchen fan',
    type: 'fan',
    status: 'off'
  },
  {
    id: 3,
    name: 'Bedroom thermostat',
    type: 'thermostat',
    status: 'off'
  }
];

app.get('/devices', (req, res) => {
  res.send(devices);
});

app.get('/devices/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const device = devices.find(device => device.id === id);
  if (device) {
    res.send(device);
  } else {
    res.status(404).send('Device not found');
  }
});

app.put('/devices/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const device = devices.find(device => device.id === id);
  if (device) {
    device.status = req.body.status;
    res.send(device);
  } else {
    res.status(404).send('Device not found');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});