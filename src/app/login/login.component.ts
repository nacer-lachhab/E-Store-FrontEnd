import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userFormGroup!:FormGroup;
  errorMessage :any;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthenticationService,
    private router:Router) { }

  handleLoging(){
    let userName = this.userFormGroup.value.userName;
    let password = this.userFormGroup.value.password;
    this.authService.loginService(userName,password).subscribe({
      next:(appUser)=>{
        this.authService.authenticateUser(appUser).subscribe({
          next:()=>{
            this.router.navigateByUrl("/products");
          }
        });
      },
      error:(err)=>{
        this.errorMessage=err;
      }
    });
   }

  ngOnInit(): void {
    this.userFormGroup=this.formBuilder.group({
      userName:this.formBuilder.control('username'),//null ici est equivalent a ''
      password:this.formBuilder.control('00000')
    });
  }

}
