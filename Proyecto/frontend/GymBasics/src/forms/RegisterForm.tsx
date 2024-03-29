import React, { useState } from 'react';
import { IonList, IonItem, IonSelect, IonSelectOption, IonPage, IonInput, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonGrid, IonRow, IonCol, IonToast, IonText, IonIcon } from '@ionic/react';
import { saveUser } from '../apis/UserApi';
import User from '../interfaces/User';
import { useHistory } from 'react-router';
import '../static/css/RegisterForm.css';
import bcrypt from 'bcryptjs';
import { eye, eyeOff } from 'ionicons/icons';


const RegisterForm: React.FC = () => {
  const [user, setUser] = useState<User>({});
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showPasswordLengthError, setShowPasswordLengthError] = useState(false);
  const history = useHistory();
  const [duplicateUser, setDuplicateUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const hashPassword = async (password: string) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error('Error al cifrar la contraseña');
    }
  };

  const handleRegister = async () => {
    if (!user.name || !user.email || !user.username || !password || !confirmPassword || !user.level || !user.focus || !user.weight) {
      setShowError(true);
      return;
    }

    if (password !== confirmPassword) {
      setShowPasswordError(true);
      return;
    }

    if (password.length < 4) {
      setShowPasswordLengthError(true);
      return;
    }

    const hashedPassword = await hashPassword(password)
    console.log("esta es la hashed", hashedPassword)

    const updatedUser: User = { ...user, password: hashedPassword };

    console.log(updatedUser);
    const response = await saveUser(updatedUser);
    if (response?.status === 400) {
        setDuplicateUser(true);
        return;
      }
    resetForm();
    history.push('/tab1');
  }

  const resetForm = () => {
    setUser({});
    setPassword('');
    setConfirmPassword('');
  };


  return (
    <IonPage>
      
        <IonHeader>
          <IonToolbar>
            <IonTitle>Regístrate</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <IonList style={{ margin: 'auto', maxWidth: '800px' }}>
          <IonItem>
            <IonInput
              value={user.name}
              label="Nombre"
              labelPlacement="floating"
              placeholder="Introduce tu nombre"
              required
              style={{ width: '100%' }}
              onIonChange={(e) => setUser({ ...user, name: e.detail.value! })}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              value={user.email}
              type='email'
              label="Correo"
              labelPlacement="floating"
              placeholder="Introduce tu correo"
              required
              style={{ width: '100%' }}
              onIonChange={(e) => setUser({ ...user, email: e.detail.value! })}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              value={user.username}
              label="Usuario"
              labelPlacement="floating"
              placeholder="Crea tu nombre de usuario"
              required
              style={{ width: '100%' }}
              onIonChange={(e) => setUser({ ...user, username: e.detail.value! })}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              value={password}
              type={showPassword ? "text" : "password"}
              label="Contraseña"
              labelPlacement="floating"
              placeholder="Crea tu contraseña"
              required
              style={{ width: '100%' }}
              onIonChange={(e) => setPassword(e.detail.value!)}
              className={password.length < 4 ? 'ion-invalid' : ''}
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
            <IonInput
              value={confirmPassword}
              type={showPassword2 ? "text" : "password"}
              label="Confirma tu contraseña"
              labelPlacement="floating"
              placeholder="Confirma tu contraseña"
              required
              style={{ width: '100%' }}
              onIonChange={(e) => setConfirmPassword(e.detail.value!)}
            ></IonInput>
            <IonButton
              fill="clear"
              onClick={() => setShowPassword2(!showPassword2)}
              slot="end"
            >
              <IonIcon slot="icon-only" icon={showPassword2 ? eyeOff : eye} />
            </IonButton>
          </IonItem>

          <IonItem>
            <IonInput
              value={user.weight}
              label="Peso Corporal (Kgs)"
              labelPlacement="floating"
              placeholder="Introduce tu Peso Corporal"
              required
              type="number"
              style={{ width: '100%' }}
              onIonChange={(e) => setUser({ ...user, weight: e.detail.value! })}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonSelect
              value={user.level}
              aria-label="level"
              interface="action-sheet"
              placeholder="Selecciona tu nivel de experiencia"
              style={{ width: '100%' }}
              onIonChange={(e) => setUser({ ...user, level: e.detail.value! })}
            >
              <IonSelectOption value="beginner">Principiante</IonSelectOption>
              <IonSelectOption value="intermediate">Intermedio</IonSelectOption>
              <IonSelectOption value="advanced">Avanzado</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonSelect
              value={user.focus}
              aria-label="focus"
              interface="action-sheet"
              placeholder="¿A qué quieres darle prioridad?"
              style={{ width: '100%' }}
              onIonChange={(e) => setUser({ ...user, focus: e.detail.value! })}
            >
              <IonSelectOption value="loseweight">Perder Peso</IonSelectOption>
              <IonSelectOption value="musclemass">Ganar Masa Muscular</IonSelectOption>
              <IonSelectOption value="mixed">Mixto</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
        <IonGrid className="ion-justify-content-center">
          <IonRow>
            <IonCol className="ion-text-center">
              <IonButton
                expand="block"
                shape="round"
                color="primary"
                onClick={handleRegister}
                style={{ marginTop: '16px', width: 'fit-content', margin: 'auto' }}
              >
                Registrarse
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToast
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          color={'danger'}
          position='top'
          message="Por favor, complete todos los campos restantes"
          cssClass="centered-toast"
          duration={2000}
        />
        <IonToast
          isOpen={showPasswordError}
          color={'danger'}
          position='top'
          onDidDismiss={() => setShowPasswordError(false)}
          message="Las contraseñas no coinciden"
          cssClass="centered-toast"
          duration={2000}
        />
        <IonToast
          isOpen={showPasswordLengthError}
          color={'danger'}
          position='top'
          onDidDismiss={() => setShowPasswordLengthError(false)}
          message="La contraseña debe tener 4 o más caracteres"
          cssClass="centered-toast"
          duration={2000}
        />
          <IonToast
            isOpen={duplicateUser}
            color={'danger'}
            message={'El nombre de usuario ya existe, por favor, elija otro'}
            position='top'
            duration={2000}
            onDidDismiss={() => setDuplicateUser(false)}
            cssClass="centered-toast"
          />
      </IonContent>
    </IonPage>
  );
}

export default RegisterForm;


