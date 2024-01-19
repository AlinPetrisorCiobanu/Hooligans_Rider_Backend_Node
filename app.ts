import express from "express";
import CONFIDENCE from "./src/config/config_conexion";
import conexionBBD from "./src/database/DataBase";
import cors from "cors";
import router_user from "./src/Entities/Users/Router";


//initalization
const app = express();
app.listen(CONFIDENCE.PORTDB,()=>{
    console.log("Servidor OK")
})

//middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())
app.use('/api/user',router_user)

//instancio la base de datos
conexionBBD;

export default app