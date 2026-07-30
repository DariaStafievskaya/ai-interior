import { Bot } from "grammy";

export function registerStartAnalysisHandler(bot: Bot) {
  bot.callbackQuery("start_analysis", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.reply(
      "📷 Отлично!\n\nТеперь отправьте фотографию комнаты, которую хотите изменить."
    );
  });
}