'use strict'

import Class from './class.model.js'

export const save = async(req, res)=>{
    try {
        let data = req.body
        let clase = new Class(data)
        await clase.save()
        return res.send({message: 'class saved succesfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error saving class'})
    }
}

export const update = async (req, res)=>{
    try {
        let { id } = req.params
        let data = req.body
        let updateClass = await Class.findOneAndUpdate(
            {_id: id },
            data,
            { new: true}
        )
        if(!updateClass) return res.status(401).send({message: 'Class not found and not update'})
        return res.send({message: 'Update class', updateClass})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating class'})
    }
}


export const deleteC = async(req, res)=>{
    try {
        let { id } = req.params
        let deleteC = await Class.findOneAndDelete({_id:id})
        if(!deleteC) return res.status(400).send({message: 'Class not fount and not deleted'})
        return res.send({message: 'Class deleted successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting class'})
    }
}

export const search = async(req, res)=>{
    try {
        let clases = await Class.find()
        return res.send({clases})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting class'})
    }
}