export class Configuration {

  constructor(
    public name: string,
    public type?: string,
    public weight?: number,
    public wheelSize?: number,
    public incline?: number,
    public speed?: number,
    public power?: number,
    public volts?: number,
    public amperes?: number
  ) {  }

}
