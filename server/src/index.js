const express = require('express');
const http = require('http');
const ws = require('ws');
const { resolve } = require('path');
const { GenerateCavern } = require('./generate/generate-cavern');

const log = require('./util/logger')('server');

log.info('initializing...');

const level = GenerateCavern();

const app = express();
app.use((req, res, next) => { log.debug(req.method, req.path); next(); });
app.use(express.static(resolve(__dirname, '../../client/dist')));
app.use((req, res) => res.end(`404: ${req.path}`));

const server = http.createServer(app);
server.on('listening', () => log.info('listening...'));

const wss = new ws.Server({ server });
wss.on('connection', (socket, req) => {
    log.debug('new ws connection:');
    socket.send("welcome to the server!");
    socket.send(JSON.stringify({ event: "level", data: level }));
});

server.listen(3000);