const tokens = require('../../token')

function isAuth(req, res, next){
    if(!req.headers.authorization) return res.status(401).send({message:'No tienes autorización'})
    const token = req.headers.authorization
    console.log(token)

    tokens.verificateToken(token)
    .then(id => {
        req.user = id
        next()
    })
    .catch(error => {
        res.status(error.status).send({error:error.message})
    })
}

module.exports = isAuth