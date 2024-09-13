const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const morgan = require('morgan');
const { info } = require('console');
const { get } = require('http');


  



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

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    db.query('SELECT * FROM categoria', (err, categorias) => {
      if (err) {
        res.json(err);
        return;
      }
  
      db.query('SELECT * FROM producto', (err, productos) => {
        if (err) {
          res.json(err);
          return;
        }

        db.query('SELECT * FROM usuario', (err, usuarios) => {
            if (err) {
              res.json(err);
              return;
            }
  
        res.render('dashboard', {
          categorias: categorias,
          data: productos,
          usuarios: usuarios
        });
      });
    });
  });
    });

app.use(express.static(path.join(__dirname, 'public')));

app.post('/dashboard',(req,res)=>{
    res.render('dashboard')
});


app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
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

    const insertar = 'INSERT INTO categoria(categoria, descripcion) VALUES(?,?)';
    db.query(insertar,[categoria,descripcion],(err,result)=>{
        if(err){
            return res.status(505).send('Error al insertar los datos en la base de datos ');
        }
        res.redirect('/#agregarCategoria');
        });
});



app.post('/aggproducto',(req,res)=>{
    const categoria1 = req.body.categoria;
    const Nombre_Producto = req.body.Nombre_Producto;
    const cantidad = req.body.cantidad;
    const precio = req.body.precio;

     
    

    if(!categoria1 || !cantidad || !Nombre_Producto || !precio){
        

        return res.render('dashboard',{
            categorias: [], // Aquí deberías pasar las categorías necesarias
            data: [] // Aquí deberías pasar los productos necesarios
            
        });
        
};

    const insertar= 'INSERT INTO producto(Precio, Cantidad, categoria1, Nombre_Producto) VALUES(?,?,?,?)';
    db.query(insertar,[precio,cantidad,categoria1,Nombre_Producto],(err,result)=>{
        if(err){
            return res.redirect('/#agregarProducto');
        }
        res.redirect('/#agregarProducto');
        });
        
});

    



app.listen(port,()=>{
    console.log('servidor corriendo en http://localhost:3000');
});

