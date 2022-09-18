import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  columnDefs = [
    { field: 'p_name',
      headerName: 'Nom',
      sortable: true,
      headerClass: 'header-cell' },
    { field: 'p_description',
      headerName: 'Description',
      sortable: true,
      headerClass: 'header-cell' },
    { field: 'p_price',
      headerName: 'Prix',
      sortable: true,
      headerClass: 'header-cell' },
    { field: '',
      headerName: 'Actions',
      headerClass: 'header-cell',
      width: 250,
      cellRenderer: this.actionRender }
  ];

  rowData: any = [];
  gridOptions = {
    rowHeight: 50
  }

  productList: any = [];
  productListSubscribe: any;

  constructor(
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productListSubscribe = this.crudService.loadProducts().subscribe(res => {
      this.productList = res;
      this.rowData = res;
    })
  }

  actionRender() {
    let div = document.createElement('div');
    let htmlCode = '<button type="button" class="btn btn-success">Voir</button>\n' +
    '<button type="button" class="btn btn-warning">Modifier</button>\n' +
    '<button type="button" class="btn btn-danger">Effacer</button>\n';
    div.innerHTML = htmlCode;
    return div;
  }

}
