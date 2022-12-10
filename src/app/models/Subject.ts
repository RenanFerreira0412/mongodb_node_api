import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nome é um campo obrigatório!'],
    },
    teacher: {
        type: String,
        require: false
    }
}, { timestamps: true });

export default mongoose.model('Subject', SubjectSchema);