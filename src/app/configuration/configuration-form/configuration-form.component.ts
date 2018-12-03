import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Configuration } from "../configuration.model";
import { trigger, state, transition, style, animate } from '@angular/animations';

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
    ]),
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]), 
  ]
})
export class ConfigurationFormComponent implements OnInit {
  configuration: Configuration;
  dataSource = this.calculateHubGearingTable();
  columnsToDisplay = ['Gearing', 'Speed', 'Torque'];
  @Input('batteryComplete') public batteryComplete;
  @Input('CdkStep') public currentStep;

  @Output() public animationDone = new EventEmitter();
  ngOnInit() {
    this.newConfiguration();
    console.log("ConfigFormComponent init");
    console.log("Configurations ", this);

  }

  newConfiguration() {
    this.configuration = new Configuration("config1", "Default", 100, 26, 0, 30, 50, 3, 0, 0, 0, 0, 0, 0, 0);
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
    return this.calculatePower() < this.actualPower() && this.calculateEnergy() < this.actualEnergy()
  }

  batterySize() {
    if (!this.batteryWeight()) {
      return 'No';
    } else if (this.batteryWeight() >= 6) {
      return 'Big'
    } else if (this.batteryWeight() < 6)
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
  return this.configuration.speed<this.getTopSpeed() ? 'Desired speed is reached.' : 'Desired speed is not reached. Try a different gearing or increase battery voltage.';
}


calculateHubGearingTable() {
  let result = [];
  for (var i = 0; i < 8; i++) {
    result[i]={
      Gearing: 1,
      Speed: 222,
      Torque: 1.0079,
      description: 'gg'
      
    }
  }
  return result;
}
}
// Store Kv and Kt
const hubMotorKv = 35.52;
const hubMotorKt = 0.268;
const midMotorKv = 26;
const midMotorKt = 0.364;


