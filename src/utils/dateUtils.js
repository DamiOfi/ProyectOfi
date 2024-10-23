// Arreglo con los nombres de los meses en español
const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

// Función para convertir la fecha en formato numérico de Excel a `dd de mes del año`
const excelDateToJSDate2 = (serial) => {
    const excelBaseDate = new Date(1899, 11, 30);
    const jsDate = new Date(excelBaseDate.getTime() + serial * 24 * 60 * 60 * 1000);
    const day = String(jsDate.getDate());
    const month = monthNames[jsDate.getMonth()];
    const year = jsDate.getFullYear();
    return `${day} de ${month} del ${year}`;
};

module.exports = { excelDateToJSDate2 };
