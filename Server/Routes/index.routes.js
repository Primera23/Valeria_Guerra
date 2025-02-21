import {Router} from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));

});



export default router;
