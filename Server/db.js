import { createPool } from 'mysql2/promise';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const pool = createPool({
   host:'localhost',
   port: 3306,
   user: 'root',
   password: '',
   database: 'valeria_guerra'
});

export class UserRepository {
   // Función para crear un usuario
   static async create({  }) {
     
   }
 
   // Función para hacer login
   static async login({ user, password }) {
     try {
       // Verificar si el usuario existe en la base de datos
       const [results] = await pool.execute('SELECT * FROM user WHERE username = ?', [user]);
 
       // Si el usuario no existe
       if (results.length === 0) {
         throw new Error('El usuario no existe');
       }
 
       const storedUser = results[0]; // Obtener el primer (y único) usuario
 
       // Comparar la contraseña proporcionada con la almacenada en la base de datos
       const passwordMatch = await bcrypt.compare(password, storedUser.password);
 
       // Si las contraseñas no coinciden
       if (!passwordMatch) {
         throw new Error('La contraseña es incorrecta');
       }
 
       // Si las credenciales son correctas, devolver los datos del usuario
       console.log('Login exitoso');
       return { id: storedUser.id, username: storedUser.username }; // O lo que necesites
 
     } catch (err) {
       console.error('Error en el login:', err.message);
       throw err; // Lanza el error para que lo manejes fuera de este método si es necesario
     }
   }
 }

