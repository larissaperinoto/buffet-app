import { SerialPort } from "serialport";

enum Units {
  KG = "kg",
  G = "g",
}

export class Scale {
  private serialPort: SerialPort;
  private unitOfMeasurement = "";
  private currentWeight = 0;
  private measureSeconds = 0;
  private previosWeight = 0;

  constructor(
    serialPortConfig: Record<string, string>,
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

  private convertToKg(weight: number) {
    return Math.round((weight / 1000) * 100000) / 100000;
  }

  public getCurrentWeight() {
    if (this.unitOfMeasurement === Units.G) {
      return this.convertToKg(this.currentWeight);
    }

    +this.currentWeight;
  }

  public getPreviousWeight() {
    if (this.unitOfMeasurement === Units.G) {
      return this.convertToKg(this.previosWeight);
    }

    +this.previosWeight;
  }

  public getMeasureSeconds() {
    return this.measureSeconds;
  }

  public setMeasureseconds(seconds: number) {
    this.measureSeconds = seconds;
  }
}
