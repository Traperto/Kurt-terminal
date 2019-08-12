import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (environment.jwt) {
            const cloned = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${environment.jwt}`),
            });
            return next.handle(cloned);
        } else {
            return next.handle(request);
        }
    }
}
