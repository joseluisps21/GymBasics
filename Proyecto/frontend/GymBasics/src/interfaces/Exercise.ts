export default interface Exercise {
    id?: string;
    name?: string;
    picture?: File;
    pictureUrl?: string; // Campo adicional para almacenar la URL de la imagen
    muscles?: string[];
    level?: string;
    focus?: string;
  }
  