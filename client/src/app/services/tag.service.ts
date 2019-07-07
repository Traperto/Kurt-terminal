import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root',
})
export class TagService {
    public tags = new Subject();
    private subject: WebSocketSubject<any>;
    private currentUid = undefined;
    private currentCount = 0;
    private lastSentAt = new Date();

    constructor() {
        console.log('mhm');
        this.subject = webSocket('ws://192.168.178.64:8080');
        this.subject.subscribe(response => {
            //Opening Check
            const currentDate = new Date();
            if (
                !this.currentUid ||
                this.currentUid !== response.uid ||
                (this.currentUid === response.uid && this.lastSentAt.getTime() < currentDate.getTime() - 5000)
            ) {
                this.currentCount = 1;
                this.currentUid = response.uid;
                this.lastSentAt = new Date();
                this.tags.next(JSON.stringify({ uid: response.uid, status: 'start' }));
                return;
            }

            this.currentCount++;
            if (this.currentCount === 5) {
                console.log('Yooo');
                this.tags.next(JSON.stringify({ uid: response.uid, status: 'end' }));
                this.lastSentAt = new Date();
            }
        });
    }
}
