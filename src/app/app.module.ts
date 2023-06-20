import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './app/header/header.component';
import { FooterComponent } from './app/footer/footer.component';
import { SiderbarComponent } from './app/siderbar/siderbar.component';
import { HomeComponent } from './app/home/home.component';
import { PageComponent } from './app/page/page.component';
import { Page2Component } from './app/page2/page2.component';
import { NgxCanvasModule } from 'ngx-canvas';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './app/login/login.component';
import { FormsModule } from '@angular/forms';
import { HistogramComponent } from './histogram/histogram.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SiderbarComponent,
    HomeComponent,
    PageComponent,
    Page2Component,
    LoginComponent,
    HistogramComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxCanvasModule.forRoot(),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
