import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { port } from './config.js';
import indexRoutes from './Routes/index.routes.js'
import categoriaRoutes from './Routes/categoria.routes.js'
import authRoutes from './Routes/auth.routes.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(indexRoutes);
app.use(categoriaRoutes);
app.use(authRoutes);
app.use(express.static(path.join(__dirname, '..', 'public')));


app.listen(port)
console.log(`Servidor corriendo en el https://localhost::${port}`)