import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PayeeComponent } from './payee/payee.component';
import { TransferComponent } from './transfer/transfer.component';
import { HistoryComponent } from './history/history.component';
import { PageComponent } from './page.component';
import { AccountsComponent } from './accounts/accounts.component';



const routes: Routes = [
  {
    path: 'home',
    component: PageComponent,
    children: [
      { path: 'payee'     , canActivate: [AuthGuard] ,component: PayeeComponent },
      { path: 'transfer'  , canActivate: [AuthGuard] ,component: TransferComponent },
      { path: 'accounts'  , canActivate: [AuthGuard] ,component: AccountsComponent },
      { path: 'history'   , canActivate: [AuthGuard] ,component: HistoryComponent },
    ]
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
