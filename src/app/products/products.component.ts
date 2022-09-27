import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../model/product';
import { AuthenticationService } from '../services/authentication.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products !: Array<Product>;
  productsOfPage !: Array<Product>;
  currentPage:number=0;
  size:number=5;
  totalPages:number=0;
  errorMessage !: string;
  searchFormGroup !: FormGroup;
  wordSearch:string='';
  modeSearch:boolean = false;
  
  getAllProducts(){
    this.productService.get().subscribe({
      next:data=>{
        this.products=data;
        //console.log(this.products);
      },//fin next
      error:(err)=>{
        this.errorMessage=err;
        console.log(this.errorMessage);
      }
    });
  }

  getPageOfProducts(){
    this.productService.getPageProducts(this.currentPage,this.size).subscribe({
      next:data=>{
        //console.log(data);
        this.products=data.products;
        //console.log(this.products);
        this.totalPages=data.totalPages;
        //console.log(this.totalPages);
      }
    });
  }

  deleteProduct(p:Product){
    let confirmation=confirm("sure you want delete this element!!");
    if(confirmation==false) return;
    //confirm() : equivalent a alert().
    this.productService.removeProduct(p).subscribe();
    this.goToPage(this.currentPage);
  }

  handelPromotion(p:Product){
    let confirmation=confirm("sure you want change Promotion status of this element!!");
    if(confirmation==false) return;
    let promoTemp = p.promotion;
    this.productService.changePromoStatus(p).subscribe({
      next:()=>{
       p.promotion=!promoTemp; 
      },
      error:err=>{
        this.errorMessage=err;
      }
    });
  }

  submitSearchProducts(){
    this.currentPage=0;
    this.handelSearchProducts();
  }

  handelSearchProducts(){
    //if(this.modeSearch==false) this.currentPage=0;
    this.wordSearch=this.searchFormGroup.value.keyword;//depuis formControlName

    console.log(this.wordSearch);
    console.log("heeeere   current page is:");
    console.log(this.currentPage);

    this.productService.searchByName(this.wordSearch,this.currentPage,this.size).subscribe({
      next:(data)=>{
        let index = this.currentPage*this.size;
        console.log("*****");
        console.log(data.products);
        console.log("*****");
        this.products=data.products;
        console.log(this.products);
        this.totalPages=data.totalPages;
      }
    });
  }

  goToPage(x:number){
    this.currentPage=x;

    if(this.wordSearch==='') this.modeSearch=false;
    else  this.modeSearch=true;

    if(this.modeSearch==false) this.getPageOfProducts();
    else this.handelSearchProducts();
  }

  constructor(private productService:ProductService,
              private fb:FormBuilder,
              public authService:AuthenticationService) {}

  ngOnInit(): void {
    this.getPageOfProducts();
    
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null)
    });
  }
}
