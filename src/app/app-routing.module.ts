import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { PageComponent } from './app/page/page.component';
import { HistogramComponent } from './histogram/histogram.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'map', component: PageComponent },
  // { path: 'histogram', component: HistogramComponent },
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  { path: '**', redirectTo: 'map', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
