"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conexionBBD = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_conexion_1 = __importDefault(require("../config/config_conexion"));
exports.conexionBBD = mongoose_1.default.connect(`${config_conexion_1.default.URLDB}`, {})
    .then(() => console.log('BBD ok'))
    .catch((e) => console.log('error BBD!' + e));
exports.default = exports.conexionBBD;
//# sourceMappingURL=DataBase.js.map