import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ChartData } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Color } from 'ng2-charts';

import { ChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-forecasting',
  templateUrl: './forecasting.component.html',
  styleUrls: ['./forecasting.component.css']
})
export class ForecastingComponent implements OnInit {
  type:any
  value:any
  postdata:any
  chart :any =[]
  result : any

  constructor(private http: HttpClient) { 
    Chart.register(...registerables); 

  }

  onpredicit(){
    console.log(this.type)
    console.log(this.value)
    this. postdata={
       period:this.type,
       target:this.value
    };
 
     this.http.post("http://127.0.0.1:5003/val",this.postdata).subscribe((res:any)=>{
     console.log(res);


   }); 
   console.log(this.type)
   console.log(this.value)
     
     }


  ngOnInit(): void {
    // forecasting backend connection
    this.http.get('http://my-backend-api.com/api/data').subscribe((data: any) => {
      this.result = data;
    });

        // line chart 
        const lineCanvasEle: any = document.getElementById('line_chart')
        const lineChar = new Chart(lineCanvasEle.getContext('2d'), {
          type: 'line',
            data: {
              labels: this.result,
              datasets: [
                { data: this.result,
                   label: 'Forecast Projection', 
                   borderColor: 'rgba(54, 162, 235)' },
    
              ],
            },
            options: {
              responsive: true,
              scales: {
                  y: {
                      
                      beginAtZero: true
                  }
              }
            }
          });
       // Bar chart
          const barCanvasEle: any = document.getElementById('bar_chart')
          const barChart = new Chart(barCanvasEle.getContext('2d'), {
            type: 'bar',
              data: {
                labels: this.result.period,
                datasets: [{
                  label: 'Sales',
                  data: this.result.target,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                  borderWidth: 1
                }]
              },
              options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
              }
            });
    

    
  }

}
