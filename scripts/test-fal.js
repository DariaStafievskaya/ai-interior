"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@fal-ai/client");
const config_1 = require("../src/config");
async function main() {
    client_1.fal.config({
        credentials: config_1.config.falKey,
    });
    console.log("✅ Fal SDK успешно настроен.");
    console.log("Ключ загружен.");
}
main().catch((error) => {
    console.error(error);
});
//# sourceMappingURL=test-fal.js.map