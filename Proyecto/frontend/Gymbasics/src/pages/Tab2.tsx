import React, { useEffect, useRef, useState } from 'react';
import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonPopover,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonSegment,
  IonText,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
  ItemReorderEventDetail,
} from '@ionic/react';
import { balloonOutline, cogOutline, createOutline, ellipsisHorizontalOutline, informationCircleOutline, pizza, trashOutline } from 'ionicons/icons';
import '../static/css/Tab2.css';
import { useHistory } from 'react-router';
import ExerciseData from '../interfaces/ExerciseData';

const Tab2: React.FC = () => {
  const data = [
    'Flexiones',
    'Sentadillas',
    'Abdominales',
    'Dominadas',
  ];

  const [exerciseData, setExerciseData] = useState<{ [exercise: string]: ExerciseData }>({
    [data[0]]: { reps: [''], weight: [''] },
    [data[1]]: { reps: [''], weight: [''] },
    [data[2]]: { reps: [''], weight: [''] },
    [data[3]]: { reps: [''], weight: [''] },
  });

  const [results, setResults] = useState([...data]);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([data[0], data[1], data[2], data[3]]);
  const [numRows, setNumRows] = useState(1);
  const [trainingInProgress, setTrainingInProgress] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(String);

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleHideToast = () => {
    setShowToast(false);
  };

  const history = useHistory();

  const OnCreateRoutine = () => {
    history.push('/createRoutine');
  };

  const handleExerciseDetail = () => {
    history.push('/ExerciseDetail');
    modal.current?.dismiss();

  };

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
    setShowToast(true);
  }

  async function canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  const [numRowsPerExercise, setNumRowsPerExercise] = useState<{ [exercise: string]: number }>({
    [data[0]]: 1,
    [data[1]]: 1,
    [data[2]]: 1,
    [data[3]]: 1,
  });

  const handleAddRow = (exercise: string) => {
    setExerciseData((prevExerciseData) => {
      const newReps = [...prevExerciseData[exercise].reps, ''];
      const newWeight = [...prevExerciseData[exercise].weight, ''];
      const numRows = newReps.length; // Obtenemos el nuevo numero de filas
      setNumRowsPerExercise((prevNumRowsPerExercise) => ({
        ...prevNumRowsPerExercise,
        [exercise]: numRows,
      }));
      return {
        ...prevExerciseData,
        [exercise]: {
          reps: newReps,
          weight: newWeight,
        },
      };
    });
  };


  const handleRemoveRow = (exercise: string) => {
    setExerciseData((prevExerciseData) => {
      const reps = prevExerciseData[exercise].reps.slice(0, -1);
      const weight = prevExerciseData[exercise].weight.slice(0, -1);
      const numRows = reps.length;
      setNumRowsPerExercise((prevNumRowsPerExercise) => ({
        ...prevNumRowsPerExercise,
        [exercise]: numRows,
      }));
      return {
        ...prevExerciseData,
        [exercise]: {
          reps,
          weight,
        },
      };
    });
  };

  const handleInputChange = (exercise: string, type: 'reps' | 'weight', index: number, value: string) => {
    setExerciseData((prevExerciseData) => {
      const updatedData = { ...prevExerciseData };
      updatedData[exercise][type][index] = value;
      return updatedData;
    });
  };

  const handleStartOrContinueTraining = () => {


    if (trainingInProgress) {

    } else {
      setTrainingInProgress(true);
      setCurrentTime(getCurrentTime());
    }
    modal.current?.present();
    setShowToast(false);
  };

  const handleFinishTraining = () => {

    setTrainingInProgress(false);
    modal.current?.dismiss();

    setExerciseData((prevExerciseData) => {

      const clearedData = { ...prevExerciseData };
      for (const exercise in clearedData) {
        clearedData[exercise].reps = clearedData[exercise].reps.map(() => '');
        clearedData[exercise].weight = clearedData[exercise].weight.map(() => '');
      }
      return clearedData;
    });

  };

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

  const handleActivateReorder = () => {
    setIsDisabled(false);
  };

  const handleDeactivateReorder = () => {
    setIsDisabled(true);
  };

  useEffect(() => {
    if (trainingInProgress) {
    } else {
    }
  }, [trainingInProgress]);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Entrenamientos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-text-center">
          <IonCard>
            <IonCardContent>
              <h1>Accede a tus rutinas o crea una nueva</h1>
            </IonCardContent>
            <IonButton onClick={OnCreateRoutine} color="tertiary">
              Crear Rutina
            </IonButton>
          </IonCard>

          <IonSegment></IonSegment>

          <IonText>
            <h1>Mis Rutinas</h1>
          </IonText>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Rutina 1
                <IonIcon id="popover-button" icon={ellipsisHorizontalOutline} color="primary" style={{ marginLeft: '5px' }} />
                <IonPopover trigger="popover-button" dismissOnSelect={true}>
                  <IonContent>
                    <IonList>
                      <IonItem button={true} detail={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <IonIcon icon={createOutline} color="primary" style={{ marginLeft: '3px' }} />
                        Editar Rutina
                      </IonItem>
                      <IonItem button={true} detail={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <IonIcon icon={trashOutline} color="danger" style={{ marginLeft: '3px' }} />
                        Eliminar Rutina
                      </IonItem>
                    </IonList>
                  </IonContent>
                </IonPopover>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>Dominadas, Jalon al Pecho, Remo Sentado, Remo en Punta, Peacherl Curl</IonCardContent>
            <IonButton id="start-training" onClick={handleStartOrContinueTraining} expand="block" color={trainingInProgress ? "warning" : "primary"}>
              {trainingInProgress ? "Reanudar Entrenamiento" : "Comenzar Entrenamiento"}
            </IonButton>
          </IonCard>

          <IonModal ref={modal} canDismiss={canDismiss} presentingElement={presentingElement!}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Comienzo - {currentTime}</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => dismiss()}>Cerrar</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

              <IonIcon size='large' id="alert-info" icon={informationCircleOutline} color="primary" style={{ marginLeft: '5px' }} />

              <IonAlert
                header="Cambia el orden de los ejercicios deslizándolos"
                trigger="alert-info"
                className="custom-alert"
                buttons={[
                  {
                    text: 'Desactivar',
                    role: 'cancel',
                    handler: () => {
                      handleDeactivateReorder();
                    },
                  },
                  {
                    text: 'Activar',
                    role: 'Activar',
                    cssClass: 'alert-button-confirm',
                    handler: () => {
                      handleActivateReorder();
                    },
                  },
                ]}

              ></IonAlert>
              <IonReorderGroup disabled={isDisabled} onIonItemReorder={handleReorder}>
                {selectedExercises.map((exercise, index) => (
                  <IonReorder>
                    <IonItem key={index}>
                      <IonCard key={index}>
                        <IonCardHeader>
                          <IonCardTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div onClick={handleExerciseDetail}>
                              {exercise}
                            </div>



                          </IonCardTitle>
                          <IonCardSubtitle>
                            <div>Nivel Avanzado</div>
                            <div>Ganar Masa Muscular</div>

                          </IonCardSubtitle>

                        </IonCardHeader>
                        <IonCardContent>
                          <IonTextarea placeholder="Introduce una nota acerca del ejercicio" />
                          {exerciseData[exercise].reps.map((rep, rowIdx) => (
                            <IonRow key={rowIdx}>
                              <IonCol size="6">
                                <IonLabel>Serie {rowIdx + 1}</IonLabel>
                                <IonInput value={String(rowIdx + 1)} disabled />
                              </IonCol>
                              <IonCol size="3">
                                <IonLabel>Reps</IonLabel>
                                <IonInput
                                  placeholder="Reps"
                                  value={rep}
                                  onIonChange={(e) => handleInputChange(exercise, 'reps', rowIdx, e.detail.value!)}
                                />
                              </IonCol>
                              <IonCol size="3">
                                <IonLabel>Peso</IonLabel>
                                <IonInput
                                  placeholder="Peso"
                                  value={exerciseData[exercise].weight[rowIdx]}
                                  onIonChange={(e) => handleInputChange(exercise, 'weight', rowIdx, e.detail.value!)}
                                />
                              </IonCol>
                            </IonRow>
                          ))}
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <IonButton onClick={() => handleAddRow(exercise)} size="small">Añadir serie</IonButton>
                            {numRowsPerExercise[exercise] > 1 && (
                              <IonButton color="danger" onClick={() => handleRemoveRow(exercise)} size="small">Eliminar serie</IonButton>
                            )}
                          </div>

                        </IonCardContent>
                      </IonCard>

                    </IonItem>
                  </IonReorder>
                ))}
              </IonReorderGroup>
              <IonItem>
                <IonInput
                  type="text"
                  //value={}
                  //onIonChange={(e) => setUser({ ...user, username: e.detail.value! })}
                  label="Tiempo Transcurrido (hh:mm)"
                  labelPlacement="floating"
                  placeholder="Consulta la cabecera del entrenamiento"
                  style={{ width: '100%' }}
                ></IonInput>
              </IonItem>

              <IonButton expand="block" color="success" onClick={handleFinishTraining}>Finalizar Entrenamiento</IonButton>
            </IonContent>
          </IonModal>

        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={handleHideToast}
          message="Entrenamiento en Curso"
          duration={0}
          position="top"
          color={"warning"}
          buttons={[
            {
              text: 'Reanudar',
              handler: () => {
                modal.current?.present();
                setShowToast(false);
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );

};

export default Tab2;





