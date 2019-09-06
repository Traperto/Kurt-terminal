import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { interval, Subscription } from 'rxjs';
import { Order } from '../order.model';

@Component({
    templateUrl: 'order-dialog.component.html',
    styleUrls: ['order-dialog.component.scss'],
})
export class OrderDialog implements OnInit, OnDestroy {
    private intervalSubscription = Subscription.EMPTY;

    constructor(private dialogRef: MatDialogRef<OrderDialog>, @Inject(MAT_DIALOG_DATA) public data: Order) {}

    ngOnInit() {
        interval(5000).subscribe(() => {
            this.dialogRef.close();
        });
    }

    ngOnDestroy() {
        this.intervalSubscription.unsubscribe();
    }
}
