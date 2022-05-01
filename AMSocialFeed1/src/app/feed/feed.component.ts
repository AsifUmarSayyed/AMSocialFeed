import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
basicURL='http://localhost:3000/api/'
currentUser:any=[];
feed:any=[]
token:any=[];
  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit(): void {

 
    // if(localStorage.getItem('currentUser')){
    //   this.currentUser=JSON.parse(localStorage.getItem('currentUser')!)
    //   console.log(this.currentUser._id);
      
    // }
    if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token')!)
      console.log(this.token);

    }
    this.http.get<any>('http://localhost:3000/api/feed/',{headers:{"auth-token": this.token}}).subscribe((data:any)=>{
      this.token=data;
      
    })

  }

}
