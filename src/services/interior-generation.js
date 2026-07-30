"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processInteriorGeneration = processInteriorGeneration;
const promises_1 = require("node:fs/promises");
const telegram_1 = require("./telegram");
const ai_1 = require("./ai");
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
async function processInteriorGeneration(api, fileId) {
    let localPath;
    try {
        localPath = await downloadTelegramImage(api, fileId);
        await validateDownloadedImage(localPath);
        const uploadedImageUrl = await uploadImageToFal(localPath);
        return {
            ok: true,
            uploadedImageUrl,
            message: "🤖 Изображение передано в AI.\n\nСледующим шагом мы подключим настоящий Fal.ai.",
        };
    }
    catch (error) {
        console.error("Ошибка обработки изображения:", error);
        return {
            ok: false,
            message: getGenerationErrorMessage(error),
        };
    }
    finally {
        if (localPath) {
            await deleteTemporaryFile(localPath);
        }
    }
}
async function downloadTelegramImage(api, fileId) {
    try {
        return await (0, telegram_1.downloadTelegramPhoto)(api, fileId);
    }
    catch (error) {
        throw new Error("Не удалось скачать фотографию. Попробуйте еще раз.", {
            cause: error,
        });
    }
}
async function validateDownloadedImage(imagePath) {
    let imageStats;
    try {
        imageStats = await (0, promises_1.stat)(imagePath);
    }
    catch (error) {
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
async function uploadImageToFal(imagePath) {
    try {
        return await (0, ai_1.generateInterior)(imagePath);
    }
    catch (error) {
        throw new Error("Не удалось передать изображение в AI. Попробуйте позже.", {
            cause: error,
        });
    }
}
async function deleteTemporaryFile(filePath) {
    try {
        await (0, promises_1.rm)(filePath, { force: true });
    }
    catch (error) {
        console.error("Не удалось удалить временный файл:", filePath, error);
    }
}
function getGenerationErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    return "Не удалось обработать фотографию. Попробуйте еще раз.";
}
//# sourceMappingURL=interior-generation.js.map