/**
 * Meses en español
 */
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

/**
 * Obtener la fecha de cumpleaños
 * 
 * @param date Fecha actual
 * @return Texto con la fecha
 */
export const converDate = (date) => {
  const words = date.split("/");
  const value = parseInt(words[1]) - 1;
  return `${words[0]} de ${months[value]}`;
};

/**
 * Obtener la edad
 * 
 * @param date Fecha actual
 * @return Texto con la edad
 */
export const getAge = (date) => {
  const words = date.split("/");
  const year = words[2];
  const currentYear = new Date().getFullYear();
  if (year) {
    const age = currentYear - year;
    return `${age} años`;
  }
  return "";
};

