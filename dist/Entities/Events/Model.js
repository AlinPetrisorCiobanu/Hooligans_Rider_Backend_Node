"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events_Schema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.Events_Schema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 80
    },
    data: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 500
    },
    date: {
        type: String,
        require: true,
    },
    hour: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: true,
    },
    details: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 800,
    },
    id_user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    maps: {
        type: String,
        require: true,
    },
    participants: {
        type: Number,
        default: 1,
    },
    participants_ids: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User"
        }],
    is_active: {
        type: Boolean,
        default: false
    },
    confirmed: {
        type: Boolean,
        default: false
    },
}, { versionkey: true, timestamps: true });
exports.Events_Schema.plugin(mongoose_paginate_v2_1.default);
const Event = (0, mongoose_1.model)('Events', exports.Events_Schema);
exports.default = Event;
//# sourceMappingURL=Model.js.map