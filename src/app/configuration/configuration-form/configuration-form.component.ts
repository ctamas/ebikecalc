import { Component, OnInit } from '@angular/core';
import { Configuration } from "../configuration.model";
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.css'],
  animations: [
    trigger('panelInOut', [
        transition(':enter', [
          style({opacity: 0}), animate(600)
        ]),
        transition(':leave', [
          animate(600, style({opacity: 0}))
        ])
    ])
  ]
})
export class ConfigurationFormComponent implements OnInit {
  configuration: Configuration;

  ngOnInit() {
    this.newConfiguration();
    console.log("ConfigFormComponent init");
    console.log("Configurations ", this);
  }

  newConfiguration() {
    this.configuration = new Configuration("config1", "Default", 100, 26, 0, 30, 500, 48, 10);
    this.calculate();
  }

  calculate(){
    console.log('calculate')
    this.configuration
    // P = (transmission losses) * Velocity * (0.5501 * 0.6 * Velocity * Velocity + Frg + Velocity * 0.1 * cos(B)
  }
  //  name: string,
  //  type?: string,
  //  weight?: number,
  //  incline?: number,
  //  wheelSize?: number,
  //  speed?: number,
  //  power?: number,
  //  volts?: number,
  //  amperes?: number
}
