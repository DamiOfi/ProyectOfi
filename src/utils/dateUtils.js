const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  
  // Función para convertir la fecha a `dd de mes del año`
  const dateToJSDate = (date) => {
    const jsDate = new Date(date); 
    const day = jsDate.getDate().toString().padStart(2, '0');
    const month = monthNames[jsDate.getMonth()];
    const year = jsDate.getFullYear();
    return `${day} de ${month} del ${year}`;
  };
  
  module.exports = { dateToJSDate };
  