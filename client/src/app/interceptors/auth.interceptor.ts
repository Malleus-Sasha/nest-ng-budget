import { HttpInterceptorFn } from '@angular/common/http';
import { API_URL } from '../constants/constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  // let secureReq;
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
      url: `${API_URL}/${req.url}`
    })
  }
  // next.handle(req);
  return next(req);
};
