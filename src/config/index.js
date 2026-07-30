"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
const botToken = process.env.BOT_TOKEN;
const falKey = process.env.FAL_KEY;
const falModel = process.env.FAL_MODEL;
if (!botToken) {
    throw new Error("BOT_TOKEN не найден");
}
if (!falKey) {
    throw new Error("FAL_KEY не найден");
}
if (!falModel) {
    throw new Error("FAL_MODEL не найден");
}
exports.config = {
    botToken,
    falKey,
    falModel,
};
//# sourceMappingURL=index.js.map