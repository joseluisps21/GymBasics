import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonToast,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import bcrypt from 'bcryptjs';
import { updatePassword } from "../apis/UserApi";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router";

const EditPassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const { currentUser } = useAuth();
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
};

  const hashPassword = async (password: string) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error('Error al cifrar la contraseña');
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) {
      setShowPasswordError(true);
      return;
    }

    const hashedNewPassword = await hashPassword(newPassword);

    const response = await updatePassword({
      currentPassword: currentPassword,
      newPassword: hashedNewPassword,
    }, currentUser);

    if (response?.status === 400) {
      setShowErrorToast(true);
      return;
    }

    setShowSuccessToast(true);
    history.push('/Tab3');

    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButton onClick={handleGoBack} color="medium">Volver</IonButton>
          <IonTitle>Actualizar contraseña</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList className="login-form">
          <IonItem>
            <IonInput
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onIonChange={(e) => setCurrentPassword(e.detail.value!)}
              label="Contraseña actual"
              labelPlacement="floating"
              placeholder="Introduzca su contraseña actual"
              style={{ width: "100%" }}
            ></IonInput>
            <IonButton
              fill="clear"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              slot="end"
            >
              <IonIcon
                slot="icon-only"
                icon={showCurrentPassword ? eyeOff : eye}
              />
            </IonButton>
          </IonItem>

          <IonItem>
            <IonInput
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onIonChange={(e) => setNewPassword(e.detail.value!)}
              label="Nueva contraseña"
              labelPlacement="floating"
              placeholder="Introduzca su nueva contraseña"
              style={{ width: "100%" }}
            ></IonInput>
            <IonButton
              fill="clear"
              onClick={() => setShowNewPassword(!showNewPassword)}
              slot="end"
            >
              <IonIcon slot="icon-only" icon={showNewPassword ? eyeOff : eye} />
            </IonButton>
          </IonItem>
        </IonList>

        <IonGrid className="ion-justify-content-center">
          <IonRow>
            <IonCol className="ion-text-center">
              <IonButton
                expand="block"
                color="success"
                className="login-button"
                onClick={handleUpdatePassword}
              >
                Actualizar contraseña
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonToast
          isOpen={showPasswordError}
          color={"danger"}
          position="top"
          onDidDismiss={() => setShowPasswordError(false)}
          message="Por favor, complete ambos campos"
          cssClass="centered-toast"
          duration={2000}
        />

        <IonToast
          isOpen={showSuccessToast}
          color={"success"}
          position="top"
          onDidDismiss={() => setShowSuccessToast(false)}
          message="¡Contraseña actualizada correctamente!"
          cssClass="centered-toast"
          duration={3000}
        />

        <IonToast
          isOpen={showErrorToast}
          color={"danger"}
          position="top"
          onDidDismiss={() => setShowErrorToast(false)}
          message="La contraseña es incorrecta."
          cssClass="centered-toast"
          duration={3000}
        />

      </IonContent>
    </IonPage>
  );
};

export default EditPassword;



