import { Schema, model } from 'mongoose'

const studentSchema = Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    age:{
        type: String,
        minLegth: 1,
        maxLength: 2,
        required: true
    },
    subject:{
        type: Schema.Types.ObjectId,
        ref: 'class',
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        minLegth: [8, 'Password must be 8 characters'],
        required: true
    },
    role:{
        type: String,
        enum: ['ADMIN', 'STUDENT'],
        required: true
    }
})

export default model('student', studentSchema)