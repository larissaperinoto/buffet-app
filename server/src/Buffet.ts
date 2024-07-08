import { Scale } from "./Scale";

export class Buffet {
  constructor(
    public perKgPrice: number,
    public openPrice: number,
    public scaleList: Scale[]
  ) {}
}
