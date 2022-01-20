import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Bank } from 'src/app/interfaces/bank.inteface';
import { BanksService } from 'src/app/services/banks.service';

@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  styleUrls: ['./payee.component.css','../page.component.css']
})
export class PayeeComponent implements OnInit {

  banks: Bank[]= [];

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
    private bankService: BanksService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getBanks();
  }

  getBanks(){
    const banks = this.bankService.getBanks()
    .subscribe( (banks: Bank[]) => {
      this.banks = banks;
      console.log(banks);
    })

  }

  register(){

    console.log('pase por aca');

    if(!this.payeeForm.valid){
      return;
    }


    console.log(this.payeeForm.value);


  }

}
