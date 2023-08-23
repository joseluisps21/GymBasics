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
import FullExercise from '../interfaces/FullExercise';
import { saveExercise } from '../apis/ExercisesApi';
import Muscle from '../interfaces/Muscle';
import { getMuscles } from '../apis/MusclesApi';

const CreateExercise: React.FC = () => {


    const handleGoBack = () => {
        history.goBack();
    };


    const [showError, setShowError] = useState(false);
    const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
    const history = useHistory();
    const [muscles, setMuscles] = useState<Muscle[]>([]);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const [exercise, setExercise] = useState<FullExercise>({
        exerciseName: '',
        exerciseLevel: '',
        exerciseFocus: '',
        exercisePicture: 'default.jpg',
        muscleIds: [],
    });


    const handleCreateExercise = async () => {
        if (!exercise.exerciseName || !exercise.exerciseLevel || !exercise.exerciseFocus || exercise.muscleIds.length === 0) {
            setShowError(true);
            console.log(exercise)
            return;
        }

        try {
            const response = await saveExercise(exercise);
            if (response.ok) {
                setSelectedMuscles([]);
                setExercise({
                    exerciseName: '',
                    exerciseLevel: '',
                    exerciseFocus: '',
                    exercisePicture: 'default.jpg',
                    muscleIds: [],
                });
                setShowSuccessToast(true);
                history.push('/createRoutine'); // Cambia "otra-ruta" por la ruta deseada
            } else {
                console.error('Error al crear el ejercicio');
            }
        } catch (error) {
            console.error('Error al crear el ejercicio:', error);
        }
    };

    // const resetForm = () => {
    //     setExercise({});
    // };

    useEffect(() => {
        // Obtener la lista de músculos al cargar el componente
        async function fetchMuscles() {
            try {
                const response = await getMuscles();
                if (response) {
                    setMuscles(response);
                }
            } catch (error) {
                console.error('Error al obtener la lista de músculos:', error);
            }
        }

        fetchMuscles();
    }, []);

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
                            value={exercise.exerciseName}
                            label="Nombre"
                            labelPlacement="floating"
                            placeholder="Introduce el nombre del ejercicio"
                            required
                            style={{ width: '100%' }}
                            onIonChange={(e) => setExercise({ ...exercise, exerciseName: e.detail.value! })}
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
                            value={exercise.exerciseLevel}
                            aria-label="level"
                            interface="action-sheet"
                            placeholder="Selecciona el nivel de dificultad del ejercicio"
                            style={{ width: '100%' }}
                            onIonChange={(e) => setExercise({ ...exercise, exerciseLevel: e.detail.value! })}
                        >
                            <IonSelectOption value="beginner">Principiante</IonSelectOption>
                            <IonSelectOption value="intermediate">Intermedio</IonSelectOption>
                            <IonSelectOption value="advanced">Avanzado</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonSelect
                            value={exercise.exerciseFocus}
                            aria-label="focus"
                            interface="action-sheet"
                            placeholder="Selecciona el tipo de entrenamiento al que se enfoca"
                            style={{ width: '100%' }}
                            onIonChange={(e) => setExercise({ ...exercise, exerciseFocus: e.detail.value! })}
                        >
                            <IonSelectOption value="loseweight">Perder Peso</IonSelectOption>
                            <IonSelectOption value="musclemass">Ganar Masa Muscular</IonSelectOption>
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
                            onIonChange={(e) => {
                                const selectedMuscleIds = e.detail.value.map(Number); // Convierte las cadenas a números
                                setSelectedMuscles(selectedMuscleIds);
                                setExercise({ ...exercise, muscleIds: selectedMuscleIds });
                            }}
                        >
                            {muscles.map((muscle) => (
                                <IonSelectOption key={muscle.id} value={muscle.id}>{muscle.name}</IonSelectOption>
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
                                onClick={handleCreateExercise}
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

                <IonToast
                    isOpen={showSuccessToast}
                    onDidDismiss={() => setShowSuccessToast(false)}
                    message="¡Ejercicio creada con éxito!"
                    position="top"
                    color="success"
                    duration={3000}
                    cssClass="centered-toast"
                />
            </IonContent>
        </IonPage>
    );
};

export default CreateExercise;