import { Bot } from "grammy";
import { processInteriorGeneration } from "../services/interior-generation";

export function registerPhotoHandler(bot: Bot) {
  bot.on("message:photo", async (ctx) => {
    const photo = ctx.message.photo.at(-1);

    if (!photo) {
      await ctx.reply("Не удалось получить фотографию. Попробуйте еще раз.");
      return;
    }

    const result = await processInteriorGeneration(ctx.api, photo.file_id);

    await ctx.reply(result.message);
  });
}
