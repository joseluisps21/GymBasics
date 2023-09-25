import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonSelect, IonSelectOption, IonPage, IonInput, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonGrid, IonRow, IonCol, IonToast } from '@ionic/react';
import User from '../interfaces/User';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { editProfile, getUserByUsername } from '../apis/UserApi';

const EditProfile: React.FC = () => {
    const [updatedUser, setUpdatedUser] = useState<User>({});
    const { currentUser, logout } = useAuth();
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const history = useHistory();

    const handleGoBack = () => {
        history.goBack();
    };

    const handleUpdateProfile = async () => {
        if (!updatedUser.name || !updatedUser.email || !updatedUser.level || !updatedUser.focus || !updatedUser.weight) {
            setShowError(true);
            return;
        }

        const response = await editProfile(updatedUser, currentUser);

        if (response?.status === 400) {
            setShowError(true);
            return;
        }

        setShowSuccess(true);
        history.push('/Tab3');

        
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

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                const userData = await OnFilterUser();
                setUpdatedUser(userData);
            }
        };

        fetchUserData();
    }, [currentUser]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButton onClick={handleGoBack} color="medium">Volver</IonButton>
                    <IonTitle>Editar Perfil</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList style={{ margin: 'auto', maxWidth: '800px' }}>
                    <IonItem>
                        <IonInput
                            value={updatedUser.name}
                            label="Nombre"
                            labelPlacement="floating"
                            placeholder="Introduce tu nombre"
                            required
                            style={{ width: '100%' }}
                            onIonChange={(e) => setUpdatedUser({ ...updatedUser, name: e.detail.value! })}
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonInput
                            value={updatedUser.email}
                            type='email'
                            label="Correo"
                            labelPlacement="floating"
                            placeholder="Introduce tu correo"
                            required
                            style={{ width: '100%' }}
                            onIonChange={(e) => setUpdatedUser({ ...updatedUser, email: e.detail.value! })}
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonInput
                            value={updatedUser.weight}
                            label="Peso Corporal (Kgs)"
                            labelPlacement="floating"
                            placeholder="Introduce tu Peso Corporal"
                            required
                            style={{ width: '100%' }}
                            onIonChange={(e) => setUpdatedUser({ ...updatedUser, weight: e.detail.value! })}
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonSelect
                            value={updatedUser.level}
                            aria-label="level"
                            interface="action-sheet"
                            placeholder="Selecciona tu nivel de experiencia"
                            style={{ width: '100%' }}
                            onIonChange={(e) => setUpdatedUser({ ...updatedUser, level: e.detail.value! })}
                        >
                            <IonSelectOption value="beginner">Principiante</IonSelectOption>
                            <IonSelectOption value="intermediate">Intermedio</IonSelectOption>
                            <IonSelectOption value="advanced">Avanzado</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonSelect
                            value={updatedUser.focus}
                            aria-label="focus"
                            interface="action-sheet"
                            placeholder="¿A qué quieres darle prioridad?"
                            style={{ width: '100%' }}
                            onIonChange={(e) => setUpdatedUser({ ...updatedUser, focus: e.detail.value! })}
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
                                onClick={handleUpdateProfile}
                                style={{ marginTop: '16px', width: 'fit-content', margin: 'auto' }}
                            >
                                Guardar Cambios
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
                    duration={3000}
                />
                <IonToast
                    isOpen={showSuccess}
                    onDidDismiss={() => setShowSuccess(false)}
                    color={'success'}
                    position='top'
                    message="Perfil editado con éxito."
                    cssClass="centered-toast"
                    duration={3000}
                />
            </IonContent>
        </IonPage>
    );
}

export default EditProfile;
