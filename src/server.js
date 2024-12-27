const express = require("express");
const router = require("./routers/index");
const cors = require("cors");

const server = express();

// Configuración de CORS para permitir todas las solicitudes
server.use(cors({
  origin: '*', // Permitir todos los orígenes
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

server.use(express.json());

server.use(router);

module.exports = server;