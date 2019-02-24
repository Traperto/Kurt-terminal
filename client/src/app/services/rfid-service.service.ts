import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RfidService {
    public createWebsocket(): Subject<MessageEvent> {
        const socket = new WebSocket('ws://localhost:8080');
        const observable = Observable.create((observer: Observer<MessageEvent>) => {
            socket.onmessage = observer.next.bind(observer);
            socket.onerror = observer.error.bind(observer);
            socket.onclose = observer.complete.bind(observer);
            return socket.close.bind(socket);
        });

        const observer = {
            next: (data: Object) => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(data));
                }
            },
        };
        return Subject.create(observer, observable);
    }
}
