import { Bot } from "grammy";
import { registerPhotoHandler } from "./photo";
import { registerStartHandler } from "./start";
import { registerStartAnalysisHandler } from "./startAnalysis";

export function registerHandlers(bot: Bot) {
  registerStartHandler(bot);
  registerStartAnalysisHandler(bot);
  registerPhotoHandler(bot);
}