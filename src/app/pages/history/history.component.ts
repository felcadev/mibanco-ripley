import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Transfer } from 'src/app/interfaces/transfer';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  page  : number = 0;
  limit : number = 1;
  total : number = 0;

  isLoading: boolean = false;

  transfers : Transfer[] = [];

  // MatPaginator Inputs
  length = this.total;
  pageSize = this.limit;
  pageSizeOptions: number[] = [1, 5, 10, 25, 100];


  displayedColumns: string[] = ['date', 'name', 'rut', 'bankName', 'accountType', 'accountNumber', 'amount'];

  constructor(
    private transferService: TransferService,
  ) { }

  ngOnInit(): void {
    this.getAllMyTransfers();
  }

  getAllMyTransfers(): void {
    this.isLoading = true;
    this.transferService.getAllTransfer(this.page, this.limit).subscribe({
      next  : ( resp ) => {
        this.transfers = resp.transfers;
        this.total = resp.total;
        this.page  = this.page;
        this.limit = this.limit;
        this.length = this.total;
        this.isLoading = false;
      },
      error : ( err ) => { this.isLoading = false }
    })

  }

  handlePage( event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getAllMyTransfers();
  }

}
