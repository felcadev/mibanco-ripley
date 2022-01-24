import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TransferPost } from 'src/app/interfaces/transfer-post.interface';

import { Account } from 'src/app/models/account.model';
import { Payee } from 'src/app/models/payee.model';
import { TransferService } from 'src/app/services/transfer.service';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css','../page.component.css']
})
export class TransferComponent implements OnInit {

  @Input() accountSelected?: [ Payee, Account ];

  payee?: Payee;
  account?: Account;

  public transferForm= this.fb.group({
    amount: [0, [ Validators.required, Validators.min(1) ]],
  });

  constructor(
    private transferService: TransferService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.payee    = this.accountSelected![0];
    this.account  = this.accountSelected![1];
  }

  transfer() {

    if(!this.transferForm.valid) return;

    const formData : TransferPost = {
      accountId: this.account?._id!,
      payeeId: this.payee?._id!,
      amount: this.transferForm.value.amount,
      bankName: this.account?.bankName!
    }

    this.transferService.postTransfer(formData).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/home/history');
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  openSnackBar(message: string, textBtn: string = 'Aceptar'){
    this.snackBar.open(message, textBtn);
  }

}
