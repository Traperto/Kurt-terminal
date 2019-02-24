import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { interval, Subscription } from 'rxjs';
import { PaymentInfoDialogData } from './payment-info-dialog.model';

@Component({
    templateUrl: 'payment-info-dialog.component.html',
    styleUrls: ['payment-info-dialog.component.scss'],
})
export class PaymentInfoDialog implements OnInit, OnDestroy {
    private intervalSubscription = Subscription.EMPTY;

    constructor(
        public dialogRef: MatDialogRef<PaymentInfoDialog>,
        @Inject(MAT_DIALOG_DATA) public data: PaymentInfoDialogData,
    ) {}

    public ngOnInit() {
        interval(5000).subscribe(() => {
            this.dialogRef.close();
        });
    }

    public ngOnDestroy() {
        this.intervalSubscription.unsubscribe();
    }
}
