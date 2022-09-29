import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId !: string;
  productToEdit !:Product;
  productFormGroup !:FormGroup;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private productService:ProductService,
              private fb:FormBuilder) { 
    this.productId= route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe({
      next:(productById)=>{
        this.productToEdit=productById,
        console.log(this.productToEdit);
        this.productFormGroup=this.fb.group({
          //id:this.fb.control(this.productToEdit.id),
          name:this.fb.control(this.productToEdit.name,[Validators.required,Validators.minLength(4)]),
          price:this.fb.control(this.productToEdit.price,Validators.required),
          quantite:this.fb.control(this.productToEdit.quantite,[Validators.required,Validators.min(1)]),
          promotion:this.fb.control(this.productToEdit.promotion)
        });
      },
      error:(err)=>console.log(err)
    });
  }

  handleUpdateProduct(){
    this.productToEdit = this.productFormGroup.value;
    this.productToEdit.id=this.productId;
    console.log('handleUpdateProduct started....');
    console.log(this.productFormGroup.value);
    console.log('rrrrrrr');
    this.productService.updateProduct(this.productToEdit).subscribe({
      next:()=>{
        alert('product updated successfuly...');
        this.router.navigateByUrl("/admin/products");
      },error:(err)=>{
        console.log('failed tu update the product');
      }
    });
  }

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
}
