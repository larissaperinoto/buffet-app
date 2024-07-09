import { Buffet } from "./Buffet";
import { SocketService } from "./Socket";

enum BuffetCategories {
  PER_KG = "Buffet por quilo",
  OPEN = "Buffet livre",
}

export class Meal {
  private socket = new SocketService(
    +(process.env.SOCKET_PORT as string) ?? 3001
  );

  constructor(private buffet: Buffet) {}

  public detectMeal() {
    const orderSeconds = +(process.env.DETECTION_INTERVAL as string) ?? 4000;
    const interval = 300;
    setInterval(() => {
      for (const scale of this.buffet.getScaleList()) {
        const currentWeight = scale.getCurrentWeight();
        let previousWeight = scale.getPreviousWeight();
        let measuredSeconds = scale.getMeasuredSeconds();

        if (previousWeight === currentWeight) {
          measuredSeconds = measuredSeconds += interval;
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
    }, interval);
  }

  private generateTotal(weight: number) {
    let total = 0;

    const totalPerKg = weight * this.buffet.getPerKgPrice();

    if (totalPerKg > this.buffet.getOpenPrice()) {
      total = this.buffet.getOpenPrice();
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

    if (weight * this.buffet.getPerKgPrice() > this.buffet.getOpenPrice()) {
      buffetType = BuffetCategories.OPEN;
    } else {
      buffetType = BuffetCategories.PER_KG;
    }

    return buffetType;
  }
}
