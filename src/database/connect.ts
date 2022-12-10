import mongoose from "mongoose";
import { DB } from "./config";

export default function setup() {
    mongoose.set('strictQuery', false);
    mongoose.connect(DB.uri).then(() => console.log('Connectou no Banco de dados!!'))
}



//mongoose.connect(DB.uri).then(() => console.log('Connectou no Banco dados!!'));