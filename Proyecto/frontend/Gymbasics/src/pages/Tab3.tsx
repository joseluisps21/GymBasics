import React, { useEffect, useRef, useState } from 'react';
import { IonActionSheet, IonAlert, IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonPopover, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton, IonText, IonTitle, IonToast, IonToolbar, RefresherEventDetail } from '@ionic/react';
import './Tab3.css';
import { ellipsisHorizontalOutline, createOutline, trashOutline, balloonOutline, flameOutline, flashOutline, bicycleOutline, barbellOutline, rocketOutline, extensionPuzzleOutline, barbell, basket, call, globe, heart, home, person, pin, star, trash, timeOutline, eyeOutline, eyeOffOutline, settingsOutline } from 'ionicons/icons';
import { getRoutinesByUsername, getUserByUsername } from '../apis/UserApi';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import UserAuth from '../interfaces/UserAuth';
import ReactApexChart from 'react-apexcharts';
import { getIconBasedOnLevel } from '../components/LevelChange';
import { getIconBasedOnFocus } from '../components/FocusChange';
import RoutineResponse from '../interfaces/RoutineResponse';
import { formatDate } from '../components/dateUtils';
import { deleteWorkout } from '../apis/WorkoutApi';



const Tab3: React.FC = () => {

  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [userData, setUserData] = useState<UserAuth>({});

  const [routines, setRoutines] = useState<RoutineResponse[]>([]);

  const [hiddenRoutines, setHiddenRoutines] = useState<number[]>([]);
  const [monthlyVolumes, setMonthlyVolumes] = useState<number[]>([]);
  const [durationByMonth, setDurationByMonth] = useState<number[]>([]);
  const [numberOfWorkoutsByMonth, setNumberOfWorkoutsByMonth] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("duration");
  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [numberOfActivitiesByMonth, setNumberOfActivitiesByMonth] = useState<number[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [openActionSheetId, setOpenActionSheetId] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);


  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  const handleDeleteWorkout = async (workoutId: string) => {
    try {
      const response = await deleteWorkout(workoutId);
      if (response?.status === 200) {
        // Eliminación exitosa
        console.log('Entrenamiento eliminado con éxito.');
        setShowSuccessToast(true);
        // Actualiza la lista de entrenamientos después de eliminar
        const updatedRoutines = await getRoutinesByUsername(currentUser);
        setRoutines(updatedRoutines);
      } else {
        console.error('Error al eliminar el entrenamiento.');
        setShowErrorToast(true);
      }
    } catch (error) {
      console.error('Error al eliminar el entrenamiento.', error);
      setShowErrorToast(true);
    } finally {
      closeActionSheet(workoutId);
    }
  };


  const OnLogout = () => {
    logout();
    window.location.reload();
  };

  const handleUpdatePassword = () => {
    history.push('/EditPassword');
    modal.current?.dismiss();
  };

  const handleEditProfile = () => {
    history.push('/EditProfile');
    modal.current?.dismiss();
  };

  const openActionSheet = (workoutId: string) => {
    setOpenActionSheetId(workoutId);
  };

  const closeActionSheet = (workoutId: string) => {
    setOpenActionSheetId(null);
  };

  const isActionSheetOpen = (workoutId: string): boolean => {
    return openActionSheetId === workoutId;
  };

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      const response = await getRoutinesByUsername(currentUser);

      if (response) {
        setRoutines(response);
        setDataLoaded(true);
      }

      const userDataResponse = await OnFilterUser();
      if (userDataResponse) {
        setUserData(userDataResponse);
      }

      const updatedMonthlyVolumes = calculateMonthlyVolumes(response);
      setMonthlyVolumes(updatedMonthlyVolumes);

      const updatedDurationByMonth = calculateTotalDurationByMonth(response);
      setDurationByMonth(updatedDurationByMonth);

      const updatedNumberOfWorkouts = calculateNumberOfWorkoutsByMonth(response);
      setNumberOfWorkoutsByMonth(updatedNumberOfWorkouts);

      setTimeout(() => {
        event.detail.complete(); // Indica que la operación de refresco está completa
      }, 2000);
    } catch (error) {
      console.error(error);
      event.detail.complete();
    }
  };


  const handleExerciseDetail = (exerciseId: any) => {
    history.push(`/ExerciseDetail/${exerciseId}`);

  };

  const calculateMonthlyVolumes = (routines: RoutineResponse[]) => {
    const monthlyVolumes: number[] = new Array(12).fill(0);
    const currentYear = new Date().getFullYear();
  
    routines.forEach((routine) => {
      routine.workouts?.forEach((workout) => {
        const workoutYear = new Date(workout.date).getFullYear();
        if (workoutYear === currentYear) {
          const exerciseResults = workout.activities[0]?.results || [];
          const activityVolume = exerciseResults.reduce((total: number, result: any) => {
            const attr1Value = parseFloat(result.attr1);
            const attr2Value = parseFloat(result.attr2);
  
            if (!isNaN(attr1Value) && !isNaN(attr2Value)) {
              // Convierte los valores a números redondeados a 2 decimales
              const roundedAttr1 = parseFloat(attr1Value.toFixed(2));
              const roundedAttr2 = parseFloat(attr2Value.toFixed(2));
  
              const volume = roundedAttr1 * roundedAttr2;
              return total + volume;
            }
  
            return total;
          }, 0);
  
          const month = new Date(workout.date).getMonth();
          monthlyVolumes[month] += activityVolume;
        }
      });
    });
  
    return monthlyVolumes;
  };
  

  const calculateTotalDurationByMonth = (routines: RoutineResponse[]) => {
    const totalDurationByMonth: number[] = new Array(12).fill(0);
    const currentYear = new Date().getFullYear();
  
    routines.forEach((routine) => {
      routine.workouts?.forEach((workout) => {
        const workoutYear = new Date(workout.date).getFullYear();
        if (workoutYear === currentYear && workout?.time) {
          const month = new Date(workout.date).getMonth();
          const [hours, minutes] = workout.time.split(':').map(parseFloat);
          if (!isNaN(hours) && !isNaN(minutes)) {
            // Convierte las horas y minutos a un valor decimal
            const durationInDecimal = hours + minutes / 60;
            // Redondea a 2 decimales
            const durationRounded = parseFloat(durationInDecimal.toFixed(2));
            totalDurationByMonth[month] += durationRounded;
          }
        }
      });
    });
  
    return totalDurationByMonth;
  };
  
  

  const calculateNumberOfWorkoutsByMonth = (routines: RoutineResponse[]) => {
    const numberOfWorkoutsByMonth: number[] = new Array(12).fill(0);
    const currentYear = new Date().getFullYear();

    routines.forEach((routine) => {
      routine.workouts?.forEach((workout) => {
        const workoutYear = new Date(workout.date).getFullYear();
        if (workoutYear === currentYear) {
          const month = new Date(workout.date).getMonth();
          numberOfWorkoutsByMonth[month] += 1;
        }
      });
    });

    return numberOfWorkoutsByMonth;
  };

  const calculateNumberOfActivitiesByMonth = (routines: RoutineResponse[]) => {
    const numberOfActivitiesByMonth: number[] = new Array(12).fill(0);
    const currentYear = new Date().getFullYear();

    routines.forEach((routine) => {
      routine.workouts?.forEach((workout) => {
        const workoutYear = new Date(workout.date).getFullYear();
        if (workoutYear === currentYear) {
          const numberOfActivities = workout.activities.length;
          const month = new Date(workout.date).getMonth();
          numberOfActivitiesByMonth[month] += numberOfActivities;
        }
      });
    });

    return numberOfActivitiesByMonth;
  };




  useEffect(() => {
    // Actualiza la serie de datos cuando dataLoaded sea true
    if (dataLoaded) {
      if (selectedOption === "volume") {
        setSeriesData(monthlyVolumes);
      } else if (selectedOption === "duration") {
        setSeriesData(durationByMonth);
      } else if (selectedOption === "workouts") {
        setSeriesData(numberOfWorkoutsByMonth);
      } else if (selectedOption === "exercises") {
        setSeriesData(numberOfActivitiesByMonth);
      }
    }
  }, [dataLoaded, selectedOption]);


  const handleTrainingDetail = (workoutId: any) => {
    history.push(`/TrainingDetail/${workoutId}`);

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
        setUserData(userData);
      }
    };

    fetchUserData();
  }, [currentUser]);

  useEffect(() => {
    async function fetchRoutines() {
      const response = await getRoutinesByUsername(currentUser);
      if (response) {
        setRoutines(response);
        console.log(routines)

        // Calcula los volúmenes mensuales
        const monthlyVolumes = calculateMonthlyVolumes(response);
        setMonthlyVolumes(monthlyVolumes);

        // Calcula la duración total mensual
        const totalDurations = calculateTotalDurationByMonth(response);
        setDurationByMonth(totalDurations);

        // Calcula el número de entrenamientos mensuales
        const numberOfWorkouts = calculateNumberOfWorkoutsByMonth(response);
        setNumberOfWorkoutsByMonth(numberOfWorkouts);

        // Calcula el número de Ejercicios mensuales
        const numberOfActivities = calculateNumberOfActivitiesByMonth(response);
        setNumberOfActivitiesByMonth(numberOfActivities);
        setDataLoaded(true);

      } else {
        console.log("no hay response")
      }
    }
    fetchRoutines();
    console.log("estas son las seriesDatas")
    console.log(seriesData)
  }, [currentUser]);




  const options = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false,
      },
      events: {},
    },
    xaxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: false, // Oculta las etiquetas de datos al poner el cursor sobre las barras
    },
    tooltip: {
      enabled: false, // Deshabilita la información al dejar el cursor sobre una barra
    },
    theme: {
      monochrome: {
        enabled: true,
      },
    },
  };

  const series = [
    {
      name: 'Ventas',
      data: seriesData,
      color: '#007bff',
    },
  ];


  const toggleRoutineVisibility = (routineId: number) => {
    if (hiddenRoutines.includes(routineId)) {
      setHiddenRoutines(hiddenRoutines.filter(id => id !== routineId));
    } else {
      setHiddenRoutines([...hiddenRoutines, routineId]);
    }
  };


  return (
    <IonPage>
        <>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Tu Perfil</IonTitle>
              <IonIcon size='large' icon={settingsOutline} color="primary" slot="end" style={{ marginRight: '10px', cursor: 'pointer' }} id="open-modal-profile" />
            </IonToolbar>
          </IonHeader>


          <IonContent fullscreen>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
              <IonRefresherContent>
              </IonRefresherContent>
            </IonRefresher>
            <div className="ion-text-center">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{userData.username}</IonCardTitle>
                  <IonCardSubtitle>
                    <div>
                      <IonChip>
                        {getIconBasedOnLevel(userData?.level)?.icon}
                        <IonLabel>Nivel {getIconBasedOnLevel(userData?.level)?.label}</IonLabel>
                      </IonChip>
                    </div>
                    <div>
                      <IonChip>
                        {getIconBasedOnFocus(userData?.focus)?.icon}
                        <IonLabel>{getIconBasedOnFocus(userData?.focus)?.label}</IonLabel>
                      </IonChip>
                    </div>
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent> Edita tu perfil, accede a estadísticas al detalle personalizadas y consulta los últimos entrenamientos realizados </IonCardContent>
              </IonCard>

              <IonText style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.5rem', color: '#c0a656', fontWeight: 'bold', marginBottom: '10px' }}>Estadísticas</h1>
                <div
                  style={{
                    width: '180px',
                    height: '2px',
                    backgroundColor: '#c0a656',
                  }}
                ></div>
              </IonText>

              <ReactApexChart options={options} series={series} type="bar" height={250} />

              <IonSegment scrollable={true} value={selectedOption}>
                <IonSegmentButton value="duration" onClick={() => setSelectedOption("duration")}>
                  <IonText color="primary">Duración (horas)</IonText>
                </IonSegmentButton>
                <IonSegmentButton value="volume" onClick={() => setSelectedOption("volume")}>
                  <IonText color="primary">Volumen (kgs)</IonText>
                </IonSegmentButton>
                <IonSegmentButton value="workouts" onClick={() => setSelectedOption("workouts")}>
                  <IonText color="primary">Entrenamientos</IonText>
                </IonSegmentButton>
                <IonSegmentButton value="call" onClick={() => setSelectedOption("exercises")}>
                  <IonText color="primary">Ejercicios</IonText>
                </IonSegmentButton>
              </IonSegment>

              <IonText style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.5rem', color: '#c0a656', fontWeight: 'bold', marginBottom: '10px' }}>Entrenamientos Realizados</h1>
                <div
                  style={{
                    width: '350px',
                    height: '2px',
                    backgroundColor: '#c0a656',
                  }}
                ></div>
              </IonText>

              {routines.map((routine) => (
                <div key={routine.id}>
                  <IonText >
                    <h2 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {routine.name}
                    </h2>
                    <IonIcon
                      icon={hiddenRoutines.includes(routine.id) ? eyeOutline : eyeOffOutline}
                      color="primary"
                      style={{ marginLeft: '5px', cursor: 'pointer' }}
                      onClick={() => toggleRoutineVisibility(routine.id)}
                    />
                  </IonText>


                  {!hiddenRoutines.includes(routine.id) &&
                    routine.workouts
                      ?.slice()
                      .reverse()
                      .map((workout) => (
                        <IonCard key={workout.id}>
                          <IonCardHeader>
                            <IonCardTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              {workout?.date ? (
                                <p>{formatDate(workout.date)}</p>
                              ) : (
                                <p>Fecha no disponible</p>
                              )}
                              <IonIcon
                                id={`actionsheet-profile-${workout.id}`}
                                icon={ellipsisHorizontalOutline}
                                color="primary"
                                style={{ marginLeft: '5px', cursor: 'pointer' }}
                                onClick={() => openActionSheet(workout.id.toString())}
                              />

                              <IonActionSheet
                                id={`actionsheet-${workout.id}`}
                                isOpen={isActionSheetOpen(workout.id.toString())}
                                onDidDismiss={() => closeActionSheet(workout.id.toString())}
                                buttons={[
                                  {
                                    text: 'Ver Entrenamiento',
                                    handler: () => {
                                      handleTrainingDetail(workout.id.toString());
                                      closeActionSheet(workout.id.toString());
                                    },
                                  },
                                  {
                                    text: 'Eliminar Entrenamiento',
                                    role: 'destructive',
                                    handler: () => {
                                      handleDeleteWorkout(workout.id.toString());
                                    },
                                  },
                                  {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                  },
                                ]}
                              />



                            </IonCardTitle>
                          </IonCardHeader>
                          <IonCardContent>
                            <IonCardSubtitle>
                            </IonCardSubtitle>
                            <h2>Ejercicios realizados:</h2>
                            {workout.activities.map((activity) => (
                              <IonItem key={activity.id}>
                                <IonAvatar slot="start">
                                  <img alt="Silhouette of mountains" src={require(`../static/images/${activity.exercise?.picture}.jpeg`)} />
                                </IonAvatar>
                                <IonLabel>

                                  <IonText color={'primary'}>
                                    <div style={{ cursor: 'pointer' }} key={activity.exercise.id} onClick={(e) => handleExerciseDetail(activity.exercise.id.toString())}>{activity.exercise.name}</div>
                                  </IonText>

                                </IonLabel>
                              </IonItem>
                            ))}
                          </IonCardContent>
                        </IonCard>

                      ))}
                  <div className="separator"></div>
                </div>
              ))}
              <IonModal ref={modal} id='modal-profile' trigger="open-modal-profile" presentingElement={presentingElement!}>
                <IonHeader>
                  <IonToolbar>
                    <IonTitle>
                      Ajustes

                    </IonTitle>
                    <IonButtons slot="end">
                      <IonButton onClick={() => dismiss()}>Cerrar</IonButton>
                    </IonButtons>
                  </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">

                  <IonCard>
                    <IonCardContent class='ion-text-center'>
                      <IonButton onClick={handleEditProfile} fill="clear" >Editar Perfil</IonButton>
                    </IonCardContent>
                  </IonCard>

                  <IonCard>
                    <IonCardContent class='ion-text-center'>
                      <IonButton onClick={handleUpdatePassword} fill="clear" >Actualizar Contraseña</IonButton>
                    </IonCardContent>
                  </IonCard>

                  <IonCard>
                    <IonCardContent class='ion-text-center'>
                      <IonButton onClick={OnLogout} fill="clear" color={'danger'} >Cerrar sesión</IonButton>
                    </IonCardContent>
                  </IonCard>


                </IonContent>
              </IonModal>
            </div>


            <IonToast
              isOpen={showSuccessToast}
              onDidDismiss={() => setShowSuccessToast(false)}
              message="¡Entrenamiento eliminado con éxito!"
              color="success"
              duration={2000}
              position='top'
              cssClass="centered-toast"
            />

            <IonToast
              isOpen={showErrorToast}
              onDidDismiss={() => setShowErrorToast(false)}
              message="Error al eliminar el entrenamiento."
              color="danger"
              duration={2000}
              position='top'
              cssClass="centered-toast"
            />
          </IonContent>

        </>
    </IonPage>
  );
};

export default Tab3;




