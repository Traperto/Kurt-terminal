import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from './order.model';

@Injectable()
export class OrderService {
    constructor(private httpClient: HttpClient) {}

    order(drinkId: number, rfId: string): Observable<Order> {
        return this.httpClient.post<Order>(`${environment.apiUrl}/buy`, { drinkId, rfId });
    }
}
