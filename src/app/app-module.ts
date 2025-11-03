import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AgGridModule } from 'ag-grid-angular';
import { AgChartsModule } from 'ag-charts-angular';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { EmployeeComponent } from './employee-dash/employee-component/employee-component';

@NgModule({
  declarations: [
    App,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule,
    AgChartsModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
