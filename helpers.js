const xlsx = require('xlsx');

// Función para leer el archivo Excel y devolver los datos en formato JSON
const filterClients = () => {
    const workbook = xlsx.readFile('ASEGURADOS_COPIA.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
};

module.exports = { filterClients };