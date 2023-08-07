import React, { useEffect, useState } from 'react';
import { IonButton, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { getUserByUsername, saveUser } from '../apis/UserApi';
import UserAuth from '../interfaces/UserAuth';
import { balloonOutline, flameOutline, flashOutline, pin, rocketOutline } from 'ionicons/icons';
import User from '../interfaces/User';
import bcrypt from 'bcryptjs';
import Exercise from '../interfaces/Exercise';
import { muscleList } from '../components/muscleList';

const CreateExercise: React.FC = () => {


    const handleGoBack = () => {
        history.goBack();
    };

    const [exercise, setExercise] = useState<Exercise>({});
    const [showError, setShowError] = useState(false);
    const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
    const history = useHistory();


    const handleRegister = async () => {
        if (!exercise.name || !exercise.muscles || !exercise.level || !selectedMuscles) {
            setShowError(true);
            return;
        }
    }

    const resetForm = () => {
        setExercise({});
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton onClick={handleGoBack} color="medium">Volver</IonButton>
                    <IonTitle>
                        Creación de Ejercicio
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList style={{ margin: 'auto', maxWidth: '800px' }}>
                    <IonItem>
                        <IonInput
                            value={exercise.name}
                            label="Nombre"
                            labelPlacement="floating"
                            placeholder="Introduce el nombre del ejercicio"
                            required
                            style={{ width: '100%' }}
                            onIonChange={(e) => setExercise({ ...exercise, name: e.detail.value! })}
                        ></IonInput>
                    </IonItem>

                    {/* <IonItem>
            <input
              value={exercise.picture}
              type='file'
              label="Correo"
              labelPlacement="floating"
              placeholder="Introduce tu correo"
              required
              style={{ width: '100%' }}
              onIonChange={(e) => setUser({ ...user, email: e.detail.value! })}
            ></input>
          </IonItem> */}

                    <IonItem>
                        <IonSelect
                            value={exercise.level}
                            aria-label="level"
                            interface="action-sheet"
                            placeholder="Selecciona el nivel de dificultad del ejercicio"
                            style={{ width: '100%' }}
                            onIonChange={(e) => setExercise({ ...exercise, level: e.detail.value! })}
                        >
                            <IonSelectOption value="beginner">Principiante</IonSelectOption>
                            <IonSelectOption value="intermediate">Intermedio</IonSelectOption>
                            <IonSelectOption value="advanced">Avanzado</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonSelect
                            value={exercise.focus}
                            aria-label="focus"
                            interface="action-sheet"
                            placeholder="Selecciona el tipo de entrenamiento al que se enfoca"
                            style={{ width: '100%' }}
                            onIonChange={(e) => setExercise({ ...exercise, focus: e.detail.value! })}
                        >
                            <IonSelectOption value="loseweight">Perder Peso</IonSelectOption>
                            <IonSelectOption value="musclemass">Ganar Masa Muscular</IonSelectOption>
                            <IonSelectOption value="mixed">Mixto</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonSelect
                            multiple
                            cancelText='Cancelar'
                            okText='Aceptar'
                            value={selectedMuscles}
                            aria-label="focus"
                            placeholder="Selecciona los músculos involucrados en el ejercicio"
                            onIonChange={(e) => setSelectedMuscles(e.detail.value as string[])}
                        >
                            {muscleList.map((muscle) => (
                                <IonSelectOption key={muscle} value={muscle}>{muscle}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>



                </IonList>
                <IonGrid className="ion-justify-content-center">
                    <IonRow>
                        <IonCol className="ion-text-center">
                            <IonButton
                                expand="block"
                                shape="round"
                                color="success"
                                onClick={handleRegister}
                                style={{ marginTop: '16px', width: 'fit-content', margin: 'auto' }}
                            >
                                Crear
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
            </IonContent>
        </IonPage>
    );
};

export default CreateExercise;