const mongose = require('mongoose')

const userSchema = mongose.Schema({
    email: { type: String, required: true, },
    password: { type: String, required: true, },
    sex: { type: Number, default: 1, required: true, },
    name: { type: String, },
    tokens: [String]
})

module.exports = User = mongose.model('User',userSchema)