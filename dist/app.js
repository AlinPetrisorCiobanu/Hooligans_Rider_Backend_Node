"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_conexion_1 = __importDefault(require("./src/config/config_conexion"));
const DataBase_1 = __importDefault(require("./src/database/DataBase"));
const cors_1 = __importDefault(require("cors"));
const Router_1 = __importDefault(require("./src/Entities/Users/Router"));
const Router_2 = __importDefault(require("./src/Entities/Events/Router"));
const Middleware_1 = __importDefault(require("./src/Middleware/Middleware"));
//initalization
const app = (0, express_1.default)();
app.listen(config_conexion_1.default.PORTDB, () => {
    console.log("Servidor OK");
});
app.get('/', (_req, res) => {
    res.status(200).json({ status: 'OK' });
});
//middlewares
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/user', Router_1.default);
app.use('/api/event', Router_2.default);
//instancio la base de datos
DataBase_1.default;
//errores://
app.use(Middleware_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map