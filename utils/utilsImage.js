import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { errorMessage, successMessage } from "./utilsMessage";

/**
 * Enviar imagen a Firebase
 *
 * @param image Imagen a subir
 * @param filename Nombre de la Imagen
 * @author wlopera
 *
 * return Identificador de la imagen
 */
export const uploadImage = async (image, filename) => {
  try {
    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(storage, filename);

    // Agregar metadata al envio
    const metadata = {
      contentType: "image/png",
    };

    // Data de archivo o blob
    const result = await uploadBytes(storageRef, blob, metadata);
    return successMessage(result.metadata.name, "Imagen subida exitosamente");
  } catch (error) {
    return errorMessage("Error subiendo imagen al servidor", error);
  }
};

/**
 * Cargar imagen de Firebase
 *
 * @param filename Nombre de la Imagen
 * @author wlopera
 *
 * return Identificador de la imagen
 */
export const getDownloadImage = async (filename) => {
  try {
    const storageRef = ref(storage, filename);
    const response = await getDownloadURL(storageRef);
    return successMessage(response, "Imagen cargada exitosamente");
  } catch (error) {
    return errorMessage("Error en la carga de la imagen", error);
  }
};
