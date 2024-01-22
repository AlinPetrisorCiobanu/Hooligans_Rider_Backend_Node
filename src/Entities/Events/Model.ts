import {model,Schema,Document} from "mongoose";
export interface EventModel extends Document {
    id : any,
    name : string , 
    data : string ,
    date : string,
    hour : string,
    img : string,
    details : string,
    id_user : string ,
    maps : string,
    particiapnts : string,
    is_active : boolean,
    confirmed : boolean,
}
export const events_Schema = new Schema({
    name : {
        type : String,
        require : true,
        minlength: 2,
        maxlength: 80
        },
    data: {
        type : String,
        require : true,
        minlength: 2,
        maxlength: 500
        },
    date: {
        type : String,
        require : true,
        },
    hour: {
        type : String,
        require : true,
        },
    img: {
        type : String,
        require : true,
        },
    details: {
        type : String,
        require : true,
        minlength : 2,
        maxlength : 800,
        },
    id_user: {
        type : String,
        ref : "User"
        },
    maps:{
        type:String,
        require:true,
    },
    participants:{
        type:String,
        default : 1 ,
    },
    is_active:{
        type:Boolean,
        default : false
    },
    confirmed:{
        type:Boolean,
        default : false
    },
},{versionkey:true,timestamps:true});


const Event = model<EventModel>('Events',events_Schema);

export default Event;