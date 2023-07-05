import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonList, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { useState } from 'react';
import '../static/css/LoginForm.css';

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Agregar aquí la lógica de inicio de sesión
  };

  return (
    <IonPage>
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList className="login-form">
        <IonItem>
          <IonInput
            type="text"
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
            label="Usuario"
            labelPlacement="floating"
            placeholder="Introduce tu usuario"
            style={{ width: '100%' }}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonInput
            type={showPassword ? 'text' : 'password'}
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            label="Contraseña"
            placeholder="Introduce tu contraseña"
            style={{ width: '100%' }}
          ></IonInput>
          <IonIcon
            slot="end"
            icon={showPassword ? eyeOff : eye}
            onClick={togglePasswordVisibility}
          ></IonIcon>
        </IonItem>
      </IonList>

      <IonGrid className="ion-justify-content-center">
        <IonRow>
          <IonCol className="ion-text-center">
            <IonButton
              expand="block"
              color="primary"
              onClick={handleLogin}
              className="login-button"
            >
              Iniciar sesión
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
    </IonPage>
  );
};

export default LoginForm;


