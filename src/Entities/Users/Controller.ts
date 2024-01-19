import CONFIDENCE from "../../config/config_conexion"
import User, { UserModel } from "./Modelo"
import bcrypt from 'bcrypt'

export const register =async (data:UserModel) => {

    
    data.password = await bcrypt.hash(data.password , CONFIDENCE.LOOPDB)

    try {
        await new User(data).save()
        return "Gracias por Registrarte"
    } catch (error) {
        throw new Error ("BAD_REQUEST")
    }
}