import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,Route } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selected:any = null;
  backendLink: any;
  backendLink1: any;
 


  constructor(private http: HttpClient, private router: Router) { 
    
  }

  onfileselected(event:any){
    this.selected=<File>event.target.files[0]
    console.log(event)
    


  }
  onupload() {
    
    const fd = new FormData()
    fd.append('file',this.selected,this.selected.name);
    this.http.post("http://127.0.0.1:5003/hope",fd).subscribe((event)=>{
      console.log("file uploaded success");
    }); 
   // data quality report
    this.http.get('http://example.com/link').subscribe((response: any) => {
      this.backendLink = response.link;
    });
    // algorithm analyser
    this.http.get('http://example.com/link').subscribe((response: any) => {
      this.backendLink1= response.link;
    });
  }
  

  ngOnInit(): void {
  }
  

}
