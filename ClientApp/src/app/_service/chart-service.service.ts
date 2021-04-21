import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  myAppUrl = 'http://localhost:62873/';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  GetPieAMT(model : any){
     debugger;
    return this._http.get<any>(this.myAppUrl + 'api/Application/OrderByDate',model);  
  }
  GetPrdt(model : any){
   debugger;
    return this._http.get<any>(this.myAppUrl + 'api/Application/OrderByDate',model);  
  }
}
