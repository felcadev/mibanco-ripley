import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Bank } from '../interfaces/bank.inteface';
import { PayeeForm } from '../interfaces/payee-form.interface';


import { Payee } from '../models/payee.model';


const api_base_url= environment.api_base_url;


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
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


  postPayee(formData: PayeeForm){

    return this.http.post( `${api_base_url}/account/payee`, formData, this.headers ).pipe(
      map( (resp: any ) => {
        return { ok: resp.ok, msg: resp.msg }
      })
    );
  }


  getMyPayee(): Observable<Payee[]> {

    return this.http.get(`${ api_base_url }/account/getmypeopleaccounts`, this.headers).pipe(
      map( (resp: any) => {

        // Load name of bank
        resp.payeeAccounts.forEach( (payee: Payee) => {
          payee.accounts?.forEach( (account: any) => {
            account['bankName'] = JSON.parse(localStorage.getItem('banks') || '[]')
            .filter((bank: any) => bank.id === account.bankId)[0].name || 'No definido';
          })
        })

        return resp.payeeAccounts;
      })
    );
  }

}
