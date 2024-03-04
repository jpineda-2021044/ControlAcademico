import { initServer } from "./configs/app.js";
import { connect }  from "./configs/mongo.js"
import Teacher from "./src/teacher/teacher.model.js"
import  { encrypt} from './src/utils/validator.js'

const userDefualt = async()=>{
    try {
        const existUser = await Teacher.findOne()
        if(!existUser){
            const newUser = new Teacher({
                name: "Juan",
                surname: "Pineda",
                username: "pepito",
                email: "gmail",
                password: "12345678",
                address: "zona",
                phone: "12345678",
                role: "ADMIN"
 
            })
            newUser.password = await encrypt(newTeacher.password)
            await newUser.save()
            console.log('User default created', newUser)
        }
        return console.log('User default exists')
    } catch (error) {
        console.error(error)
        return error
    }
}

userDefualt()
initServer()
connect()