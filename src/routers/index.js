const express = require('express');
const router = express.Router();

// POST
const { postClient } = require("../controllers/postClient.js");
const { postVehicle } = require("../controllers/postVehicle.js"); // Cambié "postCar" por "postVehicle"

// GET
const { getClientAll } = require('../controllers/getClientAll.js');
const { getClientExpired } = require('../controllers/getClientExpired.js');

// PUT
const { putClient } = require('../controllers/putClient.js');
const { putVehicle } = require('../controllers/putVehicle.js'); // Cambié "putCar" por "putVehicle"

// DELETE
const { deleteClient } = require('../controllers/deleteClient.js');
const { deleteVehicle } = require('../controllers/deleteVehicle.js'); // Cambié "deleteCar" por "deleteVehicle"

// GET
router.get('/clientes-vencidos', getClientExpired);
router.get('/clientes', getClientAll);

// POST
router.post('/clientes', postClient);
router.post('/vehiculo', postVehicle); // Cambié "postCar" por "postVehicle"

// PUT
router.put('/clientes/:clientId', putClient);
router.put('/vehiculo/:vehicleId', putVehicle); // Cambié ":carId" por ":vehicleId"

// DELETE
router.delete('/clientes/:clientId', deleteClient);
router.delete('/vehiculo/:vehicleId', deleteVehicle); // Cambié ":carId" por ":vehicleId"

module.exports = router;
