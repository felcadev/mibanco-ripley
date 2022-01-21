import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '../interfaces/login-form.interface';

import { environment } from '../../environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

const api_base_url = environment.api_base_url;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }



  login( formData: LoginForm): Observable<any>{

    return this.http.post(`${api_base_url}/login`, formData)
                  .pipe(
                    tap(
                      ( resp: any ) => {
                        localStorage.setItem('token', `${resp.token}`)
                      }
                    )
                  );
  }

  logout() {

    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');

  }

  validateToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ api_base_url }/login/renew`, this.headers).pipe(
            tap( (resp: any) => {
              localStorage.setItem('token', resp.token );
            }),
            map( resp => true),
            catchError( error => of(false) )
          );

  }



}
