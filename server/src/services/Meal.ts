import { Buffet } from "./Buffet";
import { SocketService } from "./Socket";

export class Meal {
  private socket = new SocketService(3001);

  constructor(private buffet: Buffet) {}

  public detectMeal() {
    const orderSeconds = 4000;
    const time = 300;
    setInterval(() => {
      for (const scale of this.buffet.scaleList) {
        const currentWeight = scale.getCurrentWeight();
        let previousWeight = scale.getPreviousWeight();
        let measuredSeconds = scale.getMeasuredSeconds();

        if (previousWeight === currentWeight) {
          measuredSeconds = measuredSeconds += time;
        } else {
          measuredSeconds = 0;
        }

        scale.setMeasuredSeconds(measuredSeconds);

        const buffetType = this.generateBuffetType(currentWeight);
        const total = this.generateTotal(currentWeight);

        this.socket.emit("weight", JSON.stringify(currentWeight));
        this.socket.emit("buffetType", buffetType);
        this.socket.emit("total", total);

        const datetime = new Date().toLocaleString("pt-BR");

        if (measuredSeconds >= orderSeconds) {
          this.socket.emit(
            "meal",
            JSON.stringify({
              weight: currentWeight,
              buffetType,
              total,
              datetime,
            })
          );
          scale.setPreviosWeight(0);
          scale.setMeasuredSeconds(0);
        }
      }
    }, time);
  }

  private generateTotal(weight: number) {
    let total = 0;

    const totalPerKg = weight * this.buffet.perKgPrice;

    if (totalPerKg > this.buffet.openPrice) {
      total = this.buffet.openPrice;
    } else {
      total = totalPerKg;
    }

    return total.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
    });
  }

  private generateBuffetType(weight: number) {
    let buffetType = "";

    if (weight * this.buffet.perKgPrice > this.buffet.openPrice) {
      buffetType = "Buffet livre";
    } else {
      buffetType = "Buffet por quilo";
    }

    return buffetType;
  }
}
