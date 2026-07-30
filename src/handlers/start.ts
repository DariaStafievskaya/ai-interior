import { Bot } from "grammy";
import { createRoomKeyboard } from "../keyboards/project";
import { startUserProject } from "../services/user-session";

export function registerStartHandler(bot: Bot) {
  bot.command("start", async (ctx) => {
    console.log("Команда /start получена!");

    if (!ctx.from) {
      await ctx.reply("Не удалось определить пользователя. Попробуйте еще раз.");
      return;
    }

    startUserProject(ctx.from.id);

    await ctx.reply(
      [
        "🏠 AI Interior",
        "",
        "Добро пожаловать!",
        "",
        "Я помогу создать новый дизайн вашей комнаты с помощью искусственного интеллекта.",
        "",
        "Сначала выберите комнату для проекта.",
      ].join("\n"),
      {
        reply_markup: createRoomKeyboard(),
      }
    );
  });
}
