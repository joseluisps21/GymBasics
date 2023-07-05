import React, { useState } from 'react';
import { IonList, IonItem, IonSelect, IonSelectOption, IonPage, IonInput, IonIcon, IonContent, IonHeader, IonToolbar, IonTitle, IonCheckbox, IonLabel, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';


const RegisterForm: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };

    function handleRegisterClick(): void {
    }

  return (
    <IonPage>
    
    <IonContent className="ion-text-center">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Regístrate</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList style={{margin:'auto', maxWidth: '600px'}}>
        <IonItem>
          <IonInput
            label="Nombre"
            labelPlacement="floating"
            placeholder="Introduce tu nombre"
            style={{ width: '100%' }}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonInput
            label="Correo"
            labelPlacement="floating"
            placeholder="Introduce tu correo"
            style={{ width: '100%' }}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonInput
            label="Usuario"
            labelPlacement="floating"
            placeholder="Crea tu nombre de usuario"
            style={{ width: '100%' }}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonInput
            type={showPassword ? 'text' : 'password'}
            label="Contraseña"
            placeholder="Crea tu contraseña"
            style={{ width: '100%' }}
          ></IonInput>
          <IonIcon
            slot="end"
            icon={showPassword ? eyeOff : eye}
            onClick={togglePasswordVisibility}
          ></IonIcon>
        </IonItem>

        <IonItem>
          <IonSelect
            aria-label="level"
            interface="action-sheet"
            placeholder="Selecciona tu nivel de experiencia"
            style={{ width: '100%' }}
          >
            <IonSelectOption value="beginner">Principiante</IonSelectOption>
            <IonSelectOption value="intermediate">Intermedio</IonSelectOption>
            <IonSelectOption value="advanced">Avanzado</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonSelect
            aria-label="focus"
            interface="action-sheet"
            placeholder="¿A qué quieres darle prioridad?"
            style={{ width: '100%' }}
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
              onClick={handleRegisterClick}
              style={{ marginTop: '16px', width: 'fit-content', margin: 'auto' }}
            >
              Registrarse
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
    </IonPage>
  );
}
export default RegisterForm;