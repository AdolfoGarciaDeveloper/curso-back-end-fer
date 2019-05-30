const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchea = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        require:'Email address is required'
    },
    password: String,
    created: {
        type: Date,
        default: Date.now()
    }
})

userSchea.pre('save', function(next){
    let user= this
    if (!user.isModified('password')) return next()

    bcrypt.genSalt(10,(err,salt)=>{
        if (err) return next(err)
        
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) return next(err)

            user.password = hash
            next()
        })
    })
})
//nombre de la coleccion y el esquema 
module.exports = mongoose.model('User', userSchea)