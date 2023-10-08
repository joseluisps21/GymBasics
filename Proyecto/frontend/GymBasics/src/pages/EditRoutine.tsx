import React, { useEffect, useRef } from 'react';
import { IonAlert, IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ExerciseDetail from './ExerciseDetail';
import { addCircleOutline } from 'ionicons/icons';
import Exercise from '../interfaces/Exercise';
import { getExercises, getExercisesByUsername } from '../apis/ExercisesApi';
import { getIconBasedOnLevel } from '../components/LevelChange';
import { getIconBasedOnFocus } from '../components/FocusChange';
import { useAuth } from '../contexts/AuthContext';
import { getRoutinesById, saveRoutine, updateRoutine } from '../apis/RoutinesApi';
import UpdatedRoutine from '../interfaces/UpdatedRoutine';

const EditRoutine: React.FC = () => {

  const history = useHistory();
  const [activeSegment, setActiveSegment] = useState<string>('all');
  const { currentUser, logout } = useAuth();
  const [routineName, setRoutineName] = useState<string>('');
  const [showNoExerciseToast, setShowNoExerciseToast] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [results, setResults] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [showSegmentAlert, setShowSegmentAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);


  const [routineDetails, setRoutineDetails] = useState<UpdatedRoutine | null>(null);
  const { routineId } = useParams<{ routineId: string }>();

  const handleGoBack = () => {
    history.goBack();
  };

  const handleConfirmationAlert = (confirmed: boolean) => {
    setShowConfirmationAlert(false);

    if (confirmed) {
      
      handleUpdateFields();
    }
  };


  useEffect(() => {
    if (routineId) {
      getRoutinesById(routineId)
        .then((response) => {
          if (response) {
            setRoutineDetails({
              routineName: response.name,
              exercises: response.exercises,
            });
            setSelectedExercises(response.exercises); 
            setRoutineName(response.name); 
            console.log(selectedExercises)
          }
        })
        .catch((error) => {
          console.error('Error obteniendo detalles de la rutina:', error);
        });
    }
  }, [routineId]);


  const handleExerciseDetail = (exerciseId: any) => {
    history.push(`/ExerciseDetail/${exerciseId}`);
    modal.current?.dismiss();

  };

  const handleCreateExercise = () => {
    history.push('/CreateExercise');
    modal.current?.dismiss();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleInput = (ev: Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(results.filter((r) => r.name.toLowerCase().indexOf(query) > -1));
  };

  const handleCheckboxChange = (exercise: Exercise) => {
    setSelectedExercises((prevSelectedExercises) => {
      if (prevSelectedExercises.some((selectedExercise) => selectedExercise.id === exercise.id)) {
        // Eliminamos el ejercicio si ya está seleccionado
        return prevSelectedExercises.filter((selectedExercise) => selectedExercise.id !== exercise.id);
      } else {
        // Lo añadimos si no lo está
        return [...prevSelectedExercises, exercise];
      }
    });
  };

  const handleRemoveExercise = (exercise: Exercise) => {
    setSelectedExercises((prevSelectedExercises) => {
      return prevSelectedExercises.filter((selectedExercise) => selectedExercise.id !== exercise.id);
    });
  };

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  const handleUpdateFields = () => {
    const updatedRoutineName = routineName.trim();

    
    handleEditRoutine(updatedRoutineName);
  };

  const handleEditRoutine = (updatedRoutineName: string) => {
    if (selectedExercises.length === 0 || updatedRoutineName === '') {
      setShowNoExerciseToast(true);
      return;
    }

    const routine: UpdatedRoutine = {
      routineName: updatedRoutineName,
      exercises: selectedExercises,
    };

    console.log(routine);

    updateRoutine(routine, routineId)
      .then((response) => {
        if (response) {
          setShowSuccessToast(true);
          console.log('Rutina actualizada con éxito');
          console.log(response);
          history.push('/Tab2');
        } else {
          console.error('Error al crear la rutina');
        }
      })
      .catch((error) => {
        console.error('Error al comunicarse con la API:', error);
      });
  };



  useEffect(() => {
    let fetchExercises;

    if (activeSegment === 'all') {
      fetchExercises = getExercises();
    } else {
      const username = currentUser;
      fetchExercises = getExercisesByUsername(username || '');
    }

    fetchExercises
      .then((exercises: Exercise[]) => {
        if (exercises) {
          setResults(exercises);
        }
      })
      .catch((error) => {
        console.error('Error obteniendo ejercicios:', error);
      });

    setPresentingElement(page.current);
  }, [activeSegment]);

  useEffect(() => {

    if (isModalOpen && activeSegment === 'all') {
      setShowSegmentAlert(true);
    }
  }, [isModalOpen]);




  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton onClick={handleGoBack} color="medium">Volver</IonButton>
          <IonTitle>Edición de Rutina</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-text-center">
          <IonItem>
            <IonInput
              type="text"
              value={routineName}
              onIonChange={(e) => setRoutineName(e.detail.value!)}
              label="Nombre de la rutina"
              labelPlacement="floating"
              placeholder="Nombre de la rutina"
              style={{ width: '100%' }}
            ></IonInput>
          </IonItem>

          <IonButton id="open-edit-modal" onClick={handleOpenModal} >
            Añadir ejercicios
          </IonButton>

          <IonText>
            <h1>
              Ejercicios Seleccionados
            </h1>
          </IonText>

          {selectedExercises.length > 0 &&
            <IonList>
              {selectedExercises.map((exercise) => (
                <IonCard key={exercise.id}>
                  <IonCardHeader>
                    <IonCardTitle color={'primary'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >

                      <div style={{marginRight:'2px'}}>
                        <IonAvatar slot="start">
                          <img alt="Silhouette of mountains" src={require(`../static/images/${exercise.picture}.jpeg`)} />
                        </IonAvatar>
                      </div>

                      <div onClick={(e) => handleExerciseDetail(exercise.id?.toString())} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>
                        {exercise.name}
                      </div>
                      <IonCheckbox
                        checked={true}
                        onIonChange={() => handleRemoveExercise(exercise)}
                      />
                    </IonCardTitle>
                    <IonCardSubtitle>
                      <div className="ion-text-center">
                        <IonChip>
                          {getIconBasedOnLevel(exercise.level)?.icon}
                          <IonLabel>Nivel {getIconBasedOnLevel(exercise.level)?.label}</IonLabel>
                        </IonChip>
                      </div>
                      <div className="ion-text-center">
                        <IonChip>
                          {getIconBasedOnFocus(exercise.focus)?.icon}
                          <IonLabel>{getIconBasedOnFocus(exercise.focus)?.label}</IonLabel>
                        </IonChip>
                      </div>
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent className='ion-text-center' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <div className="separator"></div>
                    {exercise.muscles?.map((muscle, index) => (
                      <span key={index}>
                        {index > 0 && ', '}
                        {muscle.name}
                        {index === (exercise.muscles?.length || 0) - 1 ? '.' : ''}
                      </span>
                    ))}
                  </IonCardContent>
                </IonCard>
              ))}
            </IonList>
          }

          <IonButton color="success" onClick={() => setShowConfirmationAlert(true)}>
            Editar Rutina
          </IonButton>


          <IonModal ref={modal} trigger="open-edit-modal" presentingElement={presentingElement!}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>
                  <IonSegment
                    color="primary"
                    value={activeSegment}
                    onIonChange={(e) => setActiveSegment(String(e.detail.value))}
                  >
                    <IonSegmentButton value="favourites">
                      <IonLabel>Sugeridos</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="all">
                      <IonLabel>Todos</IonLabel>
                    </IonSegmentButton>
                  </IonSegment>

                </IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => dismiss()}>Cerrar</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonSearchbar debounce={1000} animated={true} placeholder='Buscar ejercicio' onIonInput={(ev) => handleInput(ev)}></IonSearchbar>

              <IonIcon style={{cursor:'pointer'}} id='create-exercise' icon={addCircleOutline} size='large' />

              <IonAlert
                header="No encuentras el ejercicio que buscas?"
                trigger="create-exercise"
                buttons={[
                  {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {

                    },
                  },
                  {
                    text: 'Crear ejercicio',
                    role: 'confirm',
                    handler: () => {
                      handleCreateExercise();
                    },
                  },
                ]}

              ></IonAlert>

              <IonList inset={true}>
                {results.map((result) => (
                  <IonCard key={result.id}>
                    <IonCardHeader>
                      <IonCardTitle color={'primary'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                      <div style={{marginRight:'2px'}}>
                        <IonAvatar slot="start">
                          <img alt="Silhouette of mountains" src={require(`../static/images/${result.picture}.jpeg`)} />
                        </IonAvatar>
                      </div>
                        <div onClick={(e) => handleExerciseDetail(result.id?.toString())} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>
                          {result.name}
                        </div>
                        <IonCheckbox
                          checked={selectedExercises.includes(result)}
                          onIonChange={() => handleCheckboxChange(result)}
                        />
                      </IonCardTitle>
                      <IonCardSubtitle>
                        <div className="ion-text-center">
                          <IonChip>
                            {getIconBasedOnLevel(result.level)?.icon}
                            <IonLabel>Nivel {getIconBasedOnLevel(result.level)?.label}</IonLabel>
                          </IonChip>
                        </div>
                        <div className="ion-text-center">
                          <IonChip>
                            {getIconBasedOnFocus(result.focus)?.icon}
                            <IonLabel>{getIconBasedOnFocus(result.focus)?.label}</IonLabel>
                          </IonChip>
                        </div>
                      </IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent className='ion-text-center' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <div className="separator"></div>
                      {result.muscles?.map((muscle, index) => (
                        <span key={index}>
                          {index > 0 && ', '}
                          {muscle.name}
                          {index === (result.muscles?.length || 0) - 1 ? '.' : ''}
                        </span>
                      ))}
                    </IonCardContent>
                  </IonCard>
                ))}
              </IonList>
            </IonContent>
          </IonModal>

          <IonToast
            isOpen={showNoExerciseToast}
            onDidDismiss={() => setShowNoExerciseToast(false)}
            message="Debes seleccionar al menos 1 ejercicio y rellenar el nombre de la rutina."
            position="top"
            color="danger"
            duration={3000}
            cssClass="centered-toast"
          />

          <IonToast
            isOpen={showSuccessToast}
            onDidDismiss={() => setShowSuccessToast(false)}
            message="¡Rutina actualizada con éxito!"
            position="top"
            color="success"
            duration={3000}
            cssClass="centered-toast"
          />

          <IonAlert
            isOpen={showSegmentAlert}
            onDidDismiss={() => setShowSegmentAlert(false)}
            header="Recomendación"
            message="Selecciona la pestaña Sugeridos si quieres navegar entre los ejercicios que se adaptan a ti."
            buttons={['OK']}
          />

          <IonAlert
            isOpen={showConfirmationAlert}
            onDidDismiss={() => setShowConfirmationAlert(false)}
            header="Confirmación"
            message="¿Estás seguro de los cambios realizados?"
            buttons={[
              {
                text: 'No',
                role: 'cancel',
                handler: () => handleConfirmationAlert(false),
              },
              {
                text: 'Sí',
                handler: () => handleConfirmationAlert(true),
              },
            ]}
          />

        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditRoutine;
