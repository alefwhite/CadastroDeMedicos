const { Router } = require('express');
const routes = new Router();

const UsuarioController = require('./controllers/UsuarioController');
const SessionController = require('./controllers/SessionController');
const MedicoController = require('./controllers/MedicoController');
const EspecialidadesMedicoController = require('./controllers/EspecialidadesMedicoController');
const EspecialidadeController = require('./controllers/EspecialidadeController');

const authMiddleware = require('./middlewares/auth');

routes.get('/medicos', MedicoController.get);
routes.get('/especialidades', EspecialidadeController.get);
routes.get('/medespecialidade/:id', EspecialidadesMedicoController.get);

routes.post('/login', SessionController.store);

//routes.use(authMiddleware);

routes.post('/usuario', authMiddleware, UsuarioController.store);
routes.post('/medicos', authMiddleware, MedicoController.store);
routes.post('/medespecialidade', authMiddleware, EspecialidadesMedicoController.store);

routes.delete('/medicos/:id', authMiddleware, MedicoController.delete);
routes.put('/medicos/:id', authMiddleware, MedicoController.update);

module.exports = routes;