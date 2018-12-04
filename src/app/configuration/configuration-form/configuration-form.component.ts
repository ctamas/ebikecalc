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
          style({transform: 'translateX(30%)', opacity: 0}), animate(300)
        ]),
        transition(':leave', [
          animate(300, style({transform: 'translateX(30%)', opacity: 0}))
        ])
    ])
  ]
})

export class ConfigurationFormComponent implements OnInit {
  configuration: Configuration;
  columnsToDisplay = ['RPM', 'Speed', 'Torque', 'Wattage'];

  ngOnInit() {
    this.newConfiguration();
  }

  newConfiguration() {
    this.configuration = new Configuration("Default", 100, 26, 0, 30, 50, 3, 0, 0, 0, 0, 0, 0, 0);
  }

  calculateConfigPower() {
    return this.configuration.power = this.calculatePower(this.configuration.speed, this.configuration.incline,this.configuration.weight);
  }

  calculatePower(speed, incline, weight){
    return Math.ceil((0.028 * speed) *( 0.55 * 0.55 * Math.pow((speed + 0), 2) +
           getRollingResistance(weight, incline) + (speed * 0.1 * Math.cos(gradeToRadians(incline)))));

    function gradeToRadians(grade) {
      return grade * Math.PI / 200;
    }

    function getRollingResistance(weight, incline){
      return (9.8 * weight * (0.0051 * Math.cos(gradeToRadians(incline)) + (Math.sin(gradeToRadians(incline))))); 
    }
  }

  calculateEnergy(){
    return this.configuration.energy = Math.floor(this.configuration.distance/this.configuration.speed*this.configuration.power);
  }
  
  actualPower() {
    return Math.floor(this.configuration.actualPower = this.configuration.serial*3.6*this.configuration.parallel*10);
  }

  actualEnergy() {
    return Math.floor(this.configuration.actualEnergy = this.configuration.serial*this.configuration.parallel*11);
  }

  batteryWeight() {
    return parseFloat((this.configuration.serial*this.configuration.parallel*0.062).toFixed(1));
  }

  checkBatteryParameters() {
    return this.calculateConfigPower() < this.actualPower() && this.calculateEnergy() < this.actualEnergy()
  }

  gearingMethod() {
    if(this.configuration.type === 'Hub') {
      return '(coil turns)'
    } else if (this.configuration.type === 'Mid') {
      return '(reduction ratio)'
    }
  }

  batterySize() {
    if (!this.batteryWeight()) {
      return 'No';
    } else if (this.batteryWeight() >= 6) {
      return 'Big'
    } else if (this.batteryWeight() < 6)
      return 'Small'
  }

  getRPMfromKv() {
    return Math.floor(this.configuration.serial*3.6*(this.getMotorKv()/this.configuration.gearRatio));
  }

  getTopSpeed() {
    return Math.floor(Math.PI*this.getRPMfromKv()*this.configuration.wheelSize*0.0015814)
  }
  getTorque() {
    return Math.floor(this.configuration.parallel*10*this.getMotorKt()*this.configuration.gearRatio);
  }

  getMotorKv() {
    if(this.configuration.type !=='Default') {
      return this.configuration.type === 'Hub' ? hubMotorKv : midMotorKv;
    } else 
    return 0;
  }

  getMotorKt() {
    if(this.configuration.type !=='Default') {
      return this.configuration.type === 'Hub' ? hubMotorKt : midMotorKt;
    } else 
    return 0;
  }

  getPowerCheckString() {
    return this.configuration.power<this.configuration.actualPower ? 'Desired power is reached.' : 'Desired power is not reached. Try a larger battery or lower your speed.';
  }

  getEnergyCheckString() {
    return this.configuration.energy<this.configuration.actualEnergy ? 'Desired energy is reached.' : 'Desired energy is not reached. Try a larger battery or lower your range.';
  }

  getTopSpeedCheckString() {
    return this.configuration.speed<this.getTopSpeed() ? 'Desired trip speed is reached.' : 'Desired speed is not reached. Try a different gearing or increase battery voltage.';
  }

  calculateHubGearingTable() {  
    let result = [];
    if (this.configuration && this.configuration.type !== 'Default') {
      for (var i = 0; i < 10; i++) {
        result[i]={
          RPM: (i+1)*10 + '%',
          Speed: Math.floor(this.getTopSpeed() * (i+1)/10) + ' Kph',
          Torque: Math.floor(this.getTorque() * (10 - (i+1))/10) + ' Nm',
          Wattage: this.checkWattage(this.calculatePower(Math.floor(this.getTopSpeed() * (i+1)/10), 0, this.configuration.weight))
        }
      }
    }
    return result;
  }

  checkWattage(wattage) {
    return (wattage < this.actualPower() ? wattage + ' W' : "Unattainable!");
  }
}

// Store Kv and Kt
const hubMotorKv = 35.52;
const hubMotorKt = 0.268;
const midMotorKv = 26;
const midMotorKt = 0.364;
