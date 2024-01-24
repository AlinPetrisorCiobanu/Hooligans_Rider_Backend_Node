"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conexionBBD = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_conexion_1 = __importDefault(require("./config_conexion"));
exports.conexionBBD = mongoose_1.default.connect(`${config_conexion_1.default.URLDB}`, {
// useNewUrlParser: false,
// useUnifiedTopology: false,
})
    .then(() => console.log('base de datos levantado'))
    .catch((e) => console.log('algo ha fallado!' + e));
exports.default = exports.conexionBBD;
//# sourceMappingURL=DataBase.js.map