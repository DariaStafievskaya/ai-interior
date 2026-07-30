import { Bot, InputFile } from "grammy";
import { createResultKeyboard } from "../keyboards/project";
import { runProjectGeneration } from "../services/project-generation";
import { savePhotoAndStartGeneration } from "../services/user-session";

export function registerPhotoHandler(bot: Bot) {
  bot.on("message:photo", async (ctx) => {
    const photo = ctx.message.photo.at(-1);

    if (!photo) {
      await ctx.reply("Не удалось получить фотографию. Попробуйте еще раз.");
      return;
    }

    let generationContext: ReturnType<typeof savePhotoAndStartGeneration>;

    try {
      generationContext = savePhotoAndStartGeneration(ctx.from.id, photo.file_id);
    } catch (error) {
      if (error instanceof Error) {
        await ctx.reply(error.message);
        return;
      }

      await ctx.reply("Сначала выберите комнату, стиль и бюджет через /start.");
      return;
    }

    await ctx.reply("⏳ Фото получено. Генерирую новый интерьер...");

    const result = await runProjectGeneration(
      ctx.api,
      ctx.from.id,
      photo.file_id,
      generationContext
    );

    if (!result.ok) {
      await ctx.reply(result.message);
      return;
    }

    await ctx.replyWithPhoto(
      new InputFile(result.generatedImage.buffer, result.generatedImage.fileName),
      {
        caption: result.message,
        reply_markup: createResultKeyboard(result.session),
      }
    );
  });
}
