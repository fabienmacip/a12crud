import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm!: FormGroup;
  productId: any;
  sendButton = 'Créer';

  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createProductForm();
    let productId = '';
    if(this.activatedRoute.snapshot.params['productId']){
      productId = this.activatedRoute.snapshot.params['productId'];
      if(productId != ''){
        this.loadProductDetails(productId);
      }
    };

  }

  createProductForm(){
    this.productForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      'description': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      'price': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(8)]]
    });
  }

  loadProductDetails(productId: string){
    this.sendButton = 'Mettre à jour';
    this.crudService.loadProductInfo(productId).subscribe(res => {
      this.productForm.controls['name'].setValue(res.p_name);
      this.productForm.controls['description'].setValue(res.p_description);
      this.productForm.controls['price'].setValue(res.p_price);
      this.productId = res.p_id;
    });
  }

  createProduct(values: any){
    console.log(values)
    let formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);
    if(this.productId){
      formData.append('id', this.productId);
      this.crudService.updateProductInfo(formData).subscribe(res => {
        if(res.result == 'success'){
          this.navigateTo('/crud/product-list');
        }
      });
    } else {
      this.crudService.createProduct(formData).subscribe(res => {
        if(res.result == 'success'){
          this.navigateTo('/crud/product-list');
        }
      });
    }
  }

  navigateTo(route: any) {
    this.router.navigate([route]);
  }

}
