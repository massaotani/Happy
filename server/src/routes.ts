import {Router} from 'express'; //Módulo de rotas do express para substituir o "app" do server.ts
import OrphanagesController from './controllers/OrphanagesController';

// Além de importar o multer, precisa-se importar a config de como serão armazenadas os uploads:
import multer from 'multer';
import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

//Assim são estabelecidas as conexões com os Controllers:

// Cadastro de Orfanato
// Aqui se encaixa o Multer, visto que é no cadastro de orfanatos que se faz o Upload de imagens.
routes.post('/orphanages', upload.array('images'), OrphanagesController.create); 
                    /*.array() pois são várias imagens*/
                    /*.single() se é somente uma imagem*/

//Listar os Orfanatos
routes.get('/orphanages', OrphanagesController.index);

//Detalhe do orfanato
routes.get('/orphanages/:id', OrphanagesController.show);

//Métodos comuns: index, show, create, update e delete

//NÃO ESQUECER DE EXPORTAR AS ROTAS, se não as informações não saem do servidor
//IMPORTANTE: dar import routes from './routes' no server e estabelecer a conexão através do: app.use(routes);
export default routes;