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
    database: 'valeria_guerra'
});

db.connect((error)=>{
    if (error){
        throw error;
    }
    console.log("Base de datos conectada")
});

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/public/index.html")
});

app.post('/submit',(req,res)=>{
  const{categoria,descripcion} = req.body;

  if (!categoria || !descripcion) {
    return res.status(400).json({success:false, message: 'Todos los campos son obligatorios'})
  }
  else if(/^\s/.test(categoria)){
      return res.status(400).json({success:false, message: 'No se admiten espacios al principio'})
  }
  else if(!/^[a-zA-Z\s]+$/.test(categoria)){
      return res.status(400).json({success:false, message: 'Digita solo letras en el nombre'})
  }
  else if(categoria.length > 20){
  return res.status(400).json({success:false, message:'El campo nombre no debe exceder de 50 caracteres'})
  }


  const insertar = 'INSERT INTO categoria(categoria, descripcion) VALUES(?,?)';
  db.query(insertar,[categoria,descripcion],(err,result)=>{
      if(err){
          return res.status(505).json({success:false, message:'No puedes registrar una categoria ya previamente ingresada'});
      }
      return res.status(200).json({ success: true, message: 'Registro exitoso' });
      });
});

app.get("/categoria", (req, res) => {

  const query = "SELECT * FROM categoria";
  db.query(query, (err, results) => {
      if (err) {
          return res.status(500).json({ success: false, message: 'Error al obtener categorias' });
      }
      res.json(results);
  });
});

app.get("/usuarios", (req, res) => {

  const query = "SELECT * FROM administrador";
  db.query(query, (err, results) => {
      if (err) {
          console.log(res.status(500))
          return res.json({ success: false, message: 'Error al obtener categorias' });
      }
      res.json(results);
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


    

app.delete('/categoria/:categoria',(req,res)=>{
  const {categoria} = req.params

 const eliminar = 'DELETE FROM categoria WHERE categoria = ?';
    db.query(eliminar, [categoria], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al eliminar la categoría' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }
        res.status(200).json({ success: true, message: 'Categoría eliminada correctamente' });
    });

})

app.patch('/categoria/:categoria', (req, res) => {
    const { categoria } = req.params;
    const { descripcion1, nuevoNombre } = req.body; // Obtener variables desde el cuerpo de la solicitud

    const actualizar = 'UPDATE categoria SET categoria = ?, descripcion = ? WHERE categoria = ?';
    db.query(actualizar, [nuevoNombre, descripcion1, categoria], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al actualizar' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }
        res.status(200).json({ success: true, message: 'Categoría actualizada correctamente' });
    });
});


app.listen(port,()=>{
    console.log('servidor corriendo en http://localhost:3000');
});

