import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../../environments/environment';
import { Transfer } from '../interfaces/transfer.interface';


const api_base_url = environment.api_base_url;

@Injectable({
  providedIn: 'root'
})
export class TransferService {

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

  postTransfer( transferData: Transfer){

    return this.http.post(`${api_base_url}/transfer`, transferData, this.headers).pipe(
      map( (resp: any ) => {
        return { ok: resp.ok, msg: resp.msg, transfer: resp.transfer }
      })
    );

  }


}
