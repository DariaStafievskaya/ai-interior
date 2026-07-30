"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStartHandler = registerStartHandler;
const start_1 = require("../keyboards/start");
function registerStartHandler(bot) {
    bot.command("start", async (ctx) => {
        console.log("Команда /start получена!");
        await ctx.reply([
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
        ].join("\n"), {
            reply_markup: start_1.startKeyboard,
        });
    });
}
//# sourceMappingURL=start.js.map