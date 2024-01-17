import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(':i:error:', req);
    return next.handle(req).pipe(
      tap(
        (event) => { if (event instanceof HttpResponse) console.log('[Server response')},
        (err) => { if (err instanceof HttpErrorResponse) this.toastr.error(err.statusText)},
      )
    );
  }
};
