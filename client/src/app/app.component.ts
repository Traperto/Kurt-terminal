import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Flickity from 'flickity';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { RfidService } from './services/rfid-service.service';
import { WindowRef } from './services/window-ref.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit, OnInit {
    @ViewChild('stage') public stageElement: ElementRef;
    public flickity: any;

    private subject: WebSocketSubject<any>;

    constructor(private windowRef: WindowRef, private rfidService: RfidService) {}

    public ngOnInit() {
        this.subject = webSocket('ws://192.168.81.80:8080');
        this.subject.subscribe(msg => {
            console.log(msg);
        });
    }

    public ngAfterContentInit() {
        if (!this.flickity) {
            this.flickity = new Flickity(this.stageElement.nativeElement, {
                pageDots: true,
                draggable: true,
                wrapAround: true,
            });
        }
        this.windowRef.dispatchEvent('resize');
    }
}
