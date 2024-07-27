import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MemberRowComponent } from './member-row/member-row.component';
import { MemberTableComponent } from './member-table/member-table.component';
import { PopupComponent } from './popup/popup.component';
import { SupplierComponentComponent } from './supplier-component/supplier-component.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';


@NgModule({
  declarations: [
    AppComponent,
    MemberRowComponent,
    MemberTableComponent,
    PopupComponent,
    SupplierComponentComponent,
    SupplierDetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
