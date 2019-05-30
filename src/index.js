
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')



//settings
// asignando puerto
//app.set('port', process.env.PORT || 3000)




//conectar a la BD
//const urldb = 'mongodb+srv://gAdolfo:Naruto_1234A@cluster0-cfraq.mongodb.net/test?retryWrites=true'

mongoose.connect(config.db,{ useNewUrlParser: true }, (err, res) => {
    if (err) return console.log(`error al conectar a la db: ${err}`)

    console.log('conexión exitosa')

    //iniciar servidor
    app.listen(config.port, () => {
        console.log(`API REST escuchando en http://localhost:${config.port}`)
    })
})
