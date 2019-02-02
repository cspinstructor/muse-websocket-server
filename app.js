const dgram = require('dgram');
const s = dgram.createSocket('udp4');
const Gyro = require('./Gyro');
const Eeg = require('./Eeg');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let wsock;

wss.on('connection', function connection(ws) {
  wsock = ws;
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  s.on('message', (msg, rinfo) => {
    // eeg3 = String(Eeg.getEeg3(msg));
    eeg3 = 'e ' + Eeg.getEeg3(msg);
    //console.log('X: ', Gyro.getX(msg), ' Y:', Gyro.getY(msg));
    x = 'x ' + Gyro.getX(msg); //rotate around x-axis
    y = 'y ' + Gyro.getY(msg); //roate along y-axis
    console.log('Eeg3: ', eeg3, ' X:', x, ' Y: ', y);
    ws.send(eeg3);
    ws.send(x);
    // ws.send(y);
  });

  s.bind(7000);
});

console.log('server started on port 8080');
