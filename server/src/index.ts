import { Buffet } from "./services/Buffet";
import { Meal } from "./services/Meal";
import { Scale, Units } from "./services/Scale";
import * as dotenv from "dotenv";

dotenv.config();

const scale_1 = new Scale(
  {
    path: process.env.SCALE_1_PATH ?? "/dev/ttyScale",
    baudRate: 57600,
    autoOpen: true,
  },
  Units.G
);

const perKgPrice = +(process.env.PER_KG_BUFFET_PRICE as string);
const openPrice = +(process.env.OPEN_BUFFET_PRICE as string);

const buffet_1 = new Buffet(perKgPrice, openPrice, [scale_1]);

const order = new Meal(buffet_1);

order.detectMeal();
