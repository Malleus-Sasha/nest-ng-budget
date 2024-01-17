import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { IAuthUser, IUser } from "../types/user.i";
import { API_URL } from "../constants/constants";
import { catchError, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isAuthSig = signal<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
  ) {
    const token = localStorage.getItem('token');
    this.isAuthSig.set(!!token);
  }

  singUp(userData: IAuthUser) {
    return this.http.post(`${API_URL}/user`, userData).pipe(
      catchError((err) => {
        this.handlerError(err);
        throw new Error(err.message);
      })
    ).subscribe(() => {
      this.toastr.success('Created');
      this.login(userData);
    });
  }

  login(userData: IAuthUser) {
    return this.http.post<IUser>(`${API_URL}/auth/login`, userData).pipe(
      catchError((err) => {
        this.handlerError(err);
        throw new Error(err.message);
      }),
      // tap((res) => {
      //   localStorage.setItem('token', res.token)
      // })
    ).subscribe((res) => {
      localStorage.setItem('token', res.access_token)
      this.isAuthSig.set(true);
      this.toastr.success('Login');
      this.router.navigate(['/home']);
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthSig.set(false);
    this.router.navigate(['/login']);
    this.toastr.success('logged out');
  }

  private handlerError(err: HttpErrorResponse): void {
    this.toastr.error(err.error.message);
  }
}
