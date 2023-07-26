import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonList, IonGrid, IonRow, IonCol, IonCheckbox, IonLabel, IonToast } from '@ionic/react';
import { useState } from 'react';
import '../static/css/LoginForm.css';
import User from '../interfaces/User';
import { loginUser } from '../apis/UserApi';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [user, setUser] = useState<User>({});
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const history = useHistory();
  const [invalidFormError, setInvalidFormError] = useState(false);
  const [loggedError, setLoggedError] = useState(false);
  const { login } = useAuth();

  const loginUserAPI = async (username: string, password: string) => {
    const response = await loginUser(username, password);

    if (response.status === 400) {
      setInvalidFormError(true);
      return;
    }



    const token = response.headers.get('Authorization');

    if (token && token.startsWith('Bearer ')) {
      // Almacena el token en el LocalStorage sin el prefijo 'Bearer'
      login(token.replace('Bearer ', ''));
    }


    resetForm();
    history.push('/tab1');
  };

  const handleLogin = async () => {
    if (!user.username || !password) {
      setShowError(true);
      return;
    }

    if (localStorage.getItem('token') !== null) {
      setLoggedError(true);
      return;
    }

    const updatedUser: User = { ...user, password: password };
    console.log(updatedUser);

    if (updatedUser.username && updatedUser.password) {
      await loginUserAPI(updatedUser.username, updatedUser.password);
    }
  };

  const resetForm = () => {
    setUser({});
    setPassword('');
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
              value={user.username}
              onIonChange={(e) => setUser({ ...user, username: e.detail.value! })}
              label="Usuario"
              labelPlacement="floating"
              placeholder="Introduce tu usuario"
              style={{ width: '100%' }}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              value={password}
              type="password"
              label="Contraseña"
              labelPlacement="floating"
              placeholder="Introduce tu contraseña"
              style={{ width: '100%' }}
              onIonChange={(e) => setPassword(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Recordar contraseña</IonLabel>
            <IonCheckbox
              slot="start"
              checked={rememberPassword}
              onIonChange={(e) => setRememberPassword(e.detail.checked)}
            />
          </IonItem>
        </IonList>

        <IonGrid className="ion-justify-content-center">
          <IonRow>
            <IonCol className="ion-text-center">
              <IonButton expand="block" color="primary" onClick={handleLogin} className="login-button">
                Iniciar sesión
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToast
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          color={'danger'}
          position="top"
          message="Introduzca todos los campos"
          cssClass="centered-toast"
          duration={2000}
        />
        <IonToast
          isOpen={invalidFormError}
          onDidDismiss={() => setInvalidFormError(false)}
          color={'danger'}
          position="top"
          message="Usuario o Contraseña incorrectos"
          cssClass="centered-toast"
          duration={2000}
        />

<IonToast
          isOpen={loggedError}
          onDidDismiss={() => setInvalidFormError(false)}
          color={'danger'}
          position="top"
          message="Ya existe una sesión activa"
          cssClass="centered-toast"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginForm;
