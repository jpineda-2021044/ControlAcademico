'use strict'

import Student from './student.model.js'
import { generateJwt } from '../utils/jwt.js'
import { encrypt, checkPassword} from '../utils/validator.js'

export const register = async (req, res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'STUDENT'
        let student = new Student(data)
        await student.save()
        return res.send({message:  'registered successfully' })
    }  catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error registering student', error})
    }
}

export const login = async (req, res)=>{
    try {
        let{email, password} = req.body
        let student = await Student.findOne({email})
        if(student && await checkPassword(password, student.password)){
            let loggedStudent ={
                sid: student._id,
                email: student.email,
                name: student.name,
                role: student.role
            }
            let token = await generateJwt(loggedStudent)
            return res.send({ message: `Welcome ${student.name}`, loggedStudent, token})
        }
        return res.status(404).send({message: 'Invalid credentials'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'failed to login'})
    }
}

export const update = async(req,res)=>{
    try {
        let {_id} = req.student
        let data = req.body
        let updateStudent = await Student.findOneAndUpdate(
            {_id:_id},
            data,
            {new:true}
        )
        if(!updateStudent) return res.status(444).send({message:'Student not found and not updated'})
        return res.send(updateStudent)
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error Updating Student'})
    }
}

export const deleteS = async(req, res)=>{
    try {
        let { id } = req.params
        let deletedStudent = await Student.finOneAndDelete({_id: id})
        if (!deletedStudent) return res.status(404).send({ message: 'Student not found and not deleted' })
        return res.send({ message: `Student with username ${deletedStudent.name} deleted successfully` })
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Error deleting student'})
    }
}

export const search = async (req, res) =>{
    try {
        let { search } = req.body
        let subject = await Student.find(
            {name: search}
        ).populate('subject',['name', 'description'])
        if(subject.leght == 0) return res.status (404).send({message: 'Class not found'})
        return res.send({message:'Class found', subject})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error searching class'})
    }
}