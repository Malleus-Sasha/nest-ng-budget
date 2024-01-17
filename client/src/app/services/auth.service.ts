import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { IAuthUser, IUser } from "../types/user.i";
import { API_URL } from "../constants/constants";
import { catchError, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  singUp(userData: IAuthUser) {
    return this.http.post(`${API_URL}/user`, userData).pipe(
      catchError((err) => {
        this.handlerError(err);
        throw new Error(err.message);
      })
    ).subscribe(() => this.toastr.success('Created'));
  }

  login(userData: IAuthUser) {
    return this.http.post<IUser>(`${API_URL}/auth/login`, userData).pipe(
      catchError((err) => {
        this.handlerError(err);
        throw new Error(err.message);
      }),
      tap((res) => {
        localStorage.setItem('token', res.token)
      })
    ).subscribe(() => this.toastr.success('Created'));
  }



  private handlerError(err: HttpErrorResponse): void {
    this.toastr.error(err.error.message);
  }
}
