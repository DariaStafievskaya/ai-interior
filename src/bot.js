"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const config_1 = require("./config");
const handlers_1 = require("./handlers");
const bot = new grammy_1.Bot(config_1.config.botToken);
// Подключаем все обработчики проекта
(0, handlers_1.registerHandlers)(bot);
async function main() {
    await bot.api.deleteWebhook({
        drop_pending_updates: true,
    });
    const me = await bot.api.getMe();
    console.log("Бот:", me.username);
    await bot.init();
    console.log("ID бота:", bot.botInfo.id);
    bot.on("message", (ctx) => {
        console.log("Получено сообщение:", ctx.message.text);
    });
    console.log("Ждем сообщения...");
    await bot.start({
        onStart() {
            console.log("Polling запущен.");
        },
    });
}
main().catch(console.error);
//# sourceMappingURL=bot.js.map