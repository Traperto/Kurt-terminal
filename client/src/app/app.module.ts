import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppComponent } from './app.component';
import { PaymentInfoDialog } from './payment-info-dialog/payment-info-dialog.component';

@NgModule({
    declarations: [AppComponent, PaymentInfoDialog],
    imports: [
        BrowserModule,
        InlineSVGModule.forRoot({
            clientOnly: true,
        }),
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
    ],
    bootstrap: [AppComponent],
    entryComponents: [PaymentInfoDialog],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppModule {}
