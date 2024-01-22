import { DataToken } from "../../Types/Type_Auth";
import { UserModel } from "../Users/Modelo";
import Event, { EventModel } from "./Model";


export const new_event = async (data_token: DataToken, data_event: EventModel) => {

    const user_token: UserModel | undefined = data_token.user;
    const dateNow = new Date();

    if (!data_event.name || !data_event.data || !data_event.date || !data_event.hour || !data_event.img || !data_event.details || !data_event.maps) throw new Error('MISSING_DATA')

    if (user_token === undefined) throw new Error('INVALID_CREDENTIALS');
    if (user_token.role === "user") throw new Error('UNAUTHORIZATION');

    const date = new Date(`${data_event.date}`)
    const [hours, minuts] = data_event.hour.split(':').map(Number)

    if (hours < 6 && hours > 18) throw new Error('INVALID_CREDENTIALS')
    if (minuts < 0 && minuts > 59) throw new Error('INVALID_CREDENTIALS')

    if (!(date instanceof Date)) throw new Error('BAD_DATE_REQUEST');
    if (date < dateNow) throw new Error('INVALID_CREDENTIALS');

    try {
        data_event.id_user = data_token._id;
        data_event.is_active = true
        data_event.confirmed = false

        await new Event(data_event).save()
        return {
            succes: true,
            message: "Evento Creado",
            data: data_event
        }
    } catch (error) {
        throw new Error('BAD_REQUEST')
    }
}