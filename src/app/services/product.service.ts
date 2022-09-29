import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products! : Array<Product>;

  constructor() { 
    this.products = [
      {id:UUID.UUID(), name:"pc hp",price:6500,quantite:10,promotion:true},
      {id:UUID.UUID(), name:"pc dell",price:6000,quantite:15,promotion:false},
      {id:UUID.UUID(), name:"pc azus",price:6300,quantite:17,promotion:true},
      {id:UUID.UUID(), name:"printer",price:1500,quantite:20,promotion:true},
      {id:UUID.UUID(), name:"smart phone",price:5500,quantite:60,promotion:false}
    ];

    for (let i=0;i<30;i++){
      this.products.push({id:UUID.UUID(), name:"pc X"+i,price:i*1000,quantite:i*i,promotion:true});
      this.products.push({id:UUID.UUID(), name:"printer X"+i,price:i*500,quantite:10*i,promotion:false});
      this.products.push({id:UUID.UUID(), name:"smart phone Z"+i,price:i*400,quantite:i*10,promotion:true});
    }
  }

  public get():Observable<Product[]>{
    //let rnd=Math.random();
    //console.log(rnd);
    //if(rnd<0.05) return throwError(()=>new Error("internet connexion error!!"));
    //else return
    return of([...this.products]);
  }

  public getPageProducts(page:number,size:number):Observable<PageProduct>{
    let index =page*size;

    let totalPages = ~~(this.products.length/size);//division entiere
    console.log(totalPages);
    
    if((this.products.length%size)!=0) totalPages++;
    let productsInPage=this.products.slice(index,index+size);
    console.log(this.products);
    return of({products:productsInPage,page:page,size:size,totalPages:totalPages});//type:value
  }

  public removeProduct(p:Product):Observable<boolean>{
    let index = this.products.indexOf(p);
    console.log(this.products);
    console.log("deleating ....")
      //console.log("Product to Delete");
      //console.log(this.products[index]);
    let d=this.products.splice(index,1);
    console.log("deleatd:");
    console.log(d);
    //this.products=this.products.filter(pi=>{
     // return pi.id!==p.id});
    console.log(this.products);
      //console.log("Result after Delete:");
      //console.log(this.products);
    return of(true);
  }

  public changePromoStatus(p: Product):Observable<boolean> {
    let index = this.products.indexOf(p);
    if(index!=undefined){
      p.promotion= !(p.promotion);
      return of(true);
    }else{
      return throwError(()=>new Error("Product Not Found!!!"))
    }
  }

  public searchByName(keyword:string,numPage:number,size:number):Observable<PageProduct>{
    let result=this.products.filter(pr=>pr.name.toLocaleLowerCase().includes(keyword.toLowerCase()));
    let totalPages = ~~(result.length/size);
    if((result.length%size)!=0) totalPages++;
    let index = numPage*size;
    result=result.slice(index,index+size);
    return of({products:result,page:numPage,size:size,totalPages:totalPages});
    //return of(result);
  }

  valuesToProduct(x:any):Observable<Product>{
    console.log("valuesToProduct called");
    let p:Product={id:UUID.UUID(),name:x.name,price:x.price,quantite:x.quantite,promotion:x.promotion};
    console.log("tototto11");
    console.log(typeof(p));
    console.log('tototto22');
    return of(p);
  }

  getProductById(id:string):Observable<Product>{
    let product=this.products.find(e=>e.id==id);
    if(product!=undefined) return of(product);
    else return throwError(()=>new Error("no Product with this id found"));
  }

  updateProduct(newProductValue:Product):Observable<boolean>{
    console.log('updateProduct called');
    console.log('..........');
    console.log(newProductValue);
    console.log('.........');
    
    let productToUpdate=this.products.find(p=>p.id==newProductValue.id);
    if(productToUpdate!=undefined){
      let index = this.products.indexOf(productToUpdate);
      this.products[index]=newProductValue;
      console.log('hahahahah');
      
      console.log(newProductValue);
      console.log('*******');
      console.log(this.products);
      console.log('*******');
      return of(true)
    }else{
      console.log('bleeeeeemmme');
      
      return throwError(()=>new Error('Product to update not found...'));
    }
  }
}
