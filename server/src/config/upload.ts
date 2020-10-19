// Multer: Biblioteca voltada para UPLOAD de arquivos
import multer from 'multer';
import path from 'path';

// NÃO SE ESQUECER DE IMPORTAR NAS ROTAS O MULTER E REFERENCIAR ESSA CLASSE
export default {
    storage: multer.diskStorage({
        // Onde os arquivos serão armazenadas
        destination: path.join(__dirname, '..', 'database', 'uploads'),
        // Gera um novo nome de arquivo
        filename: (request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;

            cb(null, fileName); // callback sempre recebe erro e o nome do arquivo como parametros
        }
    })
}