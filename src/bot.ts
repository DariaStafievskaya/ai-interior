import { Bot } from "grammy";
import { config } from "./config";
import { registerHandlers } from "./handlers";

const bot = new Bot(config.botToken);

// Подключаем все обработчики проекта
registerHandlers(bot);

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