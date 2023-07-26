import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { searchCustomers } from './extra/customerApi';

const Tab1: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const OnRegister = () => {
    history.push('/register');
  };

  const OnLogin = () => {
    history.push('/login');
  };

  const OnLocalStorage = () => {
    console.log(localStorage.getItem('token'));
    console.log("y este es el currentUser" + currentUser);
  };

  const logout2 = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  };

  const handleCustomers = async() => {
    const response = await searchCustomers();
    console.log(response);
    
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
        <IonText>
          <>
            <h2 className="ion-text-center" style={{ textAlign: 'center', marginTop: '30vh', transform: 'translateY(-50%)' }}>¿Es tu primera vez en GymBasics?</h2>
            <div className="ion-text-center">
              <IonButton className="custom-button" onClick={OnRegister} >Sí, Comenzar con el registro</IonButton>
              <p></p>
              <IonButton className="custom-button" onClick={OnLogin} color="medium">No, Iniciar Sesión</IonButton>
              {/* <IonButton className="custom-button" onClick={OnLocalStorage} color="medium">Prueba localStorage</IonButton>
              <IonButton className="custom-button" onClick={logout2} color="medium">cerrar sesion</IonButton> */}
              <IonButton className="custom-button" onClick={logout} color="medium">cerrar sesion2</IonButton>
              {/* <IonButton className="custom-button" onClick={handleCustomers} color="medium">prueba de customers</IonButton> */}
            </div>
          </>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;


