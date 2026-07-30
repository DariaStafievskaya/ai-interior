import "dotenv/config";

const botToken = process.env.BOT_TOKEN;
const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiImageModel = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1";
const openaiImageSize = process.env.OPENAI_IMAGE_SIZE ?? "1024x1024";

if (!botToken) {
  throw new Error("BOT_TOKEN не найден");
}

if (!openaiApiKey) {
  throw new Error("OPENAI_API_KEY не найден");
}

export const config = {
  botToken,
  openaiApiKey,
  openaiImageModel,
  openaiImageSize,
};
