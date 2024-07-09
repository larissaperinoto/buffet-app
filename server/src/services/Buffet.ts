import { Scale } from "./Scale";

export class Buffet {
  constructor(
    private perKgPrice: number,
    private openPrice: number,
    private scaleList: Scale[]
  ) {}

  getPerKgPrice(): number {
    return this.perKgPrice;
  }

  getOpenPrice(): number {
    return this.openPrice;
  }

  getScaleList(): Scale[] {
    return this.scaleList;
  }
}
