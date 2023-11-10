/**
 * Mensage de Exito
 *
 * @param data Resultado de la consulta
 * @param mesage Mensaje al usuario
 * @author wlopera
 *
 * @returns Objeto de resultado exitoso
 */
export const successMessage = (data, message) => {
  return {
    status: "OK",
    code: 200,
    data: data,
    message: message,
  };
};

/**
 * Mensage de Exito
 *
 * @param mesage Mensaje al usuario
 * @param error Respuesta del error de la consulta
 * @author wlopera
 *
 * @returns Objeto de resultado erroneo
 */
export const errorMessage = (message, error) => {
  console.log(message, error);
  return {
    status: "ERROR",
    code: 400,
    message: message,
    error: error,
  };
};
