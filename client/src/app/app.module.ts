import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { DrinkImagePipe } from './drinks/drink-image.pipe';
import { DrinkService } from './drinks/drink.service';
import { OrderDialog } from './order/order-dialog/order-dialog.component';
import { OrderService } from './order/order.service';

@NgModule({
    declarations: [AppComponent, OrderDialog, DrinkImagePipe],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        InlineSVGModule.forRoot({
            clientOnly: true,
        }),
        HttpClientModule,
        MatDialogModule,
        BrowserModule,
        MatProgressSpinnerModule,
    ],
    bootstrap: [AppComponent],
    entryComponents: [OrderDialog],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        DrinkService,
        OrderService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
})
export class AppModule { }
