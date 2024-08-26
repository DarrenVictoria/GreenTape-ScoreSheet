import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MemberRowComponent } from './member-row/member-row.component';
import { MemberTableComponent } from './member-table/member-table.component';
import { PopupComponent } from './popup/popup.component';
import { SupplierComponentComponent } from './supplier-component/supplier-component.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { CommitteeService } from './services/committee.service';
import { InMemoryDbService } from './services/in-memory-db.service';
import { CommitteeConverter } from './convertors/committee.converter.service';

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
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CommitteeService,
    InMemoryDbService,
    CommitteeConverter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
