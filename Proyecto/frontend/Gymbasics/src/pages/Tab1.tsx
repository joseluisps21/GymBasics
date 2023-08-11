import React, { useEffect, useState } from 'react';
import { IonButton, IonChip, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { getUserByUsername } from '../apis/UserApi';
import UserAuth from '../interfaces/UserAuth';
import { balloonOutline, flameOutline, flashOutline, pin, rocketOutline } from 'ionicons/icons';

const Tab1: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [userData, setUserData] = useState<UserAuth>({});

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

  const getIconBasedOnLevel = (level: string | undefined) => {
    switch (level) {
      case 'beginner':
        return { icon: <IonIcon icon={balloonOutline} color="tertiary" />, label: 'Principiante' };
      case 'intermediate':
        return { icon: <IonIcon icon={rocketOutline} color="danger" />, label: 'Intermedio' };
      case 'advanced':
        return { icon: <IonIcon icon={flashOutline} color="success" />, label: 'Avanzado' };
      default:
        return { icon: null, label: '' };
    }
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
          const userData = await OnFilterUser();
          setUserData(userData);
          console.log(userData)
      }
    };
  
    fetchUserData();
  }, [currentUser]);

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
                  <IonCardContent>Has entrenado un total de x veces en el último mes, sigue así </IonCardContent>
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
                  <IonButton fill="clear">Cambiar Enfoque</IonButton>
                  <IonButton fill="clear">Cambiar Nivel </IonButton>
                </IonCard>

                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Comienza un nuevo entrenamiento</IonCardTitle>
                    <IonCardSubtitle>¿Listo para entrenar?</IonCardSubtitle>
                  </IonCardHeader>
                  <IonButton expand="block" onClick={OnTrain}>Entrenar</IonButton>
                </IonCard>
                <IonButton onClick={OnLogout} color="medium">Cerrar Sesión</IonButton>
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



