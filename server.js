const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'valeriaguerra'
});

db.connect((error)=>{
    if (error){
        throw error;
    }
    console.log("Base de datos conectada")
});

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/dashboard.html')));


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());



app.post('/submit',(req,res)=>{
    const categoria = req.body.categoria;
    const descripcion = req.body.descripcion;  
    console.log(`${categoria}`);
    console.log(`${descripcion}`);
    

    if(!categoria || !descripcion){
        return res.status(400).send ('todos los campos son obligatorios');
    }

    const sql= 'INSERT INTO categoria(categoria, descripcion) VALUES(?,?)';
    db.query(sql,[categoria,descripcion],(err,result)=>{
        if(err){
            return res.status(505).send('Error al insertar los datos en la base de datos ');
        }
        res.send('Registro exitoso');
        });
});



app.listen(port,()=>{
    console.log('servidor corriendo en http://localhost:3000');
});

