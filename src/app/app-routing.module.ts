import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { CostumersComponent } from './costumers/costumers.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './login/login.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path : "", component:LoginComponent},
  {path : "login", component:LoginComponent},
  {path : "admin", component:AdminTemplateComponent,canActivate:[AuthenticationGuard],children:[
    {path : "products", component:ProductsComponent},
    {path : "costumers", component:CostumersComponent},
    {path : "newProduct", component:NewProductComponent},
    {path : "editProduct/:id", component:EditProductComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
