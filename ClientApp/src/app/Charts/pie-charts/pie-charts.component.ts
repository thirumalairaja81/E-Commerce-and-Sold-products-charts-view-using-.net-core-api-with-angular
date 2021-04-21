import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Product/Models/order';
import { ChartServiceService } from 'src/app/_service/chart-service.service';
import { Charts } from '../ChartsModel/charts';

@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.css']
})
export class PieChartsComponent implements OnInit {
   public _sal : Charts[];
  val : any =[{
    
  }]
  public pieChartLabels1:string[] = [];
    public pieChartData1:number[] = [];
    public pieChartLabels:string[] = [];
  
    
    public pieChartData:number[] = [];
    public pieChartType1:string ;
    public pieChartType:string ;
    constructor(private service : ChartServiceService) { }
  
    ngOnInit() {
      // this._getPieChartAMT(this._sal);
      this._getPieChartPRDT(this._sal);
    }
    // _getPieChartAMT(model){
    //   this.service.GetPieAMT(model).subscribe((result : any)=> {
    //     this._sal = result;
    //     console.log(this._sal);
    //     this._sal.forEach((element)=>{
    //        this.pieChartLabels.push(new Date(element.salesDate).toLocaleString('default', { month: 'short' }));
    //        this.pieChartData.push(element.salesAmount);
    //        this.pieChartType = 'pie';
    //     });
    //   } )
    // }
    _getPieChartPRDT(model){
      this.service.GetPrdt(model).subscribe((result : any)=> {
        this._sal = result;
        console.log(this._sal);
        this._sal.forEach((element)=>{
           this.pieChartLabels1.push(element.productName);
           this.pieChartData1.push(element.totalPrice);
           this.pieChartType = 'pie';
        });
        console.log(this.pieChartData1);
      } );
    }
    // events
    public chartClicked(e:any):void {
      console.log(e);
    }
   
    public chartHovered(e:any):void {
      console.log(e);
    }
  
  }