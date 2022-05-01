import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editprofile!:FormGroup;
  currentUser:any=[];
  token:any=[]
  UpdateURL='http://localhost:8080/edit-profile/';
  UpdatedProfileURL='http://localhost:8080/profile/';
  users:any=[];
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')){
      this.currentUser=JSON.parse(localStorage.getItem('currentUser')!)
      console.log(this.currentUser._id);
      
    }
    if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token')!)
      console.log(this.token);

    }
    this.editprofile = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      gender:['', Validators.required],
      dateofbirth: ['', Validators.required],
    biodata: ['', Validators.required],
    });

    this.http.get<any>(this.UpdatedProfileURL+this.currentUser._id).subscribe((data:any)=>{
      console.log(data);
    this.users=data.users;
    this.editprofile.patchValue(this.users);
  })
  }
updateUser(){
  console.log(this.editprofile.value);
  this.http.patch(this.UpdateURL+this.currentUser._id,this.editprofile.value).subscribe((data:any)=>{
    console.log(data);
    this.router.navigate(['/feed']);         
    this.toastr.success("Profile Edited successfully !!",data.message  )
  }
  ,(err)=>{
    this.toastr.error("Something went wrong !!","Bad request" )
    });
}
}
