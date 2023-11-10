import { db } from "../firebaseConfig";
import { ref, push, get, child } from "firebase/database";

import { getDownloadImage, uploadImage } from "../utils/utilsImage";
import { errorMessage, successMessage } from "./utilsMessage";

/**
 * Enviar registro a la DB de Firebase
 *
 * @param data Datos del registro
 * @param image Imagen a subir a storage Firebase
 * @author wlopera
 *
 * return Identificador del resgitro generado
 */
export const addRecordDB = async (data, image) => {
  try {
    if (image) {
      const filename = `${data.firstname}_${
        data.lastname
      }_${new Date().getTime()}.png`;

      const response = await uploadImage(image, filename);
      if (response.code === 200) {
        //console.log(response);
        data.image = response.data;
      } else {
        Alert.alert("Error", response.message);
        return;
      }
    }

    console.log("Payload de datos =>", data);
    const dbRef = ref(db, "dates/");
    push(dbRef, data);

    return successMessage("", "Imagen subida exitosamente");
  } catch (error) {
    return errorMessage("Error agregando registro a la DB", error);
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
export const getAllDB = async () => {
  try {
    const dbRef = ref(db);
    const response = await get(child(dbRef, "dates/"));

    if (response.exists()) {
      const records = await getDataWithImage(response.val());
      return successMessage(records, "Lista de registros de la DB exitosa");
    } else {
      return successMessage([], "No hay data disponible");
    }
  } catch (error) {
    return errorMessage("Error consultando los registros de la DB", error);
  }
};

/**
 * Permite armar la data y consultar las imagenes del storage de firebase
 * 
 * @param data Data a procesar
 * @author wlopera
 * @returns  Lista de datos
 */
const getDataWithImage = async (data) => {
  const records = [];
  for (const key of Object.keys(data)) {
    const value = data[key];
    const repImage = await getDownloadImage(value.image);
    const image = repImage.code === 200 ? repImage.data : null;
    records.push({ ...value, id: key, image: image });
  }
  return records;
};
