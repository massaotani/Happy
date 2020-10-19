import express from "express";
import path from "path";
import cors from 'cors';

import "express-async-errors";
import errorHandler from './errors/handler';

import "./database/connection";

import routes from "./routes";

const app = express();

app.use(cors());
/* Em ambiente de produção: 
app.use(cors({ origin: [] })); <- Qual endereço do frontend que gostaria de permitir acesso*/
app.use(express.json());
app.use(routes); //Depois do express.json() sempre

// Para conseguir renderizar a imagem através de onde ela está sendo guardada
app.use(
  "/uploads",
  express.static(path.join(__dirname, "database", "uploads"))
);

app.use(errorHandler);

// nodeJS -> REQ / RESP
//Rota -> conjunto
//Recurso -> usuário
//Métodos HTTP -> GET / POST / PUT / DELETE
//GET: Buscando uma informação.
//POST: Criando uma informação nova.
//PUT: Editando uma informação.
//DELETE: Deletando uma informação.
//Parâmetros
//Query params: http://localhost:3333/users?search=diego&page=2
//Route params: http://localhost:3333/users/{id} (Identificar um recurso)
//Body: http://localhost:3333/users {Informações mais complexas}

app.listen(3333);
