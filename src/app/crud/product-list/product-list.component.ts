import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  columnDefs = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' }
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Toyota', model: 'Yaris', price: 12000 },
    { make: 'Peujot', model: '106', price: 25000 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
