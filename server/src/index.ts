import { Buffet } from "./services/Buffet";
import { Meal } from "./services/Meal";
import { Scale, Units } from "./services/Scale";

const scale_1 = new Scale(
  {
    path: "/dev/ttyScale",
    baudRate: 57600,
    autoOpen: true,
  },
  Units.G
);

const perKgPrice = 59.9;
const openPrice = 29.9;

const buffet_1 = new Buffet(perKgPrice, openPrice, [scale_1]);

const order = new Meal(buffet_1);

order.detectMeal();
