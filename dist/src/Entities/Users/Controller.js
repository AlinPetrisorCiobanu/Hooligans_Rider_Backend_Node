"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list_users = exports.data_user = exports.delete_user = exports.modify_user = exports.login = exports.register = void 0;
const Validator_1 = require("../../Utils/Validator");
const config_conexion_1 = __importDefault(require("../../config/config_conexion"));
const Modelo_1 = __importDefault(require("./Modelo"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.name || !data.last_name || !data.date || !data.phone || !data.email || !data.nickname || !data.password)
        throw new Error('MISSING_DATA');
    const phone_exist = yield Modelo_1.default.findOne({ phone: data.phone });
    const email_exist = yield Modelo_1.default.findOne({ email: data.email });
    const nickname_exist = yield Modelo_1.default.findOne({ nickname: data.nickname });
    if (phone_exist || email_exist || nickname_exist)
        throw new Error('ALLREADY_EXIST');
    if (!(0, Validator_1.validateEmail)(data.email))
        throw new Error('INVALID_CREDENTIALS_EMAIL');
    if (!(0, Validator_1.validatePassword)(data.password))
        throw new Error('INVALID_CREDENTIALS_PASSWORD');
    try {
        data.password = yield bcrypt_1.default.hash(data.password, config_conexion_1.default.LOOPDB);
        data.role = "user";
        data.is_active = true;
        data.confirmed = false;
        yield new Modelo_1.default(data).save();
        return {
            succes: true,
            message: "Gracias por Registrarte"
        };
    }
    catch (error) {
        throw new Error('BAD_REQUEST');
    }
});
exports.register = register;
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user_exist = yield Modelo_1.default.findOne({ $or: [{ email: data.email }, { nickname: data.nickname }] });
    if (!user_exist)
        throw new Error('EMAIL_PASSWORD');
    if (user_exist.is_active === false)
        throw new Error('DELETED');
    try {
        const compare_password = yield bcrypt_1.default.compare(data.password, user_exist.password);
        if (!compare_password)
            throw new Error('EMAIL_PASSWORD');
        let token = jsonwebtoken_1.default.sign({ user: user_exist }, config_conexion_1.default.SECRETDB, { expiresIn: '24h' });
        return {
            succes: true,
            data: user_exist,
            token: token
        };
    }
    catch (error) {
        throw new Error('BAD_REQUEST');
    }
});
exports.login = login;
const modify_user = (data_token, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user_token = data_token.user;
    if (user_token === undefined)
        throw new Error('INVALID_CREDENTIALS');
    if (!(data.name || data.last_name || data.date || data.phone || data.email || data.nickname || data.password))
        throw new Error('MISSING_DATA_MODIFY');
    if (user_token.role === "user" || user_token.role === "rider") {
        id = user_token._id;
    }
    if (!id) {
        id = user_token._id;
    }
    let user_to_update;
    try {
        user_to_update = yield Modelo_1.default.findById(id);
    }
    catch (_a) {
        throw new Error('NOT_FOUND');
    }
    if (data.name) {
        if (!(0, Validator_1.validateName)(data.name)) {
            throw new Error('INVALID_CREDENTIALS');
        }
    }
    if (data.last_name) {
        if (!(0, Validator_1.validateLastName)(data.last_name)) {
            throw new Error('INVALID_CREDENTIALS');
        }
    }
    if (data.date) {
        if (!(0, Validator_1.validateDate)(data.date)) {
            throw new Error('INVALID_CREDENTIALS');
        }
    }
    if (data.phone) {
        if (!(0, Validator_1.validatePhone)(data.phone.toString())) {
            throw new Error('INVALID_CREDENTIALS');
        }
    }
    if (data.email) {
        if (!(0, Validator_1.validateEmail)(data.email)) {
            throw new Error('INVALID_CREDENTIALS');
        }
    }
    if (data.nickname) {
        if (!(0, Validator_1.validateNickname)(data.nickname)) {
            throw new Error('INVALID_CREDENTIALS');
        }
    }
    if (data.password) {
        if (!(0, Validator_1.validatePassword)(data.password)) {
            throw new Error('INVALID_CREDENTIALS');
        }
    }
    if (user_to_update && data.img) {
        user_to_update.img = data.img;
    }
    if (user_to_update && data.name) {
        user_to_update.name = data.name;
    }
    if (user_to_update && data.last_name) {
        user_to_update.last_name = data.last_name;
    }
    if (user_to_update && data.date) {
        user_to_update.date = data.date;
    }
    if (user_to_update && data.phone) {
        user_to_update.phone = data.phone;
    }
    if (user_to_update && data.email) {
        user_to_update.email = data.email;
    }
    if (user_to_update && data.nickname) {
        user_to_update.nickname = data.nickname;
    }
    if (user_to_update && data.password) {
        user_to_update.password = data.password;
    }
    if (data.role || data.is_active || data.confirmed) {
        if (user_token.role === "admin" || user_token.role === "super_admin") {
            if (user_to_update && (data.role === "user" || data.role === "rider" || data.role === "admin")) {
                user_to_update.role = data.role;
            }
            if (user_to_update && data.is_active) {
                user_to_update.is_active = data.is_active;
            }
            if (user_to_update && data.confirmed) {
                user_to_update.confirmed = data.confirmed;
            }
        }
    }
    try {
        if (user_to_update) {
            yield user_to_update.save();
            return {
                success: true,
                message: "Usuario modificado",
            };
        }
        else {
            return {
                success: false,
                message: "No hay usuario para modificar",
            };
        }
    }
    catch (err) {
        throw new Error('BAD_REQUEST');
    }
});
exports.modify_user = modify_user;
const delete_user = (data_token, id) => __awaiter(void 0, void 0, void 0, function* () {
    const user_token = data_token.user;
    if (user_token === undefined)
        throw new Error('INVALID_CREDENTIALS');
    if (user_token.is_active === false)
        throw new Error('DELETED');
    if (user_token.role === "user" || user_token.role === "rider") {
        id = user_token._id;
    }
    if (!id) {
        id = user_token._id;
    }
    try {
        const user_to_delete = yield Modelo_1.default.findById(id);
        if (user_to_delete) {
            user_to_delete.is_active = false;
            yield user_to_delete.save();
            return {
                success: true,
                message: "Usuario borrado",
            };
        }
        else {
            return {
                success: false,
                message: "No hay usuario para borrar",
            };
        }
    }
    catch (err) {
        throw new Error('BAD_REQUEST');
    }
});
exports.delete_user = delete_user;
const data_user = (data_token, id) => __awaiter(void 0, void 0, void 0, function* () {
    const user_token = data_token.user;
    let user;
    if (user_token === undefined)
        throw new Error('INVALID_CREDENTIALS');
    if (user_token.is_active === false)
        throw new Error('DELETED');
    try {
        if (!id) {
            user = yield Modelo_1.default.findById(user_token._id);
        }
        else {
            if (user_token.role === "user" || user_token.role === "rider") {
                id = user_token._id;
            }
            user = yield Modelo_1.default.findById(id);
        }
        try {
            if (user) {
                return {
                    success: true,
                    message: "Usuario",
                    data: user
                };
            }
            else {
                return {
                    success: false,
                    message: "No hay usuario para mostrar",
                };
            }
        }
        catch (err) {
            throw new Error('BAD_REQUEST');
        }
    }
    catch (_b) {
        throw new Error('NOT_FOUND');
    }
});
exports.data_user = data_user;
const list_users = (data_token, page_params) => __awaiter(void 0, void 0, void 0, function* () {
    const user_token = data_token.user;
    let page = page_params ? parseFloat(page_params) : 1;
    const pageSize = 2;
    const options = {
        page,
        limit: pageSize
    };
    if (user_token === undefined)
        throw new Error('INVALID_CREDENTIALS');
    if (user_token.is_active === false)
        throw new Error('DELETED');
    if (user_token.role === "user" || user_token.role === "rider")
        throw new Error('UNAUTHORIZATION');
    try {
        let users = yield Modelo_1.default.paginate({}, options);
        if (page > users.totalPages) {
            options.page = 1;
            users = yield Modelo_1.default.paginate({}, options);
        }
        if (users.docs.length > 0) {
            return {
                success: true,
                message: "Usuario",
                data: users
            };
        }
        else {
            return {
                success: false,
                message: "No hay usuario para mostrar",
            };
        }
    }
    catch (_c) {
        throw new Error('NOT_FOUND');
    }
});
exports.list_users = list_users;
//# sourceMappingURL=Controller.js.map