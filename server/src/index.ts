import { Buffet } from "./services/Buffet";
import { Meal } from "./services/Meal";
import { Scale, Units } from "./services/Scale";

const scale_1 = new Scale(
  {
    path: "/dev/ttyBalanca",
    baudRate: 57600,
    autoOpen: true,
  },
  Units.G
);

const buffet_1 = new Buffet(50, 29.9, [scale_1]);

const order = new Meal(buffet_1);

order.detectMeal();
