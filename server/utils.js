const User = require('./user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 

const validateRequest = async user => {
    if(!user.email){
        throw Error('Email is required')
    }
    if(!user.password){
        throw Error('Password is required')
    }
}

const checkUserAlreadyExists = async email => {
    const user = await User.findOne({ email })
    if(user)
        throw Error('User already exists')
}

const checkUserExists = async email => {
    const user = await User.findOne({ email })
    if(user)
        return user.password
    throw Error('Email Not Found')
}

const checkPassword = async (password, hash) => await bcrypt.compare(password, hash)

const hashPassword = async user => user.password = await bcrypt.hash(user.password,8)

const saveToken = async email => {
    const token = jwt.sign({email: email+ '|' + Date.now().toString()}, 'MYSECRETKEY') // should be in .env file
    let user = await User.findOneAndUpdate({ email }, { $push: { tokens: token } }, { useFindAndModify: false })
    if(user){
        user = user.toObject()
        user.tokens = undefined
        user.password = undefined
        user.token = token
        return user
    }
    throw Error('User not found')
}

const checkLogin = async token => {
    try{
        const { email } = await jwt.verify(token,'MYSECRETKEY')
        const user = await User.findOne({ email: email.split('|')[0],  tokens: token  },{ password: 0, tokens: 0})
        if(user)
            return user
        throw Error('Not a valid token')
    }catch(e){
        throw e
    }
}

const logout = async token => {
    try{
        const { email } = await jwt.verify(token,'MYSECRETKEY')
        const user = await User.findOneAndUpdate({ email: email.split('|')[0],  tokens: token  }, { $pull: { tokens: { $elemMatch: token} } }  , { useFindAndModify: false })
        if(!user)
            throw Error('Not a valid token')
    }catch(e){
        throw e
    }
}

const changePassword = async (token, newPassword, oldPassword) => {
    try{
        const { email } = await jwt.verify(token,'MYSECRETKEY')
        let user = await User.findOneAndUpdate({ email: email.split('|')[0],  tokens: token  },{ useFindAndModify: false })
        if(!user)
            throw Error('Not allowed')
        if(!await checkPassword(oldPassword, user.password))
            throw Error('Wrong old password')
        user = user.toObject()
        user.password = newPassword
        await hashPassword(user)
        await User.findOneAndUpdate({ email: email.split('|')[0],  tokens: token  }, { password: user.password }, { useFindAndModify: false })
    }catch(e){
        throw e
    }
}

module.exports = { 
    validateRequest, 
    checkUserAlreadyExists, 
    hashPassword, 
    checkPassword, 
    checkUserExists, 
    saveToken, 
    checkLogin, 
    logout,
    changePassword,
}