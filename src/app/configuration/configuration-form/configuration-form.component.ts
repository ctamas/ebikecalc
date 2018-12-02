import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Configuration } from "../configuration.model";
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.css'],
  animations: [
    trigger('panelInOut', [
        transition(':enter', [
          style({transform: 'translateY(-10%)', opacity: 0}), animate(300)
        ]),
        transition(':leave', [
          animate(300, style({transform: 'translateY(-10%)', opacity: 0}))
        ])
    ])
  ]
})
export class ConfigurationFormComponent implements OnInit {
  configuration: Configuration;

  @Input('CdkStep') public currentStep;
  @Output() public animationDone = new EventEmitter();
  ngOnInit() {
    this.newConfiguration();
    console.log("ConfigFormComponent init");
    console.log("Configurations ", this);

  }

  newConfiguration() {
    this.configuration = new Configuration("config1", "Default", 100, 26, 0, 30, 50, 0, 48, 10, 0, 0, 0);
  }

  calculatePower(){
    return this.configuration.power = Math.floor((0.028 * this.configuration.speed) *( 0.55 * 0.55 * Math.pow((this.configuration.speed + 0), 2) +
           getRollingResistance(this.configuration.weight, this.configuration.incline) + (this.configuration.speed * 0.1 * Math.cos(gradeToRadians(this.configuration.incline)))));

    function gradeToRadians(grade) {
      return grade * Math.PI / 200;
    }
    function getRollingResistance(weight, incline){
        return (9.8 * weight * (0.0051 * Math.cos(gradeToRadians(incline)) + (Math.sin(gradeToRadians(incline))))); 
      }
  }

  
  calculateEnergy(){
    console.log(this.currentStep);
    return this.configuration.energy = Math.floor(this.configuration.distance/this.configuration.speed*this.configuration.power);
  }
  
  actualPower() {
    return Math.floor(this.configuration.actualPower = this.configuration.serial*3.6*this.configuration.parallel*10);
  }

  actualEnergy() {
    return Math.floor(this.configuration.actualEnergy = this.configuration.serial*this.configuration.parallel*11);
  }

  public batteryWeight() {
    return (this.configuration.serial*this.configuration.parallel*0.062).toFixed(1);
  }

  batterySize() {
    if (!parseFloat(this.batteryWeight())) {
      return 'No';
    } else if (parseFloat(this.batteryWeight()) >= 6) {
      return 'Big'
    } else if (parseFloat(this.batteryWeight()) < 6)
      return 'Small'
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
