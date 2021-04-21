import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { ProductService } from './_service/product.service';
import { LoginComponent } from './User/user/login/login.component';
import { RegisterComponent } from './User/user/register/register.component';
import { AuthenticationService } from './Auth/authetication.service';
import { UserComponent } from './User/user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthinterceptorInterceptor } from './Auth/auth.interceptor';
import { ProductCartComponent } from './Product/product-cart/product-cart.component';
import { ProductOrderComponent } from './Product/product-order/product-order.component';
import { ChartsHomeComponent } from './Charts/charts-home/charts-home.component';
import { PieChartsComponent } from './Charts/pie-charts/pie-charts.component';
import { ChartsModule,ThemeService} from 'ng2-charts';
import { DoughnutChartsComponent } from './Charts/doughnut-charts/doughnut-charts.component';
import { BarChartsComponent } from './Charts/bar-charts/bar-charts.component';
import { LineChartsComponent } from './Charts/line-charts/line-charts.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProductListComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ProductCartComponent,
    ProductOrderComponent,
    ChartsHomeComponent,
    PieChartsComponent,
    DoughnutChartsComponent,
    BarChartsComponent,
    LineChartsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [ProductService,AuthenticationService,ThemeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthinterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
