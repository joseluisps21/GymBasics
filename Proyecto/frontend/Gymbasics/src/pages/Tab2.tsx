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
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
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
import { balloonOutline, cogOutline, createOutline, ellipsisHorizontalOutline, informationCircleOutline, pizza, refreshOutline, trashOutline } from 'ionicons/icons';
import '../static/css/Tab2.css';
import { useHistory } from 'react-router';
import ExerciseData from '../interfaces/ExerciseData';
import { useAuth } from '../contexts/AuthContext';
import { getRoutinesByUsername } from '../apis/UserApi';
import Routine from '../interfaces/Routine';
import Exercise from '../interfaces/Exercise';
import { deleteRoutine, getExercisesByRoutine } from '../apis/RoutinesApi';
import Activity from '../interfaces/Activity';
import Result from '../interfaces/Result';
import Workout from '../interfaces/Workout';
import { saveFullWorkout, saveWorkout } from '../apis/WorkoutApi';
import FullWorkout from '../interfaces/FullWorkout';
import { getIconBasedOnLevel } from '../components/LevelChange';
import { getIconBasedOnFocus } from '../components/FocusChange';

const Tab2: React.FC = () => {

  const { currentUser, logout } = useAuth();
  const [fullWorkout, setFullWorkout] = useState<FullWorkout>();
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [workout, setWorkout] = useState<Workout>();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tempResultValues, setTempResultValues] = useState<{ [key: string]: string }>({});
  const [activityNotes, setActivityNotes] = useState<{ [activityIndex: number]: string }>({});
  const [popoverState, setShowPopover] = useState<{ showPopover: boolean; routineId: number | undefined }>({ showPopover: false, routineId: undefined });
  const [trainingInProgress, setTrainingInProgress] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(String);
  const [trainingStatus, setTrainingStatus] = useState<{ [routineId: number]: boolean }>({});
  const [currentRoutineId, setCurrentRoutineId] = useState<number | undefined>(undefined);
  const [showRefreshToast, setShowRefreshToast] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState<string | null>(null);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [showTimePickerModal, setShowTimePickerModal] = useState(false);
  const [counter, setCounter] = useState('00:00');
  const [tempCounter, setTempCounter] = useState('00:00');
  const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const [showTimeToast, setShowTimeToast] = useState(false);
  const [showWorkoutSuccessToast, setShowWorkoutSuccessToast] = useState(false);
  const [showCancelTraining, setShowCancelTraining] = useState(false);

  const handleDatetimeChange = (event: CustomEvent) => {
    setTempCounter(event.detail.value || '00:00');
  };

  const handleOkButtonClick = () => {
    setCounter(tempCounter);
    setShowTimePickerModal(false);
  };


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

  const handleExerciseDetail = (exerciseId: any) => {
    history.push(`/ExerciseDetail/${exerciseId}`);
    modal.current?.dismiss();

  };

  const modal = useRef<HTMLIonModalElement>(null);
  const modalTimer = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const fetchRoutines = async () => {
    const response = await getRoutinesByUsername(currentUser);
    if (response) {
      setRoutines(response);
      setShowRefreshToast(true);
    }
  };

  const fetchDeleteRoutines = async () => {
    const response = await getRoutinesByUsername(currentUser);
    if (response) {
      setRoutines(response);
      setShowDeleteToast(true);
    }
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


  const handleStartOrContinueTraining = async (routineId: number) => {
    if (isTrainingInProgress(routineId)) {
      // Otro entrenamiento en curso, no hacer nada o mostrar mensaje de error
    } else {
      // Iniciar el entrenamiento
      setTrainingStatus((prevTrainingStatus) => ({
        ...prevTrainingStatus,
        [routineId]: true,
      }));
      setCurrentTime(getCurrentTime());
      modal.current?.present();
      setShowToast(false);
      setTrainingInProgress(true);
      setCurrentRoutineId(routineId);
      const response = await getExercisesByRoutine(String(routineId));
      if (response) {
        const initialActivities = response.map((exercise: any) => ({
          exercise,
          note: '',
          results: [{ serie: 1, attr1: '', attr2: '' }]
        }));
        setActivities(initialActivities);
      }
    }
  };


  const handleFinishTraining = async (routineId: number | any) => {

    const now = new Date();
    const currentDate = now.toISOString().slice(0, 10);

    if (!counter || counter === '00:00' || !timePattern.test(counter)) {
      setShowTimeToast(true);
      return;
    }

    const newFullWorkout: FullWorkout = {
      workout: {
        date: currentDate,
        time: counter,
        routine: {
          id: routineId,
        },
      },
      activities: activities.map((activity) => ({
        note: activityNotes[activity.id] || activity.note,
        exercise: {
          id: activity.exercise?.id || 0,
        },
        results: activity.results.map((result) => ({
          serie: result.serie,
          attr1: tempResultValues[`${activity.id}-${result.id}-attr1`] || result.attr1,
          attr2: tempResultValues[`${activity.id}-${result.id}-attr2`] || result.attr2,
        })),
      })),
    };

    setFullWorkout(newFullWorkout);

    setTrainingInProgress(false);
    setCurrentRoutineId(undefined);
    modal.current?.dismiss();
    setExercises([]);
    setShowWorkoutSuccessToast(true);
    setActivityNotes({});
    setTempResultValues({});
    setCounter('00:00');

    setTrainingStatus((prevTrainingStatus) => ({
      ...prevTrainingStatus,
      [routineId]: false,
    }));

  };

  useEffect(() => {
    // Solo realizar la petición cuando el estado de workout se actualice
    if (fullWorkout) {
      (async () => {
        console.log(fullWorkout);
        const response = await saveFullWorkout(fullWorkout);
        modal.current?.dismiss();
      })();
    }
  }, [fullWorkout]);

  const isTrainingInProgress = (routineId: number) => {
    return Object.keys(trainingStatus).some((id) => parseInt(id) !== routineId && trainingStatus[parseInt(id)]);
  };




  useEffect(() => {
    if (trainingInProgress) {
    } else {
    }
  }, [trainingInProgress]);

  useEffect(() => {
    async function fetchRoutines() {
      const response = await getRoutinesByUsername(currentUser);
      if (response) {
        setRoutines(response);
      }
    }
    fetchRoutines();
  }, [currentUser]);

  const handleActivityNoteChange = (activityIndex: number, value: string) => {

    setActivityNotes((prevNotes) => ({
      ...prevNotes,
      [activityIndex]: value,
    }));

    setActivities((prevActivities) => {
      const newActivities = [...prevActivities];
      newActivities[activityIndex].note = value;
      return newActivities;
    });
  };


  const handleResultInputChange = (activityIndex: number, resultIndex: number, attributeName: string, value: string) => {

    setTempResultValues((prevValues) => ({
      ...prevValues,
      [`${activityIndex}-${resultIndex}-${attributeName}`]: value,
    }));


    setActivities((prevActivities) => {
      const updatedActivities = [...prevActivities];
      const updatedResults = [...(updatedActivities[activityIndex].results || [])];
      if (resultIndex >= 0 && resultIndex < updatedResults.length) {
        const updatedResult = { ...updatedResults[resultIndex] };
        switch (attributeName) {
          case 'serie':
            updatedResult.serie = parseInt(value);  // Parseamos el valor a número
            break;
          case 'attr1':
            updatedResult.attr1 = value;
            break;
          case 'attr2':
            updatedResult.attr2 = value;
            break;
          default:
            break;
        }
        updatedResults[resultIndex] = updatedResult;
        updatedActivities[activityIndex].results = updatedResults;
      }
      return updatedActivities;
    });
  };

  const handleAddResultRow = (activityIndex: number) => {
    setActivities((prevActivities) => {
      const updatedActivities = [...prevActivities];
      const newResult: Result = {
        id_activity: activityIndex,
        serie: updatedActivities[activityIndex].results.length + 1,
        attr1: '',
        attr2: '',
      };
      updatedActivities[activityIndex].results.push(newResult);
      return updatedActivities;
    });
  };

  const handleRemoveResultRow = (activityIndex: number, resultIndex: number) => {
    setActivities((prevActivities) => {
      const updatedActivities = [...prevActivities];
      updatedActivities[activityIndex].results.splice(resultIndex, 1);
      return updatedActivities;
    });
  };

  const handleEditRoutine = (routineId: string) => {
    history.push(`/EditRoutine/${routineId}`);
  };



  const handleDeleteRoutine = async (routineId: string) => {
    setRoutineToDelete(routineId);
    setShowAlert(true);
  };

  const confirmDelete = async () => {
    if (routineToDelete) {
      const response = await deleteRoutine(routineToDelete);
      fetchDeleteRoutines();
      if (response) {
        // Rutina eliminada exitosamente
      } else {
        console.error('Error al eliminar la rutina');
      }
      setRoutineToDelete(null);
    }
    setShowAlert(false);
  };

  const cancelDelete = () => {
    setRoutineToDelete(null);
    setShowAlert(false);
  };

  const handleCancelTraining = (routineId: number | undefined) => {
    setTrainingInProgress(false);
    setCurrentRoutineId(undefined);
    modal.current?.dismiss();
    setExercises([]);


    // Restablecer el contador a '00:00'
    setCounter('00:00');

    // Restablecer el estado de trainingStatus para el entrenamiento cancelado
    if (routineId !== undefined) {
      setTrainingStatus((prevTrainingStatus) => ({
        ...prevTrainingStatus,
        [routineId]: false,
      }));
    }

    // Limpiamos las notas para la rutina cancelada
    setActivityNotes({});
    setTempResultValues({});
    setCounter('00:00');
    setShowCancelTraining(true);
  };

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
            <IonIcon
              icon={refreshOutline}
              onClick={fetchRoutines}
              color="primary"
              style={{ fontSize: '24px', cursor: 'pointer' }}
            />
          </IonText>

          {routines?.map((routine) => (
            <IonCard key={routine.id} style={{ maxHeight: 'fit-content' }}>
              <IonCardHeader>
                <IonCardTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {routine.name}
                  </div>
                  <div>

                    <IonIcon style={{cursor:'pointer'}} icon={ellipsisHorizontalOutline} color='primary' id={`popover-button-${routine.id}`}>Open Menu</IonIcon>
                    <IonPopover trigger={`popover-button-${routine.id}`} dismissOnSelect={true}>
                      <IonContent>
                        <IonList>
                          <IonItem button={true} detail={false} onClick={(e) => handleEditRoutine(routine.id.toString())}>
                            Editar Rutina
                            <IonIcon
                              icon={createOutline}
                              color="primary"
                              style={{ cursor: 'pointer', marginRight: '10px' }}
                            />
                          </IonItem>
                          <IonItem button={true} detail={false} onClick={(e) => handleDeleteRoutine(routine.id.toString())}>
                            Eliminar Rutina

                            <IonIcon
                              icon={trashOutline}
                              color="danger"
                              style={{ cursor: 'pointer' }}
                            />

                          </IonItem>
                        </IonList>
                      </IonContent>
                    </IonPopover>
                  </div>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {routine.exercises?.map((exercise, index) => (
                  <span key={exercise.id}>
                    {exercise.name}
                    {routine.exercises && index < routine.exercises.length - 1 ? ', ' : '.'}
                  </span>
                ))}
              </IonCardContent>
              <IonButton
                id={`start-training-${routine.id}`}
                onClick={() => handleStartOrContinueTraining(routine.id)}
                expand="block"
                color={trainingStatus[routine.id] ? "warning" : "primary"}
                disabled={isTrainingInProgress(routine.id)}
              >
                {trainingStatus[routine.id] ? "Reanudar Entrenamiento" : "Comenzar Entrenamiento"}
              </IonButton>
            </IonCard>
          ))}

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

              {activities.map((activity, activityIndex) => (
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle color={'primary'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{flex:1}}>
                    <IonAvatar slot="start">
                        <img src={require(`../static/images/${activity.exercise?.picture}.jpeg`)} />
                        </IonAvatar>
                        </div>
                      <div style={{ cursor: 'pointer', flex:10, marginLeft:'10px' ,whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} onClick={(e) => handleExerciseDetail(activity.exercise.id.toString())}>
                        {activity.exercise?.name}
                      </div>
                    </IonCardTitle>
                    <IonCardSubtitle>
                      <div className="ion-text-center">
                        <IonChip>
                          {getIconBasedOnLevel(activity?.exercise.level)?.icon}
                          <IonLabel>Nivel {getIconBasedOnLevel(activity?.exercise.level)?.label}</IonLabel>
                        </IonChip>
                      </div>
                      <div className="ion-text-center">
                        <IonChip>
                          {getIconBasedOnFocus(activity?.exercise.focus)?.icon}
                          <IonLabel>{getIconBasedOnFocus(activity?.exercise.focus)?.label}</IonLabel>
                        </IonChip>
                      </div>
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonTextarea
                      placeholder="Introduce una nota acerca del ejercicio"
                      value={activityNotes[activityIndex] || activity.note}
                      onIonChange={(e) => handleActivityNoteChange(activityIndex, e.detail.value!)}
                    />
                    {activity.results?.map((result, resultIndex) => (
                      <IonRow key={resultIndex}>
                        <IonCol size="3">
                          <IonLabel>Serie</IonLabel>
                          <IonInput value={String(result.serie)} disabled />
                        </IonCol>
                        <IonCol size="3">
                          <IonLabel>{activity.exercise?.focus === 'musclemass' ? 'Reps' : activity.exercise?.focus === 'loseweight' ? 'Km' : 'Attr1'}</IonLabel>
                          <IonInput
                            placeholder={activity.exercise?.focus === 'musclemass' ? 'Reps' : activity.exercise?.focus === 'loseweight' ? 'Km' : 'Attr1'}
                            value={tempResultValues[`${activityIndex}-${resultIndex}-attr1`] || result.attr1}
                            onIonChange={(e) => handleResultInputChange(activityIndex, resultIndex, 'attr1', e.detail.value!)}
                          />
                        </IonCol>
                        <IonCol size="3">
                          <IonLabel>{activity.exercise?.focus === 'musclemass' ? 'Kgs' : activity.exercise?.focus === 'loseweight' ? 'Tiempo' : 'Attr2'}</IonLabel>
                          <IonInput
                            placeholder={activity.exercise?.focus === 'musclemass' ? 'Kgs' : activity.exercise?.focus === 'loseweight' ? 'Tiempo' : 'Attr2'}
                            value={tempResultValues[`${activityIndex}-${resultIndex}-attr2`] || result.attr2}
                            onIonChange={(e) => handleResultInputChange(activityIndex, resultIndex, 'attr2', e.detail.value!)}
                          />
                        </IonCol>
                        <IonCol size="3">
                          {activity.results.length > 1 && (
                            <IonButton
                              fill="clear"
                              color="danger"
                              onClick={() => handleRemoveResultRow(activityIndex, resultIndex)}
                            >
                              Eliminar
                            </IonButton>
                          )}
                        </IonCol>
                      </IonRow>
                    ))}
                    <IonRow key="add-row">
                      <IonCol size="12" class="ion-text-center">
                        <IonButton
                          fill="clear"
                          color="success"
                          onClick={() => handleAddResultRow(activityIndex)}
                        >
                          Añadir Fila
                        </IonButton>
                      </IonCol>
                    </IonRow>

                  </IonCardContent>
                </IonCard>
              ))}

              <IonCard>
                <IonCardContent className='ion-text-center'>
                  <IonButton onClick={() => setShowTimePickerModal(true)} fill="clear">
                    {counter !== '00:00' ? counter : 'Tiempo empleado(hh:mm)'}
                  </IonButton>
                </IonCardContent>
                <IonModal
                  id='timer-modal'
                  ref={modalTimer}
                  trigger="timer-modal"
                  isOpen={showTimePickerModal}
                  onDidDismiss={() => setShowTimePickerModal(false)}
                >
                  <div className="block">
                    <IonDatetime
                      value={tempCounter}
                      onIonChange={handleDatetimeChange}
                      presentation="time"
                    ></IonDatetime>
                    <div className='ion-text-center'>
                      <IonButton
                        fill="clear"
                        color="success"
                        onClick={handleOkButtonClick}
                      >
                        Ok
                      </IonButton>
                    </div>
                  </div>
                </IonModal>
              </IonCard>


              <IonButton expand="block" color="success" onClick={() => handleFinishTraining(currentRoutineId)}>
                Finalizar Entrenamiento
              </IonButton>
              <div className='ion-text-center'>
              <IonButton
              style={{ marginTop: '20px' }}
                color="medium"
                onClick={() => handleCancelTraining(currentRoutineId)}
              >
                Descartar Entrenamiento
              </IonButton>
              </div>
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
            {
              text: 'Ocultar',
              role: 'cancel',
              handler: () => {
                setShowToast(false);
              },
            },
          ]}
        />

        <IonToast
          isOpen={showRefreshToast}
          onDidDismiss={() => setShowRefreshToast(false)}
          message="¡Rutinas actualizadas con éxito!"
          position="top"
          color="success"
          duration={3000}
          cssClass="centered-toast"
        />

        <IonToast
          isOpen={showDeleteToast}
          onDidDismiss={() => setShowDeleteToast(false)}
          message="¡Rutina eliminada con éxito!"
          position="top"
          color="success"
          duration={3000}
          cssClass="centered-toast"
        />

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={cancelDelete}
          header={'Confirmar eliminación'}
          message={'¿Estás seguro de eliminar la rutina?'}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: cancelDelete,
            },
            {
              text: 'Sí',
              handler: confirmDelete,
            },
          ]}
        />

        <IonToast
          isOpen={showTimeToast}
          onDidDismiss={() => setShowTimeToast(false)}
          message="Por favor, Introduzca el tiempo de entreno."
          duration={3000}
          position="top"
          color="danger"
          cssClass="centered-toast"
        />

        <IonToast
          isOpen={showWorkoutSuccessToast}
          onDidDismiss={() => setShowWorkoutSuccessToast(false)}
          message="¡Entrenamiento completado con éxito!"
          duration={3000} 
          position="top"
          color="success"
          cssClass="centered-toast"
        />

        <IonToast
          isOpen={showCancelTraining}
          onDidDismiss={() => setShowCancelTraining(false)}
          message="Entrenamiento descartado correctamente"
          duration={3000} 
          position="top"
          color="medium"
          cssClass="centered-toast"
        />

      </IonContent>
    </IonPage>
  );

};

export default Tab2;





