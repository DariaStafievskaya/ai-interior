import { Bot, InputFile } from "grammy";
import { processInteriorGeneration } from "../services/interior-generation";

export function registerPhotoHandler(bot: Bot) {
  bot.on("message:photo", async (ctx) => {
    const photo = ctx.message.photo.at(-1);

    if (!photo) {
      await ctx.reply("Не удалось получить фотографию. Попробуйте еще раз.");
      return;
    }

    await ctx.reply("⏳ Фото получено. Генерирую новый интерьер...");

    const result = await processInteriorGeneration(ctx.api, photo.file_id);

    if (!result.ok) {
      await ctx.reply(result.message);
      return;
    }

    await ctx.replyWithPhoto(
      new InputFile(result.generatedImage.buffer, result.generatedImage.fileName),
      {
        caption: result.message,
      }
    );
  });
}
