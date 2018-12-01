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
          style({transform: 'translateY(-10%)', opacity: 0}), animate(200)
        ]),
        transition(':leave', [
          animate(200, style({transform: 'translateY(-10%)', opacity: 0}))
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
    this.configuration = new Configuration("config1", "Default", 100, 26, 0, 20, 20, 0, 48, 10, 0, 0, 0);
  }

  calculatePower(){
    return this.configuration.power = Math.floor((0.028 * this.configuration.speed) *( 0.55 * 0.55 * Math.pow((this.configuration.speed + 0), 2) + getRollingResistance(this.configuration.weight, this.configuration.incline) + (this.configuration.speed * 0.1 * Math.cos(gradeToRadians(this.configuration.incline)))));

    function gradeToRadians(grade) {
      return grade * Math.PI / 200;
    }
    function getRollingResistance(weight, incline){
        return (9.8 * weight * (0.005 * Math.cos(gradeToRadians(incline)) + (Math.sin(gradeToRadians(incline))))); 
      }
  }

  calculateEnergy(){
    return this.configuration.energy = Math.floor(this.configuration.distance/this.configuration.speed*this.configuration.power);
  }
  //  name: string,
  //  type?: string,
  //  weight?: number,
  //  incline?: number,
  //  wheelSize?: number,
  //  speed?: number,
  //  distance?: number,  
  //  power?: number,
  //  energy?: number,
  //  volts?: number,
  //  amperes?: number,
  //  serial?: number,
  //  parallel?: number,
  //  actualPower?: number,
  //  actualEnergy?: number,
}
