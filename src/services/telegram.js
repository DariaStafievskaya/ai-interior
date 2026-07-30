"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadTelegramPhoto = downloadTelegramPhoto;
const config_1 = require("../config");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const node_crypto_1 = require("node:crypto");
async function downloadTelegramPhoto(api, fileId) {
    const file = await api.getFile(fileId);
    if (!file.file_path) {
        throw new Error("Не удалось получить путь к файлу.");
    }
    const url = `https://api.telegram.org/file/bot${config_1.config.botToken}/${file.file_path}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Не удалось скачать фотографию.");
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const fileName = `${(0, node_crypto_1.randomUUID)()}.jpg`;
    const filePath = (0, node_path_1.join)("uploads", fileName);
    await (0, promises_1.writeFile)(filePath, buffer);
    return filePath;
}
//# sourceMappingURL=telegram.js.map