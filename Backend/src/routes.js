const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const BusinessController = require('./controllers/BusinessController');
const ProductsController = require('./controllers/ProductsController');
const AnnouncementsController = require('./controllers/AnnouncementsController');
const routes = express.Router();

routes.get('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),IncidentController.list);

routes.post('/incidents',IncidentController.create);
routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),IncidentController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}),ProfileController.index);

routes.post('/sessions', SessionController.create);

routes.get('/ongs',OngController.list);

routes.post('/ongs', celebrate({
    [Segments.BODY]:Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);


/* ************************************************************** */

routes.get('/business', BusinessController.search);
routes.get('/businesses', BusinessController.index);
routes.post('/businesses', BusinessController.create);

routes.get('/product', ProductsController.search);
routes.get('/products', ProductsController.index);
routes.post('/products', ProductsController.create);

routes.get('/advert', AnnouncementsController.search);
routes.get('/adverts', AnnouncementsController.index);
routes.post('/adverts', AnnouncementsController.create);
routes.put('/advert', AnnouncementsController.update);


routes.get('/teste', BusinessController.teste);

routes.get ('/', (req, res)=>{
    return res.json({Hello: "Mundo",
                    Ola:'World'
                });
});

module.exports = routes;