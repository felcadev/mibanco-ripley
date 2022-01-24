import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../../environments/environment';
import { TransferPost } from '../interfaces/transfer-post.interface';


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

  postTransfer( transferData: TransferPost){

    return this.http.post(`${api_base_url}/transfer`, transferData, this.headers).pipe(
      map( (resp: any ) => {
        return { ok: resp.ok, msg: resp.msg, transfer: resp.transfer }
      })
    );

  }

  getAllTransfer(page: number = 0, limit: number = 20 ){

    return this.http.get(`${api_base_url}/transfer/allmytransfers?limit=${limit}&page=${page}`, this.headers).pipe(
      map( (resp: any ) => {
        return {
          ok        : resp.ok,
          page      : resp.page,
          limit     : resp.limit,
          total     : resp.total,
          transfers : resp.transfers,
        }
      })
    );

  }


}
