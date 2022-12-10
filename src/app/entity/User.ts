import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Campo Obrigatório!'],
    },
    email: {
        type: String,
        trim: true,
        require: [true, 'Campo Obrigatório!'],
    },
    password: {
        type: String,
        require: [true, 'Campo Obrigatório!'],
        min: [6, 'Obrigatório pelo menos 6 caracteres']
    },
    confirmPassword: {
        type: String,
        require: [true, 'Campo Obrigatório!'],
        min: [6, 'Obrigatório pelo menos 6 caracteres']
    },
    city: {
        type: String,
        require: [true, 'Campo Obrigatório!']
    },
    state: {
        type: String,
        require: [true, 'Campo Obrigatório!'],
        max: [2, 'Informe a UF do estado. Ex: BA, SP, etc']
    },
})


export default mongoose.model("User", UserSchema);

// @Entity()
// class User {

//     @ObjectIdColumn()
//     id: ObjectID

//     @Column('text')
//     name: string

//     @Column('text')
//     email: string

//     @Column('text')
//     password: String

//     @Column('text')
//     confirmPassword: String

//     @Column('text')
//     city: String

//     @Column('text')
//     state: String

// }

// export default User;