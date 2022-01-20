import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Bank } from '../interfaces/bank.inteface';


const api_bank_url = environment.api_bank_url;

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  constructor(
    private http: HttpClient
  ) { }

  getBanks(): Observable<Bank[]>{

    return this.http.get( api_bank_url ).pipe(
      map( (resp: any ) => {
        return resp.banks
      })
    );

  }

}
