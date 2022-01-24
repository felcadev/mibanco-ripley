import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';


import { PayeeComponent } from './payee/payee.component';
import { TransferComponent } from './transfer/transfer.component';
import { HistoryComponent } from './history/history.component';
import { ComponentsModule } from '../components/components.module';
import { PageComponent } from './page.component';
import { AuthRoutingModule } from '../auth/auth.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountsComponent } from './accounts/accounts.component';




@NgModule({
  declarations: [
    PayeeComponent,
    TransferComponent,
    HistoryComponent,
    PageComponent,
    AccountsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    PagesRoutingModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports: [
    PayeeComponent,
    TransferComponent,
    HistoryComponent,
    PageComponent,
    ReactiveFormsModule,
    FormsModule,
  ]
})

export class PageModule { }
