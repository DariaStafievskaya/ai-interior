"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHandlers = registerHandlers;
const photo_1 = require("./photo");
const start_1 = require("./start");
const startAnalysis_1 = require("./startAnalysis");
function registerHandlers(bot) {
    (0, start_1.registerStartHandler)(bot);
    (0, startAnalysis_1.registerStartAnalysisHandler)(bot);
    (0, photo_1.registerPhotoHandler)(bot);
}
//# sourceMappingURL=index.js.map