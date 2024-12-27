const express = require('express');
const router = express.Router();

// POST
const { postClient } = require("../controllers/postClient.js");
const { postVehicle } = require("../controllers/postVehicle.js"); 

// GET
const { getClientAll } = require('../controllers/getClientAll.js');
const { getClientExpired } = require('../controllers/getClientExpired.js');
const { getClientById } = require('../controllers/getClientById.js');

// PUT
const { putClient } = require('../controllers/putClient.js');
const { putVehicle } = require('../controllers/putVehicle.js'); 

// DELETE
const { deleteClient } = require('../controllers/deleteClient.js');
const { deleteVehicle } = require('../controllers/deleteVehicle.js'); 

// GET
router.get('/clientes-vencidos', getClientExpired);
router.get('/clientes', getClientAll);
router.get('/clientes/:id', getClientById);
router.get('/', (req, res) => {
  res.status(200).send( {msg: "Bienvenidos a la API de Asegurados" });
});

// POST
router.post('/clientes', postClient);
router.post('/vehiculo', postVehicle); 

// PUT
router.put('/clientes/:clientId', putClient);
router.put('/vehiculo/:vehicleId', putVehicle); 

// DELETE
router.delete('/clientes/:clientId', deleteClient);
router.delete('/vehiculo/:vehicleId', deleteVehicle); 

module.exports = router;
