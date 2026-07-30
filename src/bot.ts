import { Bot } from "grammy";
import { config } from "./config";
import { registerHandlers } from "./handlers";

const bot = new Bot(config.botToken);

// Глобальный обработчик ошибок
bot.catch(async (error) => {
  console.error("Ошибка бота:");
  console.error(error.error);

  try {
    await error.ctx.reply(
      "⚠️ Во время обработки запроса произошла ошибка.\n\nПопробуйте еще раз позже."
    );
  } catch {
    console.error("Не удалось отправить сообщение об ошибке пользователю.");
  }
});

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
  console.log("Ждем сообщения...");

  await bot.start({
    onStart() {
      console.log("Polling запущен.");
    },
  });
}

main().catch((error) => {
  console.error("Критическая ошибка запуска:");
  console.error(error);
});