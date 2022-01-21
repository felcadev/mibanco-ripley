import { Component, OnInit } from '@angular/core';
import { Bank } from '../interfaces/bank.inteface';
import { BanksService } from '../services/banks.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(
    private bankService: BanksService
  ) { }

  ngOnInit(): void {
    this.getBanksAndSaveToLocalStorage();
  }

  getBanksAndSaveToLocalStorage(){

    this.bankService.getBanks()
    .subscribe( (banks: Bank[]) => {
      localStorage.setItem('banks', JSON.stringify(banks));
    })

  }

}
