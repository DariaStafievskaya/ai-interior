"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStartAnalysisHandler = registerStartAnalysisHandler;
function registerStartAnalysisHandler(bot) {
    bot.callbackQuery("start_analysis", async (ctx) => {
        await ctx.answerCallbackQuery();
        await ctx.reply("📷 Отлично!\n\nТеперь отправьте фотографию комнаты, которую хотите изменить.");
    });
}
//# sourceMappingURL=startAnalysis.js.map