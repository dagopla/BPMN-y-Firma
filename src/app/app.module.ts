import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BpmnComponent } from './bpmn/bpmn.component';
import {  HttpClientModule } from '@angular/common/http';
import { FirmaComponent } from './firma/firma.component';

@NgModule({
  declarations: [
    AppComponent,
    BpmnComponent,
    FirmaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
