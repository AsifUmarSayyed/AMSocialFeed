import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  passwordForm!:FormGroup;
  currentUser:any=[];
  changeURL='http://localhost:8080/login/changepwd/';
  UpdatedProfileURL='http://localhost:8080/profile/';
  token:any=[];
  username:any;
  constructor(private formBuilder:FormBuilder,private router:Router,private toastr: ToastrService,private http:HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')){
      this.currentUser=JSON.parse(localStorage.getItem('currentUser')!)
      console.log(this.currentUser._id);
      
    }
    if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token')!)
      console.log(this.token);

    }

    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      newpassword:  ['', Validators.required],
     verifypassword: ['', Validators.required],
    });

    this.http.get<any>(this.UpdatedProfileURL+this.currentUser._id).subscribe((data:any)=>{
      console.log(data);
      console.log(data.users.firstname);
      
      this.username=data.users.firstname+" "+data.users.lastname;
    })
  }
  changepassword(){
    // this.http.patch(this.changeURL+this.currentUser._id,this.passwordForm.value).subscribe((data:any)=>{
    //       console.log(data);
          
    //    })
     if(this.passwordForm.value.newpassword==this.passwordForm.value.verifypassword){
     console.log('hii');
    
      this.http.patch(this.changeURL+this.currentUser._id,{password:this.passwordForm.value.password,newpassword:this.passwordForm.value.newpassword}).subscribe((data:any)=>{
        console.log(data);
        this.toastr.success("Password changed successfully !!",data.message  )
      })
     }
    
    else{
      this.toastr.error("Password not match","Error" );
    }
    
  }
  Logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
