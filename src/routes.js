import { Router } from "express";

import UserController from "./app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";
import EpiController from "./app/controllers/EpiController.js";
import FuncionarioController from "./app/controllers/FuncionarioController.js";
import FichaEpiController from "./app/controllers/FichaEpiController.js";
import EpiEntregueController from "./app/controllers/EpiEntregueController.js";
import authToken from "./middlewares/authToken.js";

const routes = new Router()

routes.get('/', (request, response) => {
    return response.status(200).json({message: "Hello "})
})

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authToken)

routes.post('/epi', EpiController.store);
routes.patch('/epi/add-estoque', EpiController.addstock);
routes.get('/epi', EpiController.index)
routes.delete('/epi/:id', EpiController.delete);

routes.post('/funcionarios', FuncionarioController.store);
routes.get('/funcionarios', FuncionarioController.index);
routes.delete('/funcionarios/:id', FuncionarioController.delete)

routes.post('/entrega', EpiEntregueController.store);
routes.get('/ficha/:funcionario_id', FichaEpiController.show); 
routes.get('/ficha', FichaEpiController.index); 


export default routes