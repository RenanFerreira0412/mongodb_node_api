import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nome é um campo obrigatório!'],
    },
    email: {
        type: String,
        trim: [true, 'Email é um campo obrigatório!'],
    },
    password: {
        type: String,
        require: [true, 'Senha é um campo obrigatório!']
    },
    confirmPassword: {
        type: String,
        require: [true, 'Campo Obrigatório!'],
    },
    city: {
        type: String,
        require: [true, 'Cidade é um campo obrigatório!']
    },
    state: {
        type: String,
        require: [true, 'Estado é um campo obrigatório!'],
    },
}, { timestamps: true })


export default mongoose.model("User", UserSchema);