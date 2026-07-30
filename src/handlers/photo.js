"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPhotoHandler = registerPhotoHandler;
const interior_generation_1 = require("../services/interior-generation");
function registerPhotoHandler(bot) {
    bot.on("message:photo", async (ctx) => {
        const photo = ctx.message.photo.at(-1);
        if (!photo) {
            await ctx.reply("Не удалось получить фотографию. Попробуйте еще раз.");
            return;
        }
        const result = await (0, interior_generation_1.processInteriorGeneration)(ctx.api, photo.file_id);
        await ctx.reply(result.message);
    });
}
//# sourceMappingURL=photo.js.map