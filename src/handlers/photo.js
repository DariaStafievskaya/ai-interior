"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPhotoHandler = registerPhotoHandler;
const telegram_1 = require("../services/telegram");
const ai_1 = require("../services/ai");
function registerPhotoHandler(bot) {
    bot.on("message:photo", async (ctx) => {
        const photos = ctx.message.photo;
        const photo = photos.at(-1);
        if (!photo) {
            await ctx.reply("Не удалось получить фотографию. Попробуйте еще раз.");
            return;
        }
        console.log("Получено фото:");
        console.log("file_id:", photo.file_id);
        console.log("Размер:", photo.width, "x", photo.height);
        const localPath = await (0, telegram_1.downloadTelegramPhoto)(ctx.api, photo.file_id);
        console.log("Файл сохранен:", localPath);
        const resultPath = await (0, ai_1.generateInterior)(localPath);
        console.log("AI вернул:", resultPath);
        await ctx.reply("🤖 Изображение передано в AI.\n\nСледующим шагом мы подключим настоящий Fal.ai.");
    });
}
//# sourceMappingURL=photo.js.map