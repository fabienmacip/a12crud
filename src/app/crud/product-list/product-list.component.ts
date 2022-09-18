import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';

declare const Swal: any;
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
      headerClass: 'header-cell',
      cellRenderer: this.priceCellRender.bind(this) },
    { field: '',
      headerName: 'Actions',
      headerClass: 'header-cell',
      width: 250,
      cellRenderer: this.actionRender.bind(this) }
  ];

  rowData: any = [];
  gridOptions = {
    rowHeight: 50
  }

  productList: any = [];
  productListSubscribe: any;

  constructor(
    private crudService: CrudService,
    private router: Router
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

  actionRender(params: any) {
    let div = document.createElement('div');
    let htmlCode = '<button type="button" class="btn btn-success">Voir</button>\n' +
    '<button type="button" class="btn btn-warning">Modifier</button>\n' +
    '<button type="button" class="btn btn-danger">Effacer</button>\n';
    div.innerHTML = htmlCode;
    let viewButton = div.querySelector('.btn-success');
    viewButton?.addEventListener('click', () => {
      this.viewProductDetails(params);
    });
    let editButton = div.querySelector('.btn-warning');
    editButton?.addEventListener('click', () => {
      this.editProductDetails(params);
    });
    let deleteButton = div.querySelector('.btn-danger');
    deleteButton?.addEventListener('click', () => {
      this.deleteProduct(params);
    });

    return div;
  }

  viewProductDetails(params: any){
    this.router.navigate(['/crud/view-product-details/' + params.data.p_id])
  }

  editProductDetails(params: any){
    this.router.navigate(['/crud/update-product/' + params.data.p_id])
  }

  priceCellRender(params: any){
    return params.data.p_price + ' €';
  }

  deleteProduct(params: any){
    const that = this;
    Swal.fire({
      title: 'Etes-vous sûr(e) de vouloir effacer ce produit ?',
      text: "Cette opération est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, effacer !'
    }).then((result: any) => {
      if (result.isConfirmed) {
        that.crudService.deleteProduct(params.data.p_id).subscribe(res => {
          if(res.result === 'success'){
            this.getProductList();
            Swal.fire(
              'Effacé !',
              'Ce produit a été effacé',
              'success'
            )
          }
        });
      }
    })
  }
}
