'use strcit'
import jwt from 'jsonwebtoken'

const secretKey = '@LlaveAcademica@'

export const generateJwt = async(payLoad)=>{
    try {
        return jwt.sign(payLoad, secretKey, {
            expiresIn: '3h',
            algorithm: 'HS256'
        })
    } catch (error) {
        console.error(error)
        return error
    }
}