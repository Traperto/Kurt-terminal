import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Drink } from './drink.model';

@Injectable()
export class DrinkService {
    constructor(private httpClient: HttpClient) {}

    getDrinks(): Observable<Drink[]> {
        return this.httpClient.get<Drink[]>(`${environment.apiUrl}/Drinks`);
    }
}
