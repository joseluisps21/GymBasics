import React, { useEffect, useState } from 'react';
import { IonAlert, IonButton, IonChip, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { editFocus, editLevel, getUserByUsername } from '../apis/UserApi';
import UserAuth from '../interfaces/UserAuth';
import { balloonOutline, flameOutline, flashOutline, pin, rocketOutline } from 'ionicons/icons';
import { getIconBasedOnLevel } from '../components/LevelChange';
import UserLevel from '../interfaces/UserLevel';
import UserFocus from '../interfaces/UserFocus';
import { getWorkoutCountByUsername, getWorkoutsByUsernameAndExerciseId } from '../apis/WorkoutApi';

const Tab1: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [userData, setUserData] = useState<UserAuth>({});
  const [workoutsCount, setWorkoutsCount] = useState<number>(0);
  const [userLevel, setUserLevel] = useState<UserLevel>({
    username: '',
    level: '',   
  });
  const [userFocus, setUserFocus] = useState<UserFocus>({
    username: '',
    focus: '',   
  });

  const OnRegister = () => {
    history.push('/register');
  };

  const OnLogin = () => {
    history.push('/login');
  };

  const OnFilterUser = async () => {
    try {
      const response = await getUserByUsername(currentUser);
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const OnLogout = () => {
    logout();
    window.location.reload();
  };

  const OnTrain = () => {
    history.push('/tab2');
  };

  const getFocusText = (focus: string | undefined) => {
    switch (focus) {
      case 'loseweight':
        return 'Perder Peso';
      case 'musclemass':
        return 'Ganar Masa Muscular';
      case 'mixed':
        return 'Mixto';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userWorkouts = await getWorkoutCountByUsername(currentUser);
        setWorkoutsCount(userWorkouts);
        const userData = await OnFilterUser();
        setUserData(userData);
        setUserLevel({
          username: currentUser,
          level: userData?.level || '', // Asignar el nivel actual del usuario
        });
      }
    };

    fetchUserData();
  }, [currentUser]);


  const handleLevelChange = async (newLevel: string | null) => {
    if (!currentUser) {
      console.error('Usuario no autenticado');
      return;
    }

    if (newLevel === null) {
      return; // Salir si no se seleccionó ningún nivel
    }

    try {
      const updatedUserLevel = { username: currentUser, level: newLevel };
      await editLevel(updatedUserLevel);

      // Actualizar la información del usuario después de cambiar el nivel
      const updatedUserData = await OnFilterUser();
      setUserData(updatedUserData);

      // Actualizar el estado del nivel
      setUserLevel(updatedUserLevel);
    } catch (error) {
      console.error('Error al cambiar el nivel:', error);
    }
  };

  const handleFocusChange = async (newFocus: string | null) => {
    if (!currentUser) {
      console.error('Usuario no autenticado');
      return;
    }

    if (newFocus === null) {
      return; // Salir si no se seleccionó ningún nivel
    }

    try {
      const updatedUserFocus = { username: currentUser, focus: newFocus };
      await editFocus(updatedUserFocus);

      // Actualizar la información del usuario después de cambiar el nivel
      const updatedUserData = await OnFilterUser();
      setUserData(updatedUserData);

      // Actualizar el estado del nivel
      setUserFocus(updatedUserFocus);
    } catch (error) {
      console.error('Error al cambiar el enfoque:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            ¡Bienvenido{currentUser ? `, ${currentUser}` : ''}!
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {currentUser ? (
          // Contenido para usuarios autenticados
          <div className="ion-text-center" >

<IonCard>
  <IonCardContent>
    {workoutsCount === 0 ? (
      "No has entrenado nada este mes, ¡hoy es un buen día para comenzar!"
    ) : workoutsCount === 1 ? (
      `Has entrenado un total de ${workoutsCount} vez en el último mes, sigue así`
    ) : (
      `Has entrenado un total de ${workoutsCount} veces en el último mes, sigue así`
    )}
  </IonCardContent>
</IonCard>


            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{getFocusText(userData?.focus)}</IonCardTitle>
                <IonCardSubtitle>
                  <IonChip>
                    {getIconBasedOnLevel(userData?.level)?.icon}
                    <IonLabel>Nivel {getIconBasedOnLevel(userData?.level)?.label}</IonLabel>
                  </IonChip>
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>Actualiza tu nivel de entrenamiento o el enfoque que le das a ellos si crees que ha llegado el momento de dar el cambio </IonCardContent>
              <IonButton fill="clear" id="focus-alert">Cambiar Enfoque</IonButton>
              <IonButton fill="clear" id="level-alert">Cambiar Nivel </IonButton>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Comienza un nuevo entrenamiento</IonCardTitle>
                <IonCardSubtitle>¿Listo para entrenar?</IonCardSubtitle>
              </IonCardHeader>
              <IonButton expand="block" onClick={OnTrain}>Entrenar</IonButton>
            </IonCard>
            <IonButton onClick={OnLogout} color="medium">Cerrar Sesión</IonButton>

            <IonAlert
          trigger="level-alert"
          header="Selecciona tu nuevo nivel"
          buttons={[
            {
              text: 'Hecho',
              handler: (selectedLevel: string | null) => {
                if (selectedLevel !== null) {
                  handleLevelChange(selectedLevel);
                  const levelAlert = document.querySelector('ion-alert[trigger="level-alert"]') as HTMLIonAlertElement;
                  if (levelAlert) {
                    levelAlert.dismiss();
                  }
                }
              },
            },
          ]}
          inputs={[
            {
              label: 'Principiante',
              type: 'radio',
              value: 'beginner',
            },
            {
              label: 'Intermedio',
              type: 'radio',
              value: 'intermediate',
            },
            {
              label: 'Avanzado',
              type: 'radio',
              value: 'advanced',
            },
          ]}
        ></IonAlert>


        <IonAlert
          trigger="focus-alert"
          header="Selecciona tu nuevo enfoque"
          buttons={[
            {
              text: 'Hecho',
              handler: (selectedFocus: string | null) => {
                if (selectedFocus !== null) {
                  handleFocusChange(selectedFocus);
                  const focusAlert = document.querySelector('ion-alert[trigger="focus-alert"]') as HTMLIonAlertElement;
                  if (focusAlert) {
                    focusAlert.dismiss();
                  }
                }
              },
            },
          ]}
          inputs={[
            {
              label: 'Ganar Masa Muscular',
              type: 'radio',
              value: 'musclemass',
            },
            {
              label: 'Perder Peso',
              type: 'radio',
              value: 'loseweight',
            },
            {
              label: 'Mixto',
              type: 'radio',
              value: 'mixed',
            },
          ]}
        ></IonAlert>

          </div>
          
        ) : (
          // Contenido para usuarios no autenticados
          <div className="ion-text-center" style={{ marginTop: '30vh', transform: 'translateY(-50%)' }}>
            <h2>¿Es tu primera vez en GymBasics?</h2>
            <IonButton className="custom-button" onClick={OnRegister}>Sí, Comenzar con el registro</IonButton>
            <p></p>
            <IonButton className="custom-button" onClick={OnLogin} color="medium">No, Iniciar Sesión</IonButton>
          </div>
        )}

        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;



