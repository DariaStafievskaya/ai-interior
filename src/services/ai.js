"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInterior = generateInterior;
const client_1 = require("@fal-ai/client");
const config_1 = require("../config");
const promises_1 = require("node:fs/promises");
client_1.fal.config({
    credentials: config_1.config.falKey,
});
async function generateInterior(imagePath) {
    console.log("Отправляем изображение в Fal...");
    console.log("Файл:", imagePath);
    console.log("Модель:", config_1.config.falModel);
    const file = await (0, promises_1.readFile)(imagePath);
    const imageUrl = await client_1.fal.storage.upload(new Blob([file], { type: "image/jpeg" }));
    console.log("Файл загружен:");
    console.log(imageUrl);
    return imageUrl;
}
//# sourceMappingURL=ai.js.map