import { SerialPort, SerialPortOpenOptions } from "serialport";

export enum Units {
  KG = "kg",
  G = "g",
}

export class Scale {
  private serialPort: SerialPort;
  private unitOfMeasurement = "";
  private currentWeight = 0;
  private measuredSeconds = 0;
  private previosWeight = 0;

  constructor(
    serialPortConfig: SerialPortOpenOptions<any>,
    unitOfMeasurement: Units
  ) {
    this.serialPort = new SerialPort(serialPortConfig, (err) => {
      if (err) {
        return console.log(err.message);
      }
    });

    this.serialPort.on("data", (data) => {
      this.previosWeight = this.currentWeight;
      const floatWeight = parseFloat(new Buffer(data).toString());
      this.currentWeight = Math.round(floatWeight * 100000) / 100000;
    });
    this.unitOfMeasurement = unitOfMeasurement;
  }

  private convertToKg(weight: number): number {
    return Math.round((weight / 1000) * 100000) / 100000;
  }

  public getCurrentWeight(): number {
    if (this.unitOfMeasurement === Units.G) {
      return this.convertToKg(this.currentWeight);
    }

    return this.currentWeight;
  }

  public getPreviousWeight(): number {
    if (this.unitOfMeasurement === Units.G) {
      return this.convertToKg(this.previosWeight);
    }

    return this.previosWeight;
  }

  public setPreviosWeight(weight: number): void {
    this.previosWeight = weight;
  }

  public getMeasuredSeconds(): number {
    return this.measuredSeconds;
  }

  public setMeasuredSeconds(seconds: number): void {
    this.measuredSeconds = seconds;
  }
}
