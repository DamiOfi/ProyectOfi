const express = require('express');
const router = express.Router();

// Importa el controlador
const { getClientExpired } = require('../controllers/getClientExpired');
const { postClient } = require("../controllers/postClient");

// Define la ruta GET que llama al controlador
router.get('/clientes-vencidos', getClientExpired );

router.post('/clientes-vencidos', getClientExpired );

module.exports = router;
