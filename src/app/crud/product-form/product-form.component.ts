import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm!: FormGroup;

  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createProductForm();
  }

  createProductForm(){
    this.productForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      'description': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      'price': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(8)]]
    });
  }

  createProduct(values: any, isUpdate: boolean){
    console.log(values)
    let formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);
    if(isUpdate){

    } else {
      this.crudService.createProduct(formData).subscribe(res => {
        if(res.result == 'success'){
          this.router.navigate(['/crud/product-list']);
        }
      });
    }
  }

}
