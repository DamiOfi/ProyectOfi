const xlsx = require('xlsx');

// Arreglo con los nombres de los meses en español
const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

// Función para convertir la fecha en formato numérico de Excel a `dd de mes del año`
const excelDateToJSDate = (serial) => {
    // La fecha base en Excel es el 1 de enero de 1900, pero hay que restar 1 debido a que Excel
    // cuenta el día 0 como 1 de enero de 1900.
    const excelBaseDate = new Date(1899, 11, 30);
    const jsDate = new Date(excelBaseDate.getTime() + serial * 24 * 60 * 60 * 1000);
    
    // Obtener día, mes y año
    const day = String(jsDate.getDate());
    const month = monthNames[jsDate.getMonth()]; // Obtener el nombre del mes desde el arreglo
    const year = jsDate.getFullYear();
    
    // Retornar la fecha en formato 'dd de mes del año'
    return `${day} de ${month} del ${year}`;
};

// Función para leer el archivo Excel y devolver los datos en formato JSON desde la fila 7
const filterClients = () => {
    // Leer el archivo Excel
    const workbook = xlsx.readFile('ASEGURADOS_COPIA.xlsm');

    // Obtener el nombre de la primera hoja del archivo Excel
    const sheetName = workbook.SheetNames[0];

    // Obtener los datos de esa hoja
    const sheet = workbook.Sheets[sheetName];

    // Convertir los datos a formato JSON desde la fila 7
    const data = xlsx.utils.sheet_to_json(sheet, {
        range: 6, // Comienza a leer desde la fila 7 (las filas son base 0, por lo que 6 es la séptima fila)
    });

    // Convertir la columna 'Fecha Vencimiento' al formato correcto
    const updatedData = data.map(asegurado => {
        // Convertir la fecha si está en formato numérico
        if (asegurado['Fecha Vencimiento']) {
            asegurado['Fecha Vencimiento'] = excelDateToJSDate(asegurado['Fecha Vencimiento']);
        }
        return asegurado;
    });

    return updatedData;  // Devuelve los datos con la fecha formateada en JSON
};

module.exports = { filterClients };
