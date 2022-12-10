import mongoose from "mongoose";


const ActivitySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nome é um campo obrigatório!'],
    },
    deadline: {
        type: Date,
        require: [true, 'Data de entrega é um campo obrigatório!'],
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Activity', ActivitySchema);