import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpProductsService {

  constructor(private http:HttpClient) {
    http.get<any>(this.link).subscribe({
      next : (data)=>this.productsDb=data
    });
   }
  link : string = "localhost:8080/api/v1/product/products";
  productsDb:any;
}
