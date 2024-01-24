"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_conexion_1 = __importDefault(require("../config/config_conexion"));
const validateToken = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            console.log(token);
            return res.status(401).json({ msg: 'NO AUTORIZADO' });
        }
        const tokenParts = token.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(401).json({ msg: 'Formato de token inválido' });
        }
        const t = tokenParts[1];
        req.user = jsonwebtoken_1.default.verify(t, config_conexion_1.default.SECRETDB);
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(403).json({ error: "Token inválido" });
        }
        next(error);
    }
    return "";
};
exports.validateToken = validateToken;
//# sourceMappingURL=Authorization.js.map