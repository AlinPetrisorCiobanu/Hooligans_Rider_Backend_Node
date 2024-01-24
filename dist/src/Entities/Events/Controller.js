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
exports.remove_participant_event = exports.add_participant_event = exports.delete_event = exports.list_inactive_events = exports.list_active_events = exports.new_event = void 0;
const Model_1 = __importDefault(require("./Model"));
const new_event = (data_token, data_event) => __awaiter(void 0, void 0, void 0, function* () {
    const user_token = data_token.user;
    const dateNow = new Date();
    if (!data_event.name || !data_event.data || !data_event.date || !data_event.hour || !data_event.img || !data_event.details || !data_event.maps)
        throw new Error('MISSING_DATA');
    if (user_token === undefined)
        throw new Error('INVALID_CREDENTIALS');
    if (user_token.role === "user")
        throw new Error('UNAUTHORIZATION');
    const date = new Date(`${data_event.date}`);
    const [hours, minuts] = data_event.hour.split(':').map(Number);
    if (hours < 6 && hours > 18)
        throw new Error('INVALID_CREDENTIALS');
    if (minuts < 0 && minuts > 59)
        throw new Error('INVALID_CREDENTIALS');
    if (!(date instanceof Date))
        throw new Error('BAD_DATE_REQUEST');
    if (date < dateNow)
        throw new Error('INVALID_CREDENTIALS');
    const event = yield Model_1.default.findOne({ date: data_event.date });
    if (event)
        throw new Error('ALLREADY_EXIST');
    try {
        data_event.id_user = user_token._id;
        data_event.participants_ids = [user_token._id];
        data_event.is_active = true;
        data_event.confirmed = false;
        yield new Model_1.default(data_event).save();
        return {
            succes: true,
            message: "Evento Creado",
            data: data_event
        };
    }
    catch (error) {
        throw new Error('BAD_REQUEST');
    }
});
exports.new_event = new_event;
const list_active_events = (data_token, page_params) => __awaiter(void 0, void 0, void 0, function* () {
    const user_token = data_token.user;
    let page = page_params ? parseFloat(page_params) : 1;
    const pageSize = 1;
    const options = {
        page,
        limit: pageSize
    };
    if (user_token === undefined)
        throw new Error('INVALID_CREDENTIALS');
    if (user_token.is_active === false)
        throw new Error('DELETED');
    try {
        let events = yield Model_1.default.paginate({ is_active: true }, options);
        if (page > events.totalPages) {
            options.page = 1;
            events = yield Model_1.default.paginate({ is_active: true }, options);
        }
        if (events.docs.length > 0) {
            return {
                success: true,
                message: "Eventos",
                data: events
            };
        }
        else {
            return {
                success: false,
                message: "No hay eventos para mostrar",
            };
        }
    }
    catch (error) {
        throw new Error('NOT_FOUND');
    }
});
exports.list_active_events = list_active_events;
const list_inactive_events = (data_token, page_params) => __awaiter(void 0, void 0, void 0, function* () {
    const user_token = data_token.user;
    let page = page_params ? parseFloat(page_params) : 1;
    const pageSize = 1;
    const options = {
        page,
        limit: pageSize
    };
    if (user_token === undefined)
        throw new Error('INVALID_CREDENTIALS');
    if (user_token.is_active === false)
        throw new Error('DELETED');
    try {
        let events = yield Model_1.default.paginate({ is_active: false }, options);
        if (page > events.totalPages) {
            options.page = 1;
            events = yield Model_1.default.paginate({ is_active: false }, options);
        }
        if (events.docs.length > 0) {
            return {
                success: true,
                message: "Eventos",
                data: events
            };
        }
        else {
            return {
                success: false,
                message: "No hay eventos para mostrar",
            };
        }
    }
    catch (error) {
        throw new Error('NOT_FOUND');
    }
});
exports.list_inactive_events = list_inactive_events;
const delete_event = (data_token, id_event) => __awaiter(void 0, void 0, void 0, function* () {
    const user_token = data_token.user;
    if (user_token === undefined)
        throw new Error('INVALID_CREDENTIALS');
    if (user_token.is_active === false)
        throw new Error('DELETED');
    const event = yield Model_1.default.findOne({ _id: id_event });
    if (event !== null && event.is_active === false)
        throw new Error('EVENT_DELETED');
    try {
        if (event) {
            event.is_active = false;
            yield event.save();
            return {
                success: true,
                message: "Evento borrado con exito",
            };
        }
        else {
            throw new Error('NOT_FOUND');
        }
    }
    catch (error) {
        throw new Error('NOT_FOUND');
    }
});
exports.delete_event = delete_event;
const add_participant_event = (data_token, id_event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id_event);
    const user_token = data_token.user;
    if (user_token === undefined)
        throw new Error('INVALID_CREDENTIALS');
    if (user_token.is_active === false)
        throw new Error('DELETED');
    const event = yield Model_1.default.findOne({ _id: id_event });
    if (event !== null && event.is_active === false)
        throw new Error('EVENT_DELETED');
    const id_exist = event === null || event === void 0 ? void 0 : event.participants_ids.includes(user_token._id);
    if (id_exist)
        throw new Error('ALLREADY_EXIST');
    const participants_ids = event === null || event === void 0 ? void 0 : event.participants_ids;
    try {
        if (event) {
            event.participants = event.participants + 1;
            participants_ids === null || participants_ids === void 0 ? void 0 : participants_ids.push(user_token._id);
            if (participants_ids)
                event.participants_ids = participants_ids;
            yield event.save();
            return {
                success: true,
                message: "Participante añadido con exito",
            };
        }
        else {
            throw new Error('NOT_FOUND');
        }
    }
    catch (error) {
        throw new Error('NOT_FOUND');
    }
});
exports.add_participant_event = add_participant_event;
const remove_participant_event = (data_token, id_event) => __awaiter(void 0, void 0, void 0, function* () {
    const user_token = data_token.user;
    if (user_token === undefined)
        throw new Error('INVALID_CREDENTIALS');
    if (user_token.is_active === false)
        throw new Error('DELETED');
    const event = yield Model_1.default.findOne({ _id: id_event });
    if (event !== null && event.is_active === false)
        throw new Error('EVENT_DELETED');
    const id_exist = event === null || event === void 0 ? void 0 : event.participants_ids.includes(user_token._id);
    if (!id_exist)
        throw new Error('ALLREADY_NOT_EXIST');
    const indexId = event === null || event === void 0 ? void 0 : event.participants_ids.indexOf(user_token._id);
    const participants_ids = event === null || event === void 0 ? void 0 : event.participants_ids;
    try {
        if (event) {
            event.participants = event.participants + (-1);
            if (indexId)
                participants_ids === null || participants_ids === void 0 ? void 0 : participants_ids.splice(indexId, 1);
            if (participants_ids)
                event.participants_ids = participants_ids;
            yield event.save();
            return {
                success: true,
                message: "Participante borrado con exito",
            };
        }
        else {
            throw new Error('ALLREADY_NOT_EXIST');
        }
    }
    catch (error) {
        throw new Error('NOT_FOUND');
    }
});
exports.remove_participant_event = remove_participant_event;
//# sourceMappingURL=Controller.js.map