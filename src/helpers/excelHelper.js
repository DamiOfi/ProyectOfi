const xlsx = require('xlsx');

// Arreglo con los nombres de los meses en español
const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

// Función para convertir la fecha en formato numérico de Excel a `dd de mes del año`
const excelDateToJSDate = (serial) => {
    const excelBaseDate = new Date(1899, 11, 30);
    const jsDate = new Date(excelBaseDate.getTime() + serial * 24 * 60 * 60 * 1000);
    const day = String(jsDate.getDate());
    const month = monthNames[jsDate.getMonth()];
    const year = jsDate.getFullYear();
    return `${day} de ${month} del ${year}`;
};

// Función para leer el archivo Excel y devolver los datos en formato JSON desde la fila 7
const filterClients = () => {
    const workbook = xlsx.readFile('ASEGURADOS_COPIA.xlsm');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { range: 6 });

    const updatedData = data.map(asegurado => {
        if (asegurado['Fecha Vencimiento']) {
            asegurado['Fecha Vencimiento'] = excelDateToJSDate(asegurado['Fecha Vencimiento']);
        }
        return asegurado;
    });
    return updatedData;
};

module.exports = { filterClients };
