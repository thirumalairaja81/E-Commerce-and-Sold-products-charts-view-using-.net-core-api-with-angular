import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartServiceService } from 'src/app/_service/chart-service.service';
import { Charts } from '../ChartsModel/charts';

@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.css']
})
export class BarChartsComponent implements OnInit {

  public _sal : Charts[];
  public model : any;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];
  public barChartData1: ChartDataSets[] = [];



  salesQty: any;
  salesAmt: any;

constructor(private service : ChartServiceService){}
 ngOnInit()
 {
   this.salesQty = [];
   this.salesAmt = [];
  
  this.service.GetPieAMT(this.model).subscribe((result : any)=> 
  {
    this._sal = result;
    this._sal.forEach((element)=>
    {
      this.barChartLabels.push(element.productName);
      this.salesQty.push(element.quantity);
      this.salesAmt.push(element.totalPrice);
    });
    this.barChartData = [
      { data:this.salesQty,label:'Total Quantity',backgroundColor:'#34a1eb',hoverBackgroundColor:'#34eb5c'},


    ];
    this.barChartData1 = [
   
      { data:this.salesAmt,label: 'Total Amount',backgroundColor:'#a7cacf',hoverBackgroundColor:'#eba234'}
    ];
    console.log(this.barChartData1);
    console.log( this.barChartData);
  });
 }

}
