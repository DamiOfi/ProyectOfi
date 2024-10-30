const xlsx = require('xlsx');

// Función para leer el archivo Excel y devolver los datos en formato JSON desde la fila 7
const filterClients = () => {
    /* const workbook = xlsx.readFile('ASEGURADOS_COPIA.xlsm'); */
    const workbook = xlsx.readFile('ASEGURADOS DEFINITIVO.xlsm');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { range: 6 });

    return data;
};

module.exports = { filterClients };
