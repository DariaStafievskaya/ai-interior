import { Api } from "grammy";
import { config } from "../config";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

export async function downloadTelegramPhoto(
  api: Api,
  fileId: string
): Promise<string> {
  const file = await api.getFile(fileId);

  if (!file.file_path) {
    throw new Error("Не удалось получить путь к файлу.");
  }

  const url = `https://api.telegram.org/file/bot${config.botToken}/${file.file_path}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Не удалось скачать фотографию.");
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  const fileName = `${randomUUID()}.jpg`;

  const filePath = join("uploads", fileName);

  await writeFile(filePath, buffer);

  return filePath;
}