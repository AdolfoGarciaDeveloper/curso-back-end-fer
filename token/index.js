const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../src/config')

function createToken (user){
    const payload = {
        sub: user._id, //id del usuario
        iat: moment().unix(),//fecha de creacion  del token
        exp: moment().add(10,"minute").unix(), //fecha de expiraación
        email: user.email
    }  
    return jwt.encode(payload, config.SECRET_KEY) 
}
function verificateToken(token){
    const decoded = new Promise((resolve, reject) => {
        try {
            const payloads = jwt.decode(token, config.SECRET_KEY, true)
            console.log(jwt.decode (token, config.SECRET_KEY, true))
            if(payloads.exp < moment().unix()){
                reject({
                    status: 500,
                    message: 'El token ha expirado'
                })
            }
            resolve(payloads.sub)
        }catch(error){
            reject({
                status:500,
                message: 'Token invalido'
            })
        }
    })
    return decoded
}
module.exports = {
    createToken,
    verificateToken
}
