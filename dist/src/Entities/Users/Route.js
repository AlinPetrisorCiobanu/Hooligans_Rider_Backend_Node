"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller_1 = require("./Controller");
const router = express_1.default.Router();
router.post('/register', async (req, res, next) => {
    try {
        res.status(201).json(await (0, Controller_1.register)(req.body));
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
//# sourceMappingURL=Route.js.map