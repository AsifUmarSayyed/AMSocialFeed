import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
signupForm!:FormGroup;
signupURL='http://localhost:3000/api/user'
  constructor(private router:Router,private formBuilder:FormBuilder,private http:HttpClient,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    
    });
  }
  signup(){
    this.http.post<any>(this.signupURL,this.signupForm.value).subscribe((data:any)=>{
      console.log(data);
      
      this.router.navigate(['/feed']);         
    this.toastr.success("Sign up successfully !!",data.message  )
  }
  ,(err)=>{
    this.toastr.error("Something went wrong","Bad request" )
    });
  }
}
