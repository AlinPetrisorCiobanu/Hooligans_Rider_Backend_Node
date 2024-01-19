import express from "express";
import CONFIDENCE from "./src/config/config_conexion";
import conexionBBD from "./src/config/DataBase";
import cors from "cors";

//initalization
const app = express();
app.listen(CONFIDENCE.PORTDB,()=>{
    console.log("Servidor OK")
})

//middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())

//instancio la base de datos
conexionBBD;


export default app