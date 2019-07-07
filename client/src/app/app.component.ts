import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as Flickity from 'flickity';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/webSocket';
import { TagService } from './services/tag.service';
import { WindowRef } from './services/window-ref.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit, OnInit {
    @ViewChild('stage', { static: true }) public stageElement: ElementRef;
    public flickity: any;
    progressbarValue = 0;
    curSec: number = 0;

    private subject: WebSocketSubject<any>;

    constructor(private windowRef: WindowRef, private tagService: TagService, private dialog: MatDialog) {}

    public ngOnInit() {
<<<<<<< Updated upstream
        this.tagService.tags.pipe(map(response => JSON.parse(response))).subscribe(response => {
            console.log(response);
            if (response.status === 'start') {
                this.startTimer(1);
            }
=======
        this.subject = webSocket('ws://127.0.0.1:8080');
        this.subject.subscribe(msg => {
            this.dialog.open(PaymentInfoDialog, {
                data: {
                    user: 'Fabian',
                    drink: 'Club Mate',
                    price: '1 €',
                },
            });
            console.log(msg);
>>>>>>> Stashed changes
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

    startTimer(seconds: number) {
        const time = seconds;
        const timer$ = interval(1000);

        const sub = timer$.subscribe(sec => {
            this.progressbarValue = 100 - (sec * 100) / seconds;
            this.curSec = sec;

            if (this.curSec === seconds) {
                sub.unsubscribe();
            }
        });
    }
}
