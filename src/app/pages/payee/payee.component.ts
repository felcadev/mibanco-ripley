import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AccountService } from 'src/app/services/account.service';

import { Bank } from 'src/app/interfaces/bank.inteface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  styleUrls: ['./payee.component.css','../page.component.css']
})
export class PayeeComponent implements OnInit {

  banks: Bank[] = [];
  isLoading: boolean = false;


  public payeeForm= this.fb.group({
    name:           ['', [ Validators.required ]],
    rut:            ['', [ Validators.required ]],
    email:          ['', [ Validators.required, Validators.email ]],
    phoneNumber:    ['', [ Validators.required, Validators.min(1000000) ]],
    bankId:         ['', [ Validators.required ]],
    accountType:    ['', [ Validators.required ]],
    accountNumber:  ['', [ Validators.required, Validators.min(1000) ]],
  });

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBanksOfLocalStorage();
  }

  getBanksOfLocalStorage(){
    this.banks = JSON.parse(localStorage.getItem('banks') || '[]');
  }

  register(){

    if(!this.payeeForm.valid){
      return;
    }

    this.isLoading = true;
    this.accountService.postPayee(this.payeeForm.value)
                      .subscribe({
                        next: resp => {
                          this.openSnackBar(resp.msg);
                          this.isLoading = false;
                          this.router.navigateByUrl('/home/accounts');

                        },
                        error: (err) => {
                          this.openSnackBar(err.error.error)
                          this.isLoading = false;
                        }
                      });



  }

  openSnackBar(message: string, textBtn: string = 'Aceptar'){
    this.snackBar.open(message, textBtn);
  }

}
