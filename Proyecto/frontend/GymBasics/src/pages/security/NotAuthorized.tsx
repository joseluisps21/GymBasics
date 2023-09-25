import React from 'react';
import { IonContent, IonPage, IonButton, IonTitle, IonHeader, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import '../../static/css/NotAuthorized.css';
import '../../static/css/LoginForm.css'

const NotAuthorized: React.FC = () => {
  const history = useHistory();

  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Acción no permitida</IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonContent >
        <p className="centered-text">Inicia sesión para tener acceso.</p>
        <IonButton expand="block" color="primary" onClick={handleLogin} className='login-button'>  
          Iniciar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NotAuthorized;

