import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MemberRowComponent } from './member-row/member-row.component';
import { MemberTableComponent } from './member-table/member-table.component';
import { PopupComponent } from './popup/popup.component';
import { SupplierComponentComponent } from './supplier-component/supplier-component.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';



const routes: Routes = [
  { path: 'score', component: MemberTableComponent },
  { path: '', redirectTo: '/score', pathMatch: 'full' },

];

@NgModule({
  declarations: [
    AppComponent,
    MemberRowComponent,
    MemberTableComponent,
    PopupComponent,
    SupplierComponentComponent,
    SupplierDetailsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
