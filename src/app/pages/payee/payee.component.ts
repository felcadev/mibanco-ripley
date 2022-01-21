import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Bank } from 'src/app/interfaces/bank.inteface';
import { AccountService } from 'src/app/services/account.service';
import { BanksService } from 'src/app/services/banks.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  styleUrls: ['./payee.component.css','../page.component.css']
})
export class PayeeComponent implements OnInit {

  banks: Bank[] = [];
  isLoading: boolean = false;


  public payeeForm= this.fb.group({
    name:           ['felipe', [ Validators.required ]],
    rut:            ['191195922', [ Validators.required ]],
    email:          ['felipe@gmail.com', [ Validators.required, Validators.email ]],
    phoneNumber:    ['948754200', [ Validators.required, Validators.min(1000000) ]],
    bankId:         ['', [ Validators.required ]],
    accountType:    ['', [ Validators.required ]],
    accountNumber:  ['1234567', [ Validators.required, Validators.min(1000) ]],
  });

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
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
                        },
                        error: (err) => {
                          this.openSnackBar(err.error.error)
                        }
                      });

    this.isLoading = false;
  }

  openSnackBar(message: string, textBtn: string = 'Aceptar'){
    this.snackBar.open(message, textBtn);
  }

}
