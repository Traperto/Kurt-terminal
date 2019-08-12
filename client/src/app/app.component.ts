import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as Flickity from 'flickity';
import { empty, interval, Observable, Subscription } from 'rxjs';
import { catchError, filter, switchMap, takeWhile, tap } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { Drink } from './drinks/drink.model';
import { DrinkService } from './drinks/drink.service';
import { OrderDialog } from './order/order-dialog/order-dialog.component';
import { Order } from './order/order.model';
import { OrderService } from './order/order.service';
import { RfIdInfo, RfIdStatus } from './rfid.model';
import { WindowRef } from './window-ref.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    flickity: Flickity;
    progressbarValue = 0;
    drinks$: Observable<Drink[]>;

    drinks: Drink[] = [];
    currentDrink: Drink;
    inProgress = false;

    private wsSubscription = Subscription.EMPTY;
    private timerSubscription = Subscription.EMPTY;

    constructor(
        private windowRef: WindowRef,
        private dialog: MatDialog,
        private drinkService: DrinkService,
        private orderService: OrderService,
    ) {}

    ngOnInit() {
        this.drinkService.getDrinks().subscribe(drinks => {
            this.drinks = drinks;
            setTimeout(() => this.initFlickity());
        });

        this.wsSubscription = webSocket<RfIdInfo>(environment.rfidWebSocketUrl)
            .pipe(
                filter(() => this.currentDrink.quantity > 0),
                tap(rfIdInfo => {
                    switch (rfIdInfo.status) {
                        case RfIdStatus.Start:
                            this.inProgress = true;
                            this.startProgressTimer(1000, 10);
                            break;
                        case RfIdStatus.Error:
                            this.inProgress = false;
                            break;
                    }
                }),
                filter(rfIdInfo => rfIdInfo.status === RfIdStatus.End),
                switchMap(rfIdInfo =>
                    this.orderService.order(this.currentDrink.id, rfIdInfo.uid).pipe(
                        catchError((error: HttpErrorResponse) => {
                            console.warn(error.error);
                            this.inProgress = false;
                            return empty();
                        }),
                    ),
                ),
                switchMap(order => this.openPaymentInfo(order)),
            )
            .subscribe(() => {
                this.inProgress = false;
            });
    }

    ngOnDestroy() {
        this.wsSubscription.unsubscribe();
    }

    private initFlickity() {
        if (!this.flickity) {
            this.flickity = new Flickity('.stage', {
                pageDots: true,
                draggable: true,
                wrapAround: true,
                setGallerySize: false,
            });
            this.windowRef.dispatchEvent('resize');

            this.flickity.on('select', (index: number) => {
                this.currentDrink = this.drinks[index];
            });
        }
    }

    private openPaymentInfo(order: Order): Observable<any> {
        return this.dialog
            .open(OrderDialog, {
                data: order,
            })
            .afterClosed();
    }

    private startProgressTimer(milliseconds: number, ticks: number) {
        this.progressbarValue = 0;
        const intervalValue = milliseconds / ticks;

        this.timerSubscription = interval(intervalValue)
            .pipe(takeWhile(tick => this.progressbarValue < 100 && tick < ticks + 10))
            .subscribe(
                tick => {
                    if (this.progressbarValue < 100) {
                        this.progressbarValue += intervalValue / 10;
                    }
                },
                null,

                () => {
                    this.progressbarValue = 0;
                },
            );
    }
}
