import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonInput, IonItem, IonLabel, IonReorder, IonRow, IonTextarea, IonAvatar, IonChip, IonIcon, IonList, IonPopover, IonText } from "@ionic/react";
import { ellipsisHorizontalOutline, createOutline, timeOutline, barbellOutline, bicycleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import WorkoutResponse from "../interfaces/WorkoutResponse";
import { getWorkoutById } from "../apis/WorkoutApi";
import { getIconBasedOnLevel } from "../components/LevelChange";
import { getIconBasedOnFocus } from "../components/FocusChange";
import { useAuth } from "../contexts/AuthContext";
import UserAuth from "../interfaces/UserAuth";
import { getUserByUsername } from "../apis/UserApi";
import { formatDate } from "../components/dateUtils";

const TrainingDetail: React.FC = () => {

  const history = useHistory();
  const { workoutId } = useParams<{ workoutId: any }>();
  const [workout, setWorkout] = useState<WorkoutResponse | null>(null);
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState<UserAuth>({});


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
        //console.log(userData)
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleExerciseDetail = (exerciseId: any) => {
    history.push(`/ExerciseDetail/${exerciseId}`);

  };

  useEffect(() => {
    async function fetchWorkout() {
      if (!workoutId) {
        console.error('Workout ID is missing');
        return;
      }

      try {
        const response = await getWorkoutById(workoutId);
        setWorkout(response);
      } catch (error) {
        console.error("Error obteniendo detalles del entrenamiento:", error);
      }
    }

    fetchWorkout();
  }, [workoutId]);

  const calculateTotalSeries = (workout: WorkoutResponse | null): number => {
    if (!workout) return 0;

    let totalSeries = 0;
    workout.activities.forEach((activity) => {
      totalSeries += activity.results.length;
    });

    return totalSeries;
  };

  const totalSeries = calculateTotalSeries(workout);

  // Función para calcular repeticiones por kgs
  const calculateRepsByKgs = (workout: WorkoutResponse | null, focus: string): number => {
    let totalRepsByKgs = 0;

    if (!workout) return totalRepsByKgs;

    workout.activities.forEach((activity) => {
      if (activity.exercise.focus === focus) {
        activity.results.forEach((result) => {
          totalRepsByKgs += Number(result.attr1) * Number(result.attr2);
        });
      }
    });

    return totalRepsByKgs;
  };

  const calculateTotalDistance = (workout: WorkoutResponse | null): number => {
    let totalDistance = 0;

    if (!workout) return totalDistance;

    workout.activities.forEach((activity) => {
      if (activity.exercise.focus === 'loseweight') {
        activity.results.forEach((result) => {
          totalDistance += Number(result.attr1); // Suma la distancia en kilómetros
        });
      }
    });

    return totalDistance;
  };

  const totalDistance = calculateTotalDistance(workout);

  const totalRepsByKgs = calculateRepsByKgs(workout, 'musclemass');





  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton onClick={handleGoBack} color="medium">Volver</IonButton>
          <IonTitle>Detalle del entrenamiento</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-text-center">

          <IonCard>
            <IonCardContent>Has realizado un total de {totalSeries} series entre los distintos ejercicios, ¡sigue así! </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle >
                {workout?.date ? (
                  <p>{formatDate(workout.date)}</p>
                ) : (
                  <p>Fecha no disponible</p>
                )}
                
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonCardSubtitle>
                <IonChip>
                  <IonIcon icon={timeOutline} color="primary" />
                  <IonLabel>{workout?.time}</IonLabel>
                </IonChip>
                {totalRepsByKgs > 0 && (
                  <IonChip>
                    <IonIcon icon={barbellOutline} color="primary" />
                    <IonLabel>{totalRepsByKgs.toFixed(2)} kgs</IonLabel>
                  </IonChip>
                )}
                {totalDistance > 0 && (
                  <IonChip>
                    <IonIcon icon={bicycleOutline} color="primary" />
                    <IonLabel>{totalDistance.toFixed(2)} km</IonLabel>
                  </IonChip>
                )}
              </IonCardSubtitle>
            </IonCardContent>
          </IonCard>

          <IonText>
            <h1>Ejercicios Realizados</h1>
          </IonText>

          <div className="ion-text-center-small">
            {workout?.activities.map((activity) => (
              <IonCard key={activity.id}>
                <IonCardHeader>
                  <IonCardTitle color={'primary'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{flex:1}}>
                        <IonAvatar slot="start">
                          <img alt="Silhouette of mountains" src={require(`../static/images/${activity.exercise.picture}.jpeg`)} />
                        </IonAvatar>
                      </div>

                    <div className="div-left" onClick={(e) => handleExerciseDetail(activity.exercise.id?.toString())}>
                      {activity.exercise.name}
                    </div>
                  </IonCardTitle>
                  <IonCardSubtitle>
                    <div>
                      <IonChip>
                        {getIconBasedOnLevel(activity.exercise.level)?.icon}
                        <IonLabel>Nivel {getIconBasedOnLevel(activity.exercise.level)?.label}</IonLabel>
                      </IonChip>
                    </div>
                    <div>
                      <IonChip>
                        {getIconBasedOnFocus(activity.exercise.focus)?.icon}
                        <IonLabel>{getIconBasedOnFocus(activity.exercise.focus)?.label}</IonLabel>
                      </IonChip>
                    </div>

                  </IonCardSubtitle>

                </IonCardHeader>
                <IonCardContent >
                  <IonText>
                    {activity.note}
                  </IonText>

                  <div className="separator"></div>

                  <IonRow>
                    <IonCol size="4">
                      <IonLabel>Serie </IonLabel>

                    </IonCol>

                    <IonCol size="4">
                      {activity.exercise.focus === 'musclemass' ? (
                        <IonLabel>Reps</IonLabel>
                      ) : activity.exercise.focus === 'loseweight' ? (
                        <IonLabel>Km</IonLabel>
                      ) : null}
                    </IonCol>
                    <IonCol size="4">
                      {activity.exercise.focus === 'musclemass' ? (
                        <IonLabel>Kgs</IonLabel>
                      ) : activity.exercise.focus === 'loseweight' ? (
                        <IonLabel>Tiempo</IonLabel>
                      ) : null}
                    </IonCol>
                  </IonRow>
                  {activity.results.map((result) => (
                    <IonRow key={result.id}>
                      <IonCol size="4">

                        <IonText>{result.serie}</IonText>
                      </IonCol>
                      <IonCol size="4">

                        <IonText>{result.attr1}</IonText>
                      </IonCol>
                      <IonCol size="4">

                        <IonText>{result.attr2}</IonText>
                      </IonCol>
                    </IonRow>
                  ))}
                </IonCardContent>
              </IonCard>


            ))}
          </div>
        </div>

      </IonContent>
    </IonPage>

  );

};

export default TrainingDetail;