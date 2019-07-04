import express from 'express';
import http from 'http';
import pn532 from 'pn532';
import SerialPort from 'serialport';
import WebSocket, { AddressInfo } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const serialPort = new SerialPort('/dev/ttyS0', { baudRate: 115200 });
const rfid = new pn532.PN532(serialPort, { pollInterval: 5000 });

rfid.on('ready', () => {
    console.log('Listening for a tag scan...');

    rfid.on('tag', tag => {
        console.log('tag:', tag.uid);

        wss.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
                console.log(`send ${tag.uid} to clients`);
                client.send(JSON.stringify({ uid: tag.uid }));
            }
        });
    });
});

wss.on('connection', (ws: WebSocket) => {
    console.log('client connected');

    ws.on('error', err => {
        console.warn(`Client disconnected - reason: ${err}`);
    });
});

server.listen(8080, 'localhost', () => {
    const address = server.address() as AddressInfo;
    console.log(`Server started on port ${address.address}:${address.port}`);
});
