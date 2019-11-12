"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const controller_1 = __importDefault(require("./controller"));
const port = process.env.PORT || 4000;
const app = routing_controllers_1.createKoaServer({
    controllers: [controller_1.default]
});
app.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=index.js.map