import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CostumersComponent } from './costumers/costumers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CostumersComponent,
    LoginComponent,
    AdminTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, /*gere le routage*/
    ReactiveFormsModule /* Reactive Forms pour une meilleur gestion de forms sur angular */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
