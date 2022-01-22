import { Component, OnInit } from '@angular/core';

import { AccountService } from 'src/app/services/account.service';

import { Payee } from 'src/app/models/payee.model';
import { PayeeForm } from 'src/app/interfaces/payee-form.interface';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css','../page.component.css']
})
export class AccountsComponent implements OnInit {

  payeeAccounts:         Payee[] = [];
  initPayeeAccounts:     Payee[] = [];

  accountSelected?:      [Payee, Account];
  showTransferComponent: boolean = false;

  textSearch: string = '';

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.getMyPayeeAccounts();
  }

  getMyPayeeAccounts() {
    this.accountService.getMyPayee().subscribe({
      next: res => {
        this.initPayeeAccounts  = res;
        this.payeeAccounts      = res;
      },
      error: err => console.log(err)
    })
  }

  textSearchChanged(){

    if( this.textSearch.length < 3 ){
      this.payeeAccounts = this.initPayeeAccounts;
      return
    }

    this.payeeAccounts = this.findAndReturnArrayOfPayee(this.textSearch);

  }

  findAndReturnArrayOfPayee(textSearch: string): Payee[] {

    return this.initPayeeAccounts.filter(
      payee => {
        if(payee.name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())) return true;
        if(payee.rut.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())) return true;

        return false;
      }
    )

  }

  transfer( payee: Payee, account: Account ): void {
    this.accountSelected = [ payee, account];
    this.showTransferComponent = true;
  }

  backAccounts(): void {
    this.accountSelected = undefined;
    this.showTransferComponent = false;
  }

}
