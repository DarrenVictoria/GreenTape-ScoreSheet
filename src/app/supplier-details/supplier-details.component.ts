import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {
  supplierName: string;
  supplierDetails: any; // Replace 'any' with a proper interface for supplier details

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.supplierName = this.route.snapshot.paramMap.get('name');
    // Fetch supplier details using this.supplierName
    // You might want to use a service to fetch the details from an API
    this.supplierDetails = {}; // Replace with actual supplier details
  }
}