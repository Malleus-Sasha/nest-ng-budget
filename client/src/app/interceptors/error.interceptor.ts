import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // tap(
      //   (event) => { if (event instanceof HttpResponse) console.log('[Server response')},
      //   (err) => { if (err instanceof HttpErrorResponse) this.toastr.error(err.statusText)},
      // ),
      tap(
        { error: (err) => { if (err instanceof HttpErrorResponse) this.toastr.error(err.statusText)} },
      ),
      catchError((err) => {
        return throwError(() => new Error(':ERR:INTERCEPT:'));
      })
    );
  }
};
