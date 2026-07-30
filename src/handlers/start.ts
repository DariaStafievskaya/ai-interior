import { Bot } from "grammy";
import { startKeyboard } from "../keyboards/start";

export function registerStartHandler(bot: Bot) {
  bot.command("start", async (ctx) => {
    console.log("Команда /start получена!");

    await ctx.reply(
      [
        "🏠 AI Interior",
        "",
        "Добро пожаловать!",
        "",
        "Я помогу создать новый дизайн вашего интерьера с помощью искусственного интеллекта.",
        "",
        "Что я умею:",
        "• менять стиль комнаты",
        "• предлагать варианты дизайна",
        "• вдохновлять новыми идеями",
        "",
        "Нажмите кнопку ниже, чтобы начать."
      ].join("\n"),
      {
        reply_markup: startKeyboard,
      }
    );
  });
}