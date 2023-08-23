export default interface Muscle {
    id?: number;
    name?: string;
  }

    // const handleLevelChange = async (newLevel: string | null) => {
  //   if (!currentUser) {
  //     console.error('Usuario no autenticado');
  //     return;
  //   }

  //   if (newLevel === null) {
  //     return; // Salir si no se seleccionó ningún nivel
  //   }

  //   try {
  //     setUserLevel({ username : currentUser, level: newLevel });
  //     console.log(userLevel)
  //     await editLevel( userLevel);
  //   } catch (error) {
  //     console.error('Error al cambiar el nivel:', error);
  //   }
  // };