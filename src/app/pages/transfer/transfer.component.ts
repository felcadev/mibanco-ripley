import { Component, OnInit } from '@angular/core';
import { Payee } from 'src/app/models/payee.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css','../page.component.css']
})
export class TransferComponent implements OnInit {


  constructor(
  ) { }

  ngOnInit(): void {
  }



}
