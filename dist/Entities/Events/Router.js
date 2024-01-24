"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller_1 = require("./Controller");
const Authorization_1 = require("../../Middleware/Authorization");
const router = express_1.default.Router();
router.post('/new_event', Authorization_1.validateToken, async (req, res, next) => {
    try {
        res.status(200).json(await (0, Controller_1.new_event)(req.user, req.body));
    }
    catch (e) {
        next(e);
    }
});
router.get('/active_events/:page?', Authorization_1.validateToken, async (req, res, next) => {
    try {
        res.status(200).json(await (0, Controller_1.list_active_events)(req.user, req.params.page));
    }
    catch (e) {
        next(e);
    }
});
router.get('/inactive_events/:page?', Authorization_1.validateToken, async (req, res, next) => {
    try {
        res.status(200).json(await (0, Controller_1.list_inactive_events)(req.user, req.params.page));
    }
    catch (e) {
        next(e);
    }
});
router.put('/delete_event/:id', Authorization_1.validateToken, async (req, res, next) => {
    try {
        res.status(200).json(await (0, Controller_1.delete_event)(req.user, req.params.id));
    }
    catch (e) {
        next(e);
    }
});
router.patch('/add_participant_event/:id', Authorization_1.validateToken, async (req, res, next) => {
    try {
        res.status(200).json(await (0, Controller_1.add_participant_event)(req.user, req.params.id));
    }
    catch (e) {
        next(e);
    }
});
router.patch('/remove_participant_event/:id', Authorization_1.validateToken, async (req, res, next) => {
    try {
        res.status(200).json(await (0, Controller_1.remove_participant_event)(req.user, req.params.id));
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
//# sourceMappingURL=Router.js.map