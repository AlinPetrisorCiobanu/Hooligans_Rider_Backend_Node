"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.UserSchema = new mongoose_1.Schema({
    img: {
        type: String,
    },
    name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 50
    },
    last_name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 80
    },
    date: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
        unique: true,
        minlength: 5,
        maxlength: 20
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    nickname: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "rider", "admin", "super_admin"]
    },
    is_active: {
        type: Boolean,
        default: false
    },
    confirmed: {
        type: Boolean,
        default: false
    },
}, { versionkey: true, timestamps: true });
exports.UserSchema.plugin(mongoose_paginate_v2_1.default);
const User = (0, mongoose_1.model)('User', exports.UserSchema);
exports.default = User;
//# sourceMappingURL=Modelo.js.map