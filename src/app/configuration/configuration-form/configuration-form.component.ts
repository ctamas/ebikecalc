import { Component, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { Configuration } from "../configuration.model";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.css']
})
export class ConfigurationFormComponent implements OnInit {
  configuration: Configuration;
  constructor() { }

  ngOnInit() {
    this.newConfiguration();
    console.log("ConfigFormComponent init");
    console.log("Configurations ", this);
  }

  newConfiguration() {
    this.configuration = new Configuration(12);
  }

}
