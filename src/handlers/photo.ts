import { Bot } from "grammy";
import { downloadTelegramPhoto } from "../services/telegram";
import { generateInterior } from "../services/ai";

export function registerPhotoHandler(bot: Bot) {
  bot.on("message:photo", async (ctx) => {
    const photos = ctx.message.photo;
    const photo = photos[photos.length - 1];

    console.log("Получено фото:");
    console.log("file_id:", photo.file_id);
    console.log("Размер:", photo.width, "x", photo.height);

    const localPath = await downloadTelegramPhoto(
      ctx.api,
      photo.file_id
    );

    console.log("Файл сохранен:", localPath);

    const resultPath = await generateInterior(localPath);

    console.log("AI вернул:", resultPath);

    await ctx.reply(
      "🤖 Изображение передано в AI.\n\nСледующим шагом мы подключим настоящий Fal.ai."
    );
  });
}