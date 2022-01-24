import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AccountService } from 'src/app/services/account.service';

import { Bank } from 'src/app/interfaces/bank.inteface';
import { Router } from '@angular/router';
import { Payee } from 'src/app/models/payee.model';

import { validateRut } from '../../helpers/rut-helper';



@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  styleUrls: ['./payee.component.css','../page.component.css']
})
export class PayeeComponent implements OnInit {

  payeeAccounts:  Payee[] = [];
  banks:          Bank[]  = [];
  isLoading:      boolean = false;
  isRutValid:     boolean = false;


  public payeeForm= this.fb.group({
    rut:            ['', [ Validators.required ]],
    name:           [{ value : '', disabled : !this.isRutValid }, [ Validators.required ]],
    email:          [{ value : '', disabled : !this.isRutValid }, [ Validators.required, Validators.email ]],
    phoneNumber:    [{ value : '', disabled : !this.isRutValid }, [ Validators.required, Validators.min(1000000) ]],
    bankId:         ['', [ Validators.required ]],
    accountType:    ['', [ Validators.required ]],
    accountNumber:  ['', [ Validators.required, Validators.min(1000) ]],
  });

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getBanksOfLocalStorage();
    this.getMyPayeeAccounts();

    this.payeeForm.get('rut')?.valueChanges.subscribe(selectedValue => {

      this.isRutValid = validateRut( selectedValue );

      if(!this.isRutValid){
        this.payeeForm.get('rut')?.setErrors({ 'incorrect' : true });
        this.payeeForm.get('name')?.disable();
        this.payeeForm.get('email')?.disable();
        this.payeeForm.get('phoneNumber')?.disable();

        this.payeeForm.get('name')?.setValue('')
        this.payeeForm.get('email')?.setValue('')
        this.payeeForm.get('phoneNumber')?.setValue('')


      }else{
        this.payeeForm.get('name')?.enable();
        this.payeeForm.get('email')?.enable();
        this.payeeForm.get('phoneNumber')?.enable();
      }

      const payeeFound = this.payeeAccounts.find(payee => payee.rut === selectedValue )
      if( payeeFound ){
        this.payeeForm.get('name')?.setValue(payeeFound.name)
        this.payeeForm.get('email')?.setValue(payeeFound.email)
        this.payeeForm.get('phoneNumber')?.setValue(payeeFound.phoneNumber)
      }
    })

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

  getMyPayeeAccounts() {
    this.accountService.getMyPayee().subscribe({
      next: res => {
        this.payeeAccounts      = res;
      },
      error: err => {
      }
    })
  }


  openSnackBar(message: string, textBtn: string = 'Aceptar'){
    this.snackBar.open(message, textBtn);
  }

}
