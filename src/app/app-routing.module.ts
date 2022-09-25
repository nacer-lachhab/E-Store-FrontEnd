import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostumersComponent } from './costumers/costumers.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path : "products", component:ProductsComponent},
  {path : "costumers", component:CostumersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
