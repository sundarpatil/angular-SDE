import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { AppComponent } from './app.component';
import { SDEDetailsComponent } from './sde/component/sde-details/sde-details.component';
import { SDEService } from './sde/services/sde.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    ListViewModule,
    DropDownsModule
  ],
  declarations: [AppComponent, SDEDetailsComponent],
  bootstrap: [AppComponent],
  providers: [SDEService]
})
export class AppModule {}
