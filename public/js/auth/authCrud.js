import { crearUsuario } from "./auth.js";
import {login} from "./login.js"

document.getElementById('registerForm').addEventListener('submit',crearUsuario);
document.getElementById('loginForm').addEventListener('submit',login);