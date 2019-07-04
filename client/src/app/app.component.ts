import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as Flickity from 'flickity';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { PaymentInfoDialog } from './payment-info-dialog/payment-info-dialog.component';
import { RfidService } from './services/rfid-service.service';
import { WindowRef } from './services/window-ref.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit, OnInit {
    @ViewChild('stage', { static: true }) public stageElement: ElementRef;
    public flickity: any;

    private subject: WebSocketSubject<any>;

    constructor(private windowRef: WindowRef, private rfidService: RfidService, private dialog: MatDialog) {}

    public ngOnInit() {
        this.subject = webSocket('ws://localhost:8080');
        this.subject.subscribe(msg => {
            this.dialog.open(PaymentInfoDialog, {
                data: {
                    user: 'Fabian',
                    drink: 'Club Mate',
                    price: '1 €',
                },
            });
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
