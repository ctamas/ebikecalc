import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { ConfigurationFormComponent } from './configuration/configuration-form/configuration-form.component';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationFormComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
