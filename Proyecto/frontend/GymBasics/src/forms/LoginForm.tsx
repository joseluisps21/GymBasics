import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonList, IonGrid, IonRow, IonCol, IonCheckbox, IonLabel, IonToast, IonIcon } from '@ionic/react';
import { useState, useRef, createRef, useEffect } from 'react';
import '../static/css/LoginForm.css';
import User from '../interfaces/User';
import { loginUser } from '../apis/UserApi';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { eye, eyeOff } from "ionicons/icons";

const LoginForm: React.FC = () => {
  const [user, setUser] = useState<User>({});
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const history = useHistory();
  const [invalidFormError, setInvalidFormError] = useState(false);
  const [loggedError, setLoggedError] = useState(false);
  const [invalidCredentialsError, setInvalidCredentialsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = createRef<HTMLIonInputElement>(); 
  const passwordRef = createRef<HTMLIonInputElement>();
  const { login } = useAuth();

  useEffect(() => {
    // Verifica si hay valores almacenados en localStorage
    const savedUser = localStorage.getItem('savedUser');
    const savedPassword = localStorage.getItem('savedPassword');
    
    if (savedUser && savedPassword) {
      setUser({ username: savedUser });
      setPassword(savedPassword);
    }
  }, []);

  const loginUserAPI = async (username: string, password: string) => {
    const response = await loginUser(username, password);

    if (response.status === 400) {
      setInvalidFormError(true);
      return;
    }

    if (response.status === 401) {
      setInvalidCredentialsError(true);
      return;
    }



    const token = response.headers.get('Authorization');

    if (token && token.startsWith('Bearer ')) {
      login(token.replace('Bearer ', ''));
    }

    if (!rememberPassword) {
      resetForm();
    } else {
      // Guarda los valores en localStorage
      localStorage.setItem('savedUser', username);
      localStorage.setItem('savedPassword', password);
    }
    history.push('/tab1');
  };

  const handleLogin = async () => {
    if (!user.username || !password) {
      setShowError(true);
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

    if (usernameRef.current) {
      usernameRef.current.value = '';
    }
    if (passwordRef.current) {
      passwordRef.current.value = '';
    }
    
    // Elimina los valores del localStorage
    localStorage.removeItem('savedUser');
    localStorage.removeItem('savedPassword');
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle >Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
              ref={usernameRef}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              value={password}
              type={showPassword ? "text" : "password"}
              label="Contraseña"
              labelPlacement="floating"
              placeholder="Introduce tu contraseña"
              style={{ width: '100%' }}
              onIonChange={(e) => setPassword(e.detail.value!)}
              ref={passwordRef}
            ></IonInput>
            <IonButton
              fill="clear"
              onClick={() => setShowPassword(!showPassword)}
              slot="end"
            >
              <IonIcon slot="icon-only" icon={showPassword ? eyeOff : eye} />
            </IonButton>
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
          onDidDismiss={() => setLoggedError(false)}
          color={'danger'}
          position="top"
          message="Ya existe una sesión activa"
          cssClass="centered-toast"
          duration={2000}
        />
        <IonToast
          isOpen={invalidCredentialsError}
          onDidDismiss={() => setInvalidCredentialsError(false)}
          color={'danger'}
          position="top"
          message="Usuario o Contraseña incorrectos"
          cssClass="centered-toast"
          duration={2000}
        />

      </IonContent>
    </IonPage>
  );
};

export default LoginForm;
