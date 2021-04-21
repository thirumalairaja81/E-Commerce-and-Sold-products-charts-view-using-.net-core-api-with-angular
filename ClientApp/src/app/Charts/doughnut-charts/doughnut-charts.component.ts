import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartServiceService } from 'src/app/_service/chart-service.service';
import { Charts } from '../ChartsModel/charts';

@Component({
  selector: 'app-doughnut-charts',
  templateUrl: './doughnut-charts.component.html',
  styleUrls: ['./doughnut-charts.component.css']
})
export class DoughnutChartsComponent implements OnInit {

  public _sal : Charts[];
  salesQty: any=[];
  salesAmt: any=[];
  salesQty1: any=[];
  salesAmt1: any=[];
  value: any;
  c: any=[];
  d:any=[];
  salesDate: any=[];
  ngOnInit(){
    this._getData(this.value);
    this._getTotalData(this._sal);
  }
  constructor(private service : ChartServiceService){}
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels1: Label[] = [];
  public doughnutChartData1: MultiDataSet = [];
  public doughnutChartType1: ChartType = 'doughnut';

  _getData(value){
   this.service.GetPieAMT(value).subscribe((result :any)=>{
   this._sal = result;
    this._sal.forEach((x)=>{
      this.doughnutChartLabels.push(x.productName);
      this.salesAmt.push(x.totalPrice);
      this.salesQty.push(x.quantity);
      // this.salesDate.push(x.salesDate);
   });
  
    for(let i=0;i<this.doughnutChartLabels.length;i++) {
      let a = this.salesQty[i];
      let arr= [];
      arr.push(a);
      this.c.push(arr)
    }
      for(let j=0;j<this.doughnutChartLabels.length;j++)
   {
        let b = this.salesAmt[j];
        let array =[];
        array.push(b);
        this.d.push(array);
    }
    
    // console.log(this.d);
    // console.log(this.c);
    this.doughnutChartData= JSON.parse(JSON.stringify([this.c,this.d]))

    // console.log(this.doughnutChartData)
    });
  }
  _getTotalData(value){
    this.service.GetPrdt(value).subscribe((result :any)=>{
    this._sal = result;
     this._sal.forEach((x)=>{
       this.doughnutChartLabels1.push(x.productName);
      // this.salesAmt1.push(x.salesAmount);
       this.salesQty1.push(x.quantity);
     console.log(this.doughnutChartLabels1);
     console.log(this.salesAmt1);
     console.log( this.salesQty1);
    });
   
    
     this.doughnutChartData1= ([this.salesQty1, this.salesAmt1])
 
     console.log(this.doughnutChartData1)
     });
  }

}
