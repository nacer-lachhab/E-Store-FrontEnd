import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  getErrorMessage(field_name: string,error: ValidationErrors) {
    if(error['required']){
      return field_name + " is required";
    }else if(error['minlength']){
      return (field_name+" should contain at least " + 
      error['minlength']['requiredLength']+
      " Characters.");
    }else if(error['min']){
      return (field_name+" should be superior than "+error['min']['min']);
    }else return "";
  }

  productFormGroup!:FormGroup;

  constructor(private fb:FormBuilder,
              private productService:ProductService,
              private router:Router) { }

  handleAddProduct(){
    let listProducts=this.productService.products;
    let formGroupValues = this.productFormGroup.value;
    this.productService.valuesToProduct(formGroupValues).subscribe({
      next:(addProduit)=>{
        console.log("next after subscribing");
        console.log(typeof(addProduit));//it works butwhy type is undifined???????
        listProducts.push(addProduit);
        let x= -1;
        let result = listProducts.find(e=>{
          return (e.name== this.productFormGroup.value['name'])});
          console.log('0000000');
          console.log(JSON.stringify(result));
          console.log('0000000');
          if(result!=undefined){
            alert("product added successfuly...");
            this.router.navigateByUrl('/admin/products');
          }else alert('problemmmmme, add product failed....')
      }
    });
    
    
  }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      price:this.fb.control(null,Validators.required),
      quantite:this.fb.control(null,[Validators.required,Validators.min(1)]),
      promotion:this.fb.control(false)
    });
  }

}
