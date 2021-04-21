import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Product/Models/order';
import { ChartServiceService } from 'src/app/_service/chart-service.service';
import { Charts } from '../ChartsModel/charts';

@Component({
  selector: 'app-line-charts',
  templateUrl: './line-charts.component.html',
  styleUrls: ['./line-charts.component.css']
})
export class LineChartsComponent implements OnInit {

  public _sal : Charts[];
  public lineChartLegend = false;
  public lineChartType = 'line';
  model:any=[];
  salesQty: any=[];
  salesAmt: any=[];
  constructor(private service :ChartServiceService) { }

  ngOnInit() {
    this._getPieChartPRDT(this.model);
  }

  // lineChart
  public lineChartData: Array<any> = [
    // { data: [5, 2, 7, 4, 5, 3, 5, 4], label: 'Iphone' },
    // { data: [2, 5, 2, 6, 2, 5, 2, 4], label: 'Ipad' }
  ];

  public lineChartLabels: Array<string> = [
    // '1',
    // '2',
    // '3',
    // '4',
    // '5',
    // '6',
    // '7',
    // '8',
  ];
  public lineChartData1: Array<any> = [
    // { data: [5, 2, 7, 4, 5, 3, 5, 4], label: 'Iphone' },
    // { data: [2, 5, 2, 6, 2, 5, 2, 4], label: 'Ipad' }
  ];

  public lineChartLabels1: Array<string> = [
    // '1',
    // '2',
    // '3',
    // '4',
    // '5',
    // '6',
    // '7',
    // '8',
  ];
  public lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  public lineChartColors: Array<Object> = [
    {
      // grey
      backgroundColor: 'rgba(41, 98, 255,0.1)',
      borderColor: '#98a6ad',
      pointBackgroundColor: '#98a6ad',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#98a6ad'
    },
    {
      // dark grey
      backgroundColor: 'rgba(116, 96, 238,0.1)',
      borderColor: '#2cabe3',
      pointBackgroundColor: '#2cabe3',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#2cabe3'
    }
  ];
  _getPieChartPRDT(model){

  this.service.GetPrdt(model).subscribe((res:any)=>{
    this._sal = res;
    this._sal.forEach((x)=>{
      this.lineChartLabels1.push(x.productName);
      this.salesQty.push(x.quantity);
      this.salesAmt.push(x.totalPrice);
    });    
    this.lineChartData1=[
      {data:this.salesQty,label:'Total Quantity'},
      { data:this.salesAmt,label:'Total Price'}
    ];
  });
  }

}
