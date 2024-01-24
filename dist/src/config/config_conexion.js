"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CONFIDENCE = {
    URLDB: process.env.DDBB_URL,
    USERDB: process.env.DDBB_USER,
    PASSWORDDB: process.env.DDBB_PASSWORD,
    LOOPDB: Number(process.env.BCRYTP_LOOP),
    SECRETDB: String(process.env.JWT_SECRET),
    PORTDB: Number(process.env.JWT_PORT),
};
exports.default = CONFIDENCE;
//# sourceMappingURL=config_conexion.js.map