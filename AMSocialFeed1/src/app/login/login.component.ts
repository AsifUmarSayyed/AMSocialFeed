import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
loginForm!:FormGroup;
token:any;
loginURL='http://localhost:3000/api/user/login'
  constructor(private formBuilder:FormBuilder,private router:Router,private http:HttpClient,private toastr: ToastrService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    
    });
  }
login(){
  if (this.loginForm.invalid) {
    for (const control of Object.keys(this.loginForm.controls)) {
      this.loginForm.controls[control].markAsTouched();
    }
    return;
  }
  this.http.post<any>(this.loginURL,this.loginForm.value).subscribe((data:any)=>{
    console.log(data);
    this.token=data.token;
    localStorage.setItem('token',JSON.stringify(this.token));
    localStorage.setItem('currentUser',JSON.stringify(data.currentUser));
    
    this.router.navigate(['/feed']);         
    this.toastr.success("Logged in successfully !!",data.message  )
  }
  ,(err)=>{
    this.toastr.error("Login invalid","Bad request" )
    });
  //   if(data){
  //     this.router.navigate(['/feed']);
  //     this.toastr.success("Logged in successfully !!",data.message  )
  //   }else{
  //     this.toastr.error("Something is wrong","Bad request" )
  //   }
  // })
}

signupWithGoogle(){
  this.socialAuthService?.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res) => {
        console.log(res);
        
      })
      .catch(err=>{
        console.log(err);
        
      });
}
}
