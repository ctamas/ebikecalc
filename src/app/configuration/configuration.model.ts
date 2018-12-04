export class Configuration {

  constructor(
    public type?: string,
    public weight?: number,
    public wheelSize?: number,
    public incline?: number,
    public speed?: number,
    public distance?: number,
    public gearRatio?: number,
    public power?: number,
    public energy?: number,
    public volts?: number,
    public amperes?: number,
    public serial?: number,
    public parallel?: number,
    public actualPower?: number,
    public actualEnergy?: number
  ) {  }

}
