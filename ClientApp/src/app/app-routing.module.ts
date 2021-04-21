import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsHomeComponent } from './Charts/charts-home/charts-home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProductCartComponent } from './Product/product-cart/product-cart.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { ProductOrderComponent } from './Product/product-order/product-order.component';
import { LoginComponent } from './User/user/login/login.component';
import { RegisterComponent } from './User/user/register/register.component';
import { UserComponent } from './User/user/user.component';


const routes: Routes = [ 
{ path: '', component: ProductListComponent, pathMatch: 'full' },
{ path: 'home', component: ProductListComponent },
{ path: 'nav',component: NavMenuComponent},
{ path: 'counter', component: CounterComponent },
{ path: 'user', component: UserComponent,
  children: [
    { path: 'registration', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
  ]
},
{ path: 'carts',component: ProductCartComponent},
{ path: 'fetch-data', component: FetchDataComponent },
{ path: 'user', component: UserComponent},
{ path : 'orders', component:ProductOrderComponent},
{ path : 'charts-home', component: ChartsHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
