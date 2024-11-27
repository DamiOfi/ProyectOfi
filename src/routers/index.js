const express = require('express');
const router = express.Router();

//POST
const { postClient } = require("../controllers/postClient.js");
const { postCar } = require("../controllers/postCar.js");

//GET
const { getClientAll } = require('../controllers/getClientAll.js');
const { getClientExpired } = require('../controllers/getClientExpired.js');

//PUT
const { putClient } = require('../controllers/putClient.js');
const { putCar } = require('../controllers/putCar.js');

//DELETE
const { deleteClient } = require('../controllers/deleteClient.js');
const { deleteCar } = require('../controllers/deleteCar.js');


//GET
router.get('/clientes-vencidos', getClientExpired );
router.get('/clientes', getClientAll );

//POST
router.post('/clientes', postClient );
router.post('/vehiculo', postCar );

//PUT
router.put('/clientes/:clientId', putClient );
router.put('/vehiculo/:carId', putCar );

//DELETE
router.delete('/clientes/:clientId', deleteClient);
router.delete('/vehiculo/:carId', deleteCar);

module.exports = router;

