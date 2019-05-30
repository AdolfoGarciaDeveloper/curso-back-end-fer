const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const token = require ('../../token')
create = (req, res) => {    
    const user = new User(req.body)
    user.save((err, userCreated) => {
        if(err) return res.status(500).send({error: `${err}`})

        return res.status(201).send({userCreated})
    })
}

getAll = (req, res) => {
    User.find({},(err, users) => {
        if(err) return res.status(500).send({error: `${err}`})
        if(!users) return res.status(404).send({message: `No existen usuarios`})

        return res.status(200).send({users})
    })
}

const getUser = (req, res) => {
    let idUser = req.params.id        
    User.findById({_id: idUser},(err, users) => {
        if(err) return res.status(500).send({error: `${err}`})
        if(!users) return res.status(404).send({message: `No existen usuarios`})

        return res.status(200).send({users})
    })
} 
const updateUser = (req, res) => {
    let idUser = req.params.id
    let data = req.body

    User.findByIdAndUpdate(idUser, data, {new:true},(err,userUpdate) => {
        if(err) return res.status(500).send({error: `${err}`})

        return res.status(200).send({user: userUpdate})
    })
}
const deleteUser = (req, res) => {
    let idUser = req.params.id    

    User.findByIdAndDelete(idUser, (err,userDelete) => {
        if(err) return res.status(500).send({error: `${err}`})

        return res.status(200).send({message: "Usuario eliminado"})
    })
}

const login = (req, res) => {
    let emailUser = req.body.email
    let passwordUser = req.body.password
    User.findOne({email:emailUser}, (err,user) => {
        if(err) return res.status(500).send({error: `${err}`})
        if(!user) return res.status(404).send({message: `No existen usuarios`})
        if(!bcrypt.compareSync(passwordUser, user.password)) return res.status(404).send({message: `La contraseña no es correcta, VERIFICA TUS CREDENCIALES`})

        res.status(200).send({token:token.createToken(user)})
    })
}

module.exports = {
    create,
    getAll,
    getUser,
    updateUser,
    deleteUser,
    login
}