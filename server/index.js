const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const {mongoose} = require ('./database')

// Settings
app.set('port',process.env.PORT || 3000);

//Middlewares 
app.use(cors());
app.use(express.json());



//Rutas
app.use('/api/login', require('./routes/login.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));

app.use('*',(req, res) => {
  res.send('Esta ruta no es valida');
});


// Starting Server
app.listen(app.get('port'), () =>{
  console.log('server on port ',app.get('port'));
})



 