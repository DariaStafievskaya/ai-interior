import { fal } from "@fal-ai/client";
import { config } from "../config";
import { readFile } from "node:fs/promises";

fal.config({
  credentials: config.falKey,
});

export async function generateInterior(
  imagePath: string
): Promise<string> {
  console.log("Отправляем изображение в Fal...");
  console.log("Файл:", imagePath);
  console.log("Модель:", config.falModel);

  const file = await readFile(imagePath);

  const imageUrl = await fal.storage.upload(
    new Blob([file], { type: "image/jpeg" })
  );

  console.log("Файл загружен:");
  console.log(imageUrl);

  return imageUrl;
}