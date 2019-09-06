import express from 'express';
import http from 'http';
import pn532 from 'pn532';
import { from, interval, throwError } from 'rxjs';
import { catchError, switchMap, takeWhile, tap, timeout } from 'rxjs/operators';
import SerialPort from 'serialport';
import WebSocket, { AddressInfo } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const serialPort = new SerialPort('/dev/ttyAMA0', { baudRate: 115200 });
const rfid = new pn532.PN532(serialPort, { pollInterval: 5000 });

enum Status {
    Start = 'start',
    End = 'end',
    Error = 'error',
}

rfid.on('ready', () => {
    console.log('Listening for a tag scan...');

    rfid.on('tag', tag => {
        let checkFuther = true;
        let count = 0;

        sendStateToClient(tag.uid, Status.Start);

        // check if the rfid is still available for 1 Sec
        // read the rfid tag again for 3 times with an interval of 250

        interval(250)
            .pipe(
                takeWhile(_ => checkFuther),
                tap(_ => (checkFuther = false)),
                switchMap(_ =>
                    from(rfid.scanTag()).pipe(
                        timeout(100),
                        catchError(err => throwError('Timeout!')),
                    ),
                ),
            )
            .subscribe(
                (newTag: any) => {
                    count++;

                    checkFuther = true;
                    console.log(newTag);

                    if (newTag.uid !== tag.uid) {
                        checkFuther = false;
                        sendStateToClient(tag.uid, Status.Error);
                    }

                    if (count === 3) {
                        checkFuther = false;
                        sendStateToClient(tag.uid, Status.End);
                    }
                },
                error => {
                    checkFuther = false;
                    sendStateToClient(tag.uid, Status.Error);
                },
            );
    });
});

wss.on('connection', (ws: WebSocket) => {
    console.log('client connected');

    ws.on('error', err => {
        console.warn(`Client disconnected - reason: ${err}`);
    });
});

server.listen(8080, '192.168.81.86', () => {
    const address = server.address() as AddressInfo;
    console.log(`Server started on port ${address.address}:${address.port}`);
});

function sendStateToClient(uid: number, status: Status) {
    console.log(`Send to client: ${JSON.stringify({ uid, status })}`);
    wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify({ uid, status }));
        }
    });
}
