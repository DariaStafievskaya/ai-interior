import { Api } from "grammy";
import { rm, stat } from "node:fs/promises";
import { downloadTelegramPhoto } from "./telegram";
import { generateInterior } from "./ai";

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

type InteriorGenerationSuccess = {
  readonly ok: true;
  readonly uploadedImageUrl: string;
  readonly message: string;
};

type InteriorGenerationFailure = {
  readonly ok: false;
  readonly message: string;
};

export type InteriorGenerationResult =
  | InteriorGenerationSuccess
  | InteriorGenerationFailure;

export async function processInteriorGeneration(
  api: Api,
  fileId: string
): Promise<InteriorGenerationResult> {
  let localPath: string | undefined;

  try {
    localPath = await downloadTelegramImage(api, fileId);
    await validateDownloadedImage(localPath);

    const uploadedImageUrl = await uploadImageToFal(localPath);

    return {
      ok: true,
      uploadedImageUrl,
      message:
        "🤖 Изображение передано в AI.\n\nСледующим шагом мы подключим настоящий Fal.ai.",
    };
  } catch (error) {
    console.error("Ошибка обработки изображения:", error);

    return {
      ok: false,
      message: getGenerationErrorMessage(error),
    };
  } finally {
    if (localPath) {
      await deleteTemporaryFile(localPath);
    }
  }
}

async function downloadTelegramImage(api: Api, fileId: string): Promise<string> {
  try {
    return await downloadTelegramPhoto(api, fileId);
  } catch (error) {
    throw new Error("Не удалось скачать фотографию. Попробуйте еще раз.", {
      cause: error,
    });
  }
}

async function validateDownloadedImage(imagePath: string): Promise<void> {
  let imageStats: Awaited<ReturnType<typeof stat>>;

  try {
    imageStats = await stat(imagePath);
  } catch (error) {
    throw new Error("Не удалось найти скачанный файл. Попробуйте еще раз.", {
      cause: error,
    });
  }

  if (!imageStats.isFile()) {
    throw new Error("Скачанное изображение имеет неверный формат.");
  }

  if (imageStats.size === 0) {
    throw new Error("Скачанное изображение пустое. Отправьте другое фото.");
  }

  if (imageStats.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Файл слишком большой. Отправьте фото размером до 10 МБ.");
  }
}

async function uploadImageToFal(imagePath: string): Promise<string> {
  try {
    return await generateInterior(imagePath);
  } catch (error) {
    throw new Error("Не удалось передать изображение в AI. Попробуйте позже.", {
      cause: error,
    });
  }
}

async function deleteTemporaryFile(filePath: string): Promise<void> {
  try {
    await rm(filePath, { force: true });
  } catch (error) {
    console.error("Не удалось удалить временный файл:", filePath, error);
  }
}

function getGenerationErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Не удалось обработать фотографию. Попробуйте еще раз.";
}
