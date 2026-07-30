import { Bot, InputFile } from "grammy";
import {
  createBudgetKeyboard,
  createResultKeyboard,
  createRoomKeyboard,
  createStyleKeyboard,
  isInteriorStyle,
  isProjectBudget,
  isRoomType,
} from "../keyboards/project";
import { runProjectGeneration } from "../services/project-generation";
import {
  selectBudget,
  selectRoom,
  selectStyle,
  startNextGeneration,
  startUserProject,
} from "../services/user-session";

export function registerProjectHandlers(bot: Bot) {
  bot.callbackQuery(/^room:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();

    const roomType = ctx.match[1];

    if (!roomType || !isRoomType(roomType)) {
      await ctx.reply("Неизвестная комната. Нажмите /start, чтобы начать заново.");
      return;
    }

    try {
      selectRoom(ctx.from.id, roomType);
      await ctx.reply("Выберите стиль:", {
        reply_markup: createStyleKeyboard(),
      });
    } catch (error) {
      await replyWithFriendlyError(ctx.reply.bind(ctx), error);
    }
  });

  bot.callbackQuery(/^style:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();

    const style = ctx.match[1];

    if (!style || !isInteriorStyle(style)) {
      await ctx.reply("Неизвестный стиль. Нажмите /start, чтобы начать заново.");
      return;
    }

    try {
      selectStyle(ctx.from.id, style);
      await ctx.reply("Выберите бюджет:", {
        reply_markup: createBudgetKeyboard(),
      });
    } catch (error) {
      await replyWithFriendlyError(ctx.reply.bind(ctx), error);
    }
  });

  bot.callbackQuery(/^budget:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();

    const budget = ctx.match[1];

    if (!budget || !isProjectBudget(budget)) {
      await ctx.reply("Неизвестный бюджет. Нажмите /start, чтобы начать заново.");
      return;
    }

    try {
      selectBudget(ctx.from.id, budget);
      await ctx.reply("Теперь отправьте фотографию комнаты.");
    } catch (error) {
      await replyWithFriendlyError(ctx.reply.bind(ctx), error);
    }
  });

  bot.callbackQuery("project:another", async (ctx) => {
    await ctx.answerCallbackQuery();

    try {
      const nextGeneration = startNextGeneration(ctx.from.id);
      await ctx.reply("⏳ Генерирую еще один вариант для этого проекта...");
      const result = await runProjectGeneration(
        ctx.api,
        ctx.from.id,
        nextGeneration.photoFileId,
        nextGeneration.generationContext
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
    } catch (error) {
      await replyWithFriendlyError(ctx.reply.bind(ctx), error);
    }
  });

  bot.callbackQuery("project:new", async (ctx) => {
    await ctx.answerCallbackQuery();

    startUserProject(ctx.from.id);

    await ctx.reply("Начинаем новый проект. Выберите комнату:", {
      reply_markup: createRoomKeyboard(),
    });
  });
}

async function replyWithFriendlyError(
  reply: (message: string) => Promise<unknown>,
  error: unknown
): Promise<void> {
  if (error instanceof Error) {
    await reply(error.message);
    return;
  }

  await reply("Произошла ошибка. Нажмите /start, чтобы начать заново.");
}
