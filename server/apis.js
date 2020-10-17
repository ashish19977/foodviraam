const router = require('express').Router()
const User = require('./user')
const { checkUserAlreadyExists, 
    hashPassword, 
    validateRequest, 
    checkPassword, 
    checkUserExists, 
    saveToken, 
    checkLogin, 
    logout,
    changePassword
} = require('./utils')

router.post('/signup', async (req,res)=>{
    try{
        const user = req.body
        await validateRequest(user)
        await checkUserAlreadyExists(user.email)
        await hashPassword(user)
        let newUser = new User(user) 
        newUser = await newUser.save()
        newUser.password = undefined
        res.send({ data: newUser, status: 200})
    }catch(e){
        res.send({ data: e.message, status: 500})
    }
})


router.post('/signin', async(req,res) => {
    try{
        const user = req.body
        const password = await checkUserExists(user.email)
        if(await checkPassword(user.password, password)){
            const userInDb = await saveToken(user.email)
            res.send({ data: userInDb, status: 200 })
            return
        }
        throw Error('Incorrect Password')
    }catch(e){
        console.error(e)
        res.send({ data: e.message, status: 500 })
    }
})


router.post('/changepassword', async (req,res)=>{
    try{
        const token = req.headers.authorization
        if(!token)
            throw Error('No taken found')
        await changePassword(token.substring(7,), req.body.newPassword, req.body.oldPassword)
        res.send({ data: 'success', status: 200 })        
    }catch(e){
        res.send({ data: e.message, status: 500 })
    }
})


router.post('/logout', async (req,res)=>{
    try{
        const token = req.headers.authorization
        if(!token)
            throw Error('No taken found')
        await logout(token.substring(7,))
        res.send({ data: 'success' , status: 200 })
    }catch(e){
        res.send({ data: e.message, status: 500 })
    }
})


router.post('/checklogin', async(req,res) => {
    try{
        const token = req.headers.authorization
        if(!token)
            throw Error('No taken found')
        const user = await checkLogin(token.substring(7,))
        res.send({ data: user, status: 200 })
    }catch(e){
        res.send({ data: e.message, status: 500 })
    }
})

router.get('*',(req,res)=>{
    return res.send('invalid endpoint').status(400)
})

module.exports = router