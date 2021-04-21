import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  myAppUrl = 'http://localhost:62873/';
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  } 
_register(model){
  debugger;
  return this._http.post(this.myAppUrl + 'api/Account/Register',model);
}
  GetProductList(model : any){
    debugger;
    return this._http.get<any>(this.myAppUrl + 'api/ProductList' , model);  
  }
  AddCart(id : number){
    debugger;
  return this._http.post(this.myAppUrl+ 'api/Application/AddedCart',id);
  }
  DeleteCart(cartid : number): Observable<any>{
    debugger;
    return this._http.delete(this.myAppUrl+ 'api/Application/DeletedCart/'+cartid);
  }
  EditCart(model : any){
    debugger;
    return this._http.put(this.myAppUrl+'api/Application/EditedCart',model);
  }
  AddOrder(id : number){
    debugger;
    return this._http.post(this.myAppUrl+ 'api/Application/CreateOrder',id);

  }
  OrderedList(model : any,id){
    debugger;
    return this._http.get<any>(this.myAppUrl+'api/Application/OrderedList/'+id,model);
  }
  GetCart(model : any,id): Observable<any>{
    debugger;
      //return this._http.get<any>(this.myAppUrl+ 'api/Application/CartList/'+id,{model},httpOptions);
    return this._http.get<any>(this.myAppUrl+ 'api/Application/CartList/'+id,model);  
  }
  GetTotal(Total : any,id){
    return this._http.get<any>(this.myAppUrl+ 'api/Application/GetTotal/'+id,Total)
  }
  GetCount(Count : any,id){
    return this._http.get<any>(this.myAppUrl+ 'api/Application/GetCount/'+id,Count)
  }
}
