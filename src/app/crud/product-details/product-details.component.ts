import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDetails!: Product;

  constructor(
    private crudService: CrudService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let productId = '';
    if(this.activatedRoute.snapshot.params['productId']){
      productId = this.activatedRoute.snapshot.params['productId'];
      if(productId != ''){
        this.loadProductDetails(productId);
      }
    };
  }

  loadProductDetails(productId: string){
    this.crudService.loadProductInfo(productId).subscribe(res => {
      this.productDetails = res;
    });
  }

}
