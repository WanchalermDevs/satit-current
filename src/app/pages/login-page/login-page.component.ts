import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerAnimation } from '../../utils/page.animation';
import { AuthService } from '../../service/users/auth.service';
import { LogedinGuard } from '../../guard/logedin.guard';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [routerAnimation]
})
export class LoginPageComponent implements OnInit {
  // Add router animation
  @HostBinding('@routerAnimation') routerAnimation = true;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    if(window.localStorage.getItem('token') != undefined){
      this.router.navigate(["/authorities/dashboard"]);
    }else{
      window.localStorage.clear();
      window.sessionStorage.clear();
    }
  }

  /**
   * Login method 
   * @param login
   * @param password
   */
  login(login, password) {
    this.auth.authentication(login, password).then(response => {
      // console.log(response);
      if (response['operation'] === "success") {
        // console.log(response);
        this.auth.getToken(response).then(resToken => {
          window.localStorage.setItem("token", resToken['token'].toString());
          this.router.navigate(["/authorities/dashboard"]);
        });
      } else {
        window.localStorage.clear();
        window.sessionStorage.clear();
      }
    });
  }


}
