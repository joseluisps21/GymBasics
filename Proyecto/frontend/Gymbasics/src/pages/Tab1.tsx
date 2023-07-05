import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import '../static/css/Tab1.css';
import { useHistory } from 'react-router';

const Tab1: React.FC = () => {


  const history = useHistory();
  const OnRegister = () => {
    history.push('/register');
  }

  const OnLogin = () => {
    history.push('/login');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>¡Bienvenido!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonText>
        <>
          <h2 className="ion-text-center" style={{ textAlign: 'center', marginTop: '30vh', transform: 'translateY(-50%)' }}>¿Es tu primera vez en GymBasics?</h2>
          <div className="ion-text-center">
          <IonButton className="custom-button" onClick={OnRegister} >Sí, Comenzar con el registro</IonButton>
            <p></p>
            <IonButton className="custom-button" onClick={OnLogin} color="medium">No, Iniciar Sesión</IonButton>
          </div>
        </>
    </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
