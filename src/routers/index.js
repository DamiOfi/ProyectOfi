const express = require('express');
const router = express.Router();

//POST
const { postClient } = require("../controllers/postClient.js");
const { postCar } = require("../controllers/postCar.js");

//GET
const { getClientAll } = require('../controllers/getClientAll');
const { getClientExpired } = require('../controllers/getClientExpired');

//PUT
const { putClientId } = require('../controllers/putClientId');

//DELETE
const { deleteClientId } = require('../controllers/deleteClientId');


router.get('/clientes-vencidos', getClientExpired );

router.get('/clientes', getClientAll );

router.post('/clientes', postClient );
router.post('/vehiculo', postCar );

router.put('/clientes/:id', putClientId );

router.delete('/clientes/:id', deleteClientId);

module.exports = router;

