import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users : User[] = [];
  authenticatedUser : User | undefined;

  constructor() {
    this.users.push({userId:UUID.UUID(),userName:'user1',password:'0000',roles:['USER']}),
    this.users.push({userId:UUID.UUID(),userName:'nacer',password:'nacer',roles:['ADMIN']}),
    this.users.push({userId:UUID.UUID(),userName:'admin',password:'admin',roles:['ADMIN','USER']})
  }

  public loginService(userName:string,password:string):Observable<User>{
    let foundUser=this.users.find(u=>u.userName==userName);
    if(!foundUser) {
      return throwError(()=>new Error("User Not Found"));
    }
    if(foundUser.password!=password) {
      return throwError(()=>new Error("Password Mismaching!!!"));
    }
    return of(foundUser);
  }

  public authenticateUser(user:User):Observable<boolean>{
    this.authenticatedUser=user;
    localStorage.setItem("authUser",JSON.stringify({userName:user.userName,roles:user.roles,jwt:"JWT_TOKEN"}));
    return of(true);
  }

  public isAuthenticated():boolean{
    return this.authenticatedUser!=undefined;
  }

  public hasRole(role:string):boolean//Observable<boolean>
  {
    //if(!this.authenticatedUser) return throwError(()=>new Error("undifined authenticatedUser!!!"));
    return this.authenticatedUser!.roles.includes(role);
  }

  public logout():Observable<boolean>{
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }
}
