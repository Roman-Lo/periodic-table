import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { PeriodicTableComponent } from './components/periodic-table/periodic-table.component';
import { PeriodicTableElementComponent } from './components/periodic-table-element/periodic-table-element.component';

@NgModule({
  declarations: [
    AppComponent,
    PeriodicTableComponent,
    PeriodicTableElementComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
