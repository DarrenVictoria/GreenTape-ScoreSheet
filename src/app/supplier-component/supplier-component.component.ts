// src/app/supplier-component/supplier-component.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-supplier-component',
  templateUrl: './supplier-component.component.html',
  styleUrls: ['./supplier-component.component.css']
})
export class SupplierComponentComponent {
  @Input() member: any;
  @Input() category: any;
  @Input() section: any;
}