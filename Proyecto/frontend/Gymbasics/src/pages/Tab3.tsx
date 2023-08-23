import React, { useEffect, useState } from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonPopover, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { ellipsisHorizontalOutline, createOutline, trashOutline, balloonOutline, flameOutline, flashOutline, bicycleOutline, barbellOutline, rocketOutline, extensionPuzzleOutline, barbell, basket, call, globe, heart, home, person, pin, star, trash, timeOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { getRoutinesByUsername, getUserByUsername } from '../apis/UserApi';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import UserAuth from '../interfaces/UserAuth';
import { Component } from "react";
import Chart from "react-apexcharts"
import ReactApexChart from 'react-apexcharts';
import TrainingDetail from './TrainingDetail';
import { getIconBasedOnLevel } from '../components/LevelChange';
import { getIconBasedOnFocus } from '../components/FocusChange';
import Routine from '../interfaces/Routine';
import Exercise from '../interfaces/Exercise';
import Workout from '../interfaces/Workout';
import RoutineResponse from '../interfaces/RoutineResponse';
import { formatDate } from '../components/dateUtils';



const Tab3: React.FC = () => {

  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [userData, setUserData] = useState<UserAuth>({});

  const [routines, setRoutines] = useState<RoutineResponse[]>([]);
  const [workout, setWorkout] = useState<Workout>();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [hiddenRoutines, setHiddenRoutines] = useState<number[]>([]);
  const [monthlyVolumes, setMonthlyVolumes] = useState<number[]>([]);
  const [durationByMonth, setDurationByMonth] = useState<number[]>([]);
  const [numberOfWorkoutsByMonth, setNumberOfWorkoutsByMonth] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("duration");
  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [numberOfActivitiesByMonth, setNumberOfActivitiesByMonth] = useState<number[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

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
              const volume = attr1Value * attr2Value;
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
        if (workoutYear === currentYear && workout?.time && !isNaN(parseFloat(workout.time))) {
          const month = new Date(workout.date).getMonth();
          totalDurationByMonth[month] += parseFloat(workout.time);
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
      {dataLoaded && (
        <>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Tu Perfil</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent fullscreen>
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
                  <IonText color="primary">Duración</IonText>
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
                      ?.slice() // Crear una copia del array de workouts
                      .reverse() // Revertir el orden de la copia
                      .map((workout) => (
                        <IonCard key={workout.id}>
                          <IonCardHeader>
                            <IonCardTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              {workout?.date ? (
                                <p>{formatDate(workout.date)}</p>
                              ) : (
                                <p>Fecha no disponible</p>
                              )}
                              <IonIcon id={`popover-profile-${workout.id}`} icon={ellipsisHorizontalOutline} color="primary" style={{ marginLeft: '5px', cursor:'pointer' }} />
                              <IonPopover trigger={`popover-profile-${workout.id}`} dismissOnSelect={true}>
                                <IonContent>
                                  <IonList onClick={(e) => handleTrainingDetail(workout.id.toString())}>
                                    <IonItem button={true} detail={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                      Ver Entrenamiento
                                    </IonItem>
                                  </IonList>
                                </IonContent>
                              </IonPopover>
                            </IonCardTitle>
                          </IonCardHeader>
                          <IonCardContent>
                            <IonCardSubtitle>
                              {/* ... (chips de duración y ejercicios) */}
                            </IonCardSubtitle>
                            <h2>Ejercicios realizados:</h2>
                            {workout.activities.map((activity) => (
                              <IonItem key={activity.id}>
                                <IonAvatar slot="start">
                                  <img alt="Silhouette of mountains" src={require(`../static/images/${activity.exercise?.picture}.jpeg`)} />
                                </IonAvatar>
                                <IonLabel>
                                  {/* Recorremos los ejercicios de la rutina */}

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
            </div>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default Tab3;




