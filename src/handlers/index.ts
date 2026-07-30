import { Bot } from "grammy";
import { registerPhotoHandler } from "./photo";
import { registerProjectHandlers } from "./project";
import { registerStartHandler } from "./start";

export function registerHandlers(bot: Bot) {
  registerStartHandler(bot);
  registerProjectHandlers(bot);
  registerPhotoHandler(bot);
}
