import React, { useEffect, useState } from 'react';
import { IonBadge, IonButton, IonChip, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { getUserByUsername } from '../apis/UserApi';
import UserAuth from '../interfaces/UserAuth';
import { balloonOutline, barbellOutline, flameOutline, flashOutline, medalOutline, pin, rocketOutline } from 'ionicons/icons';
import '../static/css/ExerciseDetail.css'
import ReactApexChart from 'react-apexcharts';
import { getExerciseById } from '../apis/ExercisesApi';
import Exercise from '../interfaces/Exercise';
import { getIconBasedOnLevel } from '../components/LevelChange';
import { getIconBasedOnFocus } from '../components/FocusChange';
import { getWorkoutsByUsernameAndExerciseId } from '../apis/WorkoutApi';
import exerciseImages from '../components/ExerciseImages';


const ExerciseDetail: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [userData, setUserData] = useState<UserAuth>({});
    const { exerciseId } = useParams<{ exerciseId: any }>();
    const [exercise, setExercise] = useState<Exercise>();
    const [exerciseStats, setExerciseStats] = useState<any>(null);
    const [maxWeightsByMonth, setMaxWeightsByMonth] = useState<number[]>([]);
    const [maxRepsByMonth, setMaxRepsByMonth] = useState<number[]>([]);
    const [maxVolumeByMonth, setMaxVolumeByMonth] = useState<number[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("kgs");
    const [seriesData, setSeriesData] = useState<number[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);


    const calculateExerciseStats = (exercise: Exercise, workouts: any[]): any => {

        const maxWeight = workouts.reduce((max, workout) => {
            const exerciseResults = workout.activities[0].results;
            const weights = exerciseResults.map((result: { attr2: string; }) => parseFloat(result.attr2));
            const maxWeightInWorkout = Math.max(...weights);
            return maxWeightInWorkout > max ? maxWeightInWorkout : max;
        }, 0);

        const maxReps = workouts.reduce((max, workout) => {
            const exerciseResults = workout.activities[0].results;
            const reps = exerciseResults.map((result: { attr1: string; }) => parseInt(result.attr1));
            const maxRepsInWorkout = Math.max(...reps);
            return maxRepsInWorkout > max ? maxRepsInWorkout : max;
        }, 0);

        const volumes = workouts.map((workout) => {
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

            return activityVolume;
        });

        const maxTotalVolume = Math.max(...volumes);


        return {
            maxWeight,
            maxReps,
            maxTotalVolume,

        };
    };

    useEffect(() => {
        if (currentUser && exerciseId) {
            getWorkoutsByUsernameAndExerciseId(currentUser, exerciseId)
                .then((workouts) => {
                    if (exercise) {
                        const exerciseStats = calculateExerciseStats(exercise, workouts);
                        const maxWeightsByMonth = calculateMaxWeightByMonth(workouts);
                        const maxRepsByMonth = calculateMaxRepsByMonth(workouts);
                        const maxVolumeByMonth = calculateMaxVolumeByMonth(workouts);

                        // Guarda las estadísticas calculadas en el estado local
                        setExerciseStats(exerciseStats);
                        setMaxWeightsByMonth(maxWeightsByMonth);
                        setMaxRepsByMonth(maxRepsByMonth);
                        setMaxVolumeByMonth(maxVolumeByMonth);

                        setDataLoaded(true);
                    }
                })
                .catch((error) => {
                    console.error('Error obteniendo entrenamientos:', error);
                });
        }
    }, [currentUser, exerciseId, exercise]);



    useEffect(() => {
        if (exerciseId) {
            getExerciseById(exerciseId)
                .then((response) => {
                    if (response) {
                        setExercise({
                            name: response.name,
                            level: response.level,
                            focus: response.focus,
                            picture: response.picture,
                            muscles: response.muscles

                        });
                    }
                })
                .catch((error) => {
                    console.error('Error obteniendo detalles de la rutina:', error);
                });
        }
    }, [exerciseId]);


    const handleGoBack = () => {
        history.goBack();
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
                console.log(userData)
            }
        };

        fetchUserData();
    }, [currentUser]);


    const calculateMaxWeightByMonth = (workouts: any[]): number[] => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        const maxWeightsByMonth: number[] = new Array(12).fill(0);

        workouts.forEach((workout) => {
            const workoutDate = new Date(workout.date);
            const workoutYear = workoutDate.getFullYear();
            const workoutMonth = workoutDate.getMonth();

            if (workoutYear === currentYear && workoutMonth <= currentMonth) {
                const exerciseResults = workout.activities[0]?.results || [];
                const weights = exerciseResults.map((result: { attr2: string }) => parseFloat(result.attr2));
                const maxWeightInWorkout = Math.max(...weights);

                if (maxWeightInWorkout > maxWeightsByMonth[workoutMonth]) {
                    maxWeightsByMonth[workoutMonth] = maxWeightInWorkout;
                }
            }
        });

        return maxWeightsByMonth;
    };

    const calculateMaxRepsByMonth = (workouts: any[]): number[] => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        const maxRepsByMonth: number[] = new Array(12).fill(0);

        workouts.forEach((workout) => {
            const workoutDate = new Date(workout.date);
            const workoutYear = workoutDate.getFullYear();
            const workoutMonth = workoutDate.getMonth();

            if (workoutYear === currentYear && workoutMonth <= currentMonth) {
                const exerciseResults = workout.activities[0]?.results || [];
                const reps = exerciseResults.map((result: { attr1: string }) => parseFloat(result.attr1));
                const maxRepsInWorkout = Math.max(...reps);

                if (maxRepsInWorkout > maxRepsByMonth[workoutMonth]) {
                    maxRepsByMonth[workoutMonth] = maxRepsInWorkout;
                }
            }
        });

        return maxRepsByMonth;
    };

    const calculateMaxVolumeByMonth = (workouts: any[]): number[] => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        const maxVolumesByMonth: number[] = new Array(12).fill(0);

        workouts.forEach((workout) => {
            const workoutDate = new Date(workout.date);
            const workoutYear = workoutDate.getFullYear();
            const workoutMonth = workoutDate.getMonth();

            if (workoutYear === currentYear && workoutMonth <= currentMonth) {
                const exerciseResults = workout.activities[0]?.results || [];
                const volumes = exerciseResults.map(
                    (result: { attr1: string; attr2: string }) => {
                        const attr1Value = parseFloat(result.attr1);
                        const attr2Value = parseFloat(result.attr2);

                        if (!isNaN(attr1Value) && !isNaN(attr2Value)) {
                            return attr1Value * attr2Value;
                        }
                        return 0;
                    }
                );
                const totalVolumeInWorkout = volumes.reduce(
                    (total: number, volume: number) => total + volume,
                    0
                );

                if (totalVolumeInWorkout > maxVolumesByMonth[workoutMonth]) {
                    maxVolumesByMonth[workoutMonth] = totalVolumeInWorkout;
                }
            }
        });

        return maxVolumesByMonth;
    };



    useEffect(() => {
        if (dataLoaded) {
            if (selectedOption === "kgs") {
                setSeriesData(maxWeightsByMonth);
            } else if (selectedOption === "reps") {
                setSeriesData(maxRepsByMonth);
            } else if (selectedOption === "volume") {
                setSeriesData(maxVolumeByMonth);
            }
        }
    }, [dataLoaded, selectedOption]);



    const options = {
        chart: {
            id: 'basic-line',
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            enabled: false,
        },
        theme: {
            monochrome: {
                enabled: true,
            },
        },
    };


    const series = [
        {
            name: 'Peso Máximo',
            data: seriesData,
        },
    ];


    return (
        <IonPage>
            <>
                <IonHeader>
                    <IonToolbar>
                        <IonButton onClick={handleGoBack} color="medium">Volver</IonButton>
                        <IonTitle>
                            Detalles del Ejercicio
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>

                    <div className="ion-text-center" >

                        <IonCard>
                            {exercise?.picture && (
                                <img alt="Silhouette of mountains" src={require(`../static/images/${exercise?.picture}.jpeg`)} className='image-class' />
                            )}
                            <IonCardHeader>
                                <IonCardTitle>{exercise?.name}</IonCardTitle>
                                <IonCardSubtitle>
                                    <div className="ion-text-center">
                                        <IonChip>
                                            {getIconBasedOnLevel(exercise?.level)?.icon}
                                            <IonLabel>Nivel {getIconBasedOnLevel(exercise?.level)?.label}</IonLabel>
                                        </IonChip>
                                    </div>

                                    <div className="ion-text-center">
                                        <IonChip>
                                            {getIconBasedOnFocus(exercise?.focus)?.icon}
                                            <IonLabel>{getIconBasedOnFocus(exercise?.focus)?.label}</IonLabel>
                                        </IonChip>
                                    </div>
                                </IonCardSubtitle>
                            </IonCardHeader>

                            <IonCardContent>
                                {exercise?.muscles?.map((muscle, index) => (
                                    <span key={index}>
                                        {index > 0 && ', '}
                                        {muscle.name}
                                    </span>
                                ))}
                            </IonCardContent>
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

                        <ReactApexChart options={options} series={series} type="line" height={250} />

                        <IonSegment scrollable={true} value={selectedOption}>
                            <IonSegmentButton value="kgs" onClick={() => setSelectedOption("kgs")}>
                                <IonText color="primary">
                                    {exercise?.focus === 'loseweight' ? 'Tiempo Max' : 'Peso Max'}
                                </IonText>
                            </IonSegmentButton>
                            <IonSegmentButton value="reps" onClick={() => setSelectedOption("reps")}>
                                <IonText color="primary">
                                    {exercise?.focus === 'loseweight' ? 'Km Max' : 'Reps Max'}
                                </IonText>
                            </IonSegmentButton>
                            {exercise?.focus === 'musclemass' && (
                                <IonSegmentButton value="volume" onClick={() => setSelectedOption("volume")}>
                                    <IonText color="primary">Volumen (kgs)</IonText>
                                </IonSegmentButton>
                            )}
                        </IonSegment>



                        <IonText style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h1 style={{ fontSize: '1.5rem', color: '#c0a656', fontWeight: 'bold', marginBottom: '10px' }}>Récords Personales</h1>
                            <div
                                style={{
                                    width: '300px',
                                    height: '2px',
                                    backgroundColor: '#c0a656',
                                }}
                            ></div>
                        </IonText>

                        <IonCard>
                            <IonCardContent>
                                <IonRow>
                                    <IonCol size="6" className='ion-text-start'>
                                        {exercise?.focus === 'loseweight' ? 'Mayor Tiempo' : 'Mayor Peso'}
                                    </IonCol>
                                    <IonCol size="6" className="ion-text-end">
                                        <IonBadge color="success">
                                            {exerciseStats?.maxWeight} {exercise?.focus === 'loseweight' ? 'min' : 'kgs'}
                                        </IonBadge>
                                    </IonCol>
                                </IonRow>
                                <div className="separator"></div>
                                <IonRow>
                                    <IonCol size="6" className='ion-text-start'>
                                        {exercise?.focus === 'loseweight' ? 'Máximos Km' : 'Máximas Repeticiones'}
                                    </IonCol>
                                    <IonCol size="6" className="ion-text-end">
                                        <IonBadge color="secondary">
                                            {exerciseStats?.maxReps} {exercise?.focus === 'loseweight' ? 'km' : ''}
                                        </IonBadge>
                                    </IonCol>
                                </IonRow>
                                <div className="separator"></div>
                                {exercise?.focus === 'musclemass' && (
                                    <>
                                        <IonRow>
                                            <IonCol size="6" className='ion-text-start'>Máximo Volumen Total</IonCol>
                                            <IonCol size="6" className="ion-text-end">
                                                <IonBadge color="tertiary">
                                                    {exerciseStats?.maxTotalVolume} Kgs
                                                </IonBadge>
                                            </IonCol>
                                        </IonRow>
                                        <div className="separator"></div>
                                    </>
                                )}
                            </IonCardContent>
                        </IonCard>


                    </div>
                </IonContent>
            </>
        </IonPage>
    );
};

export default ExerciseDetail;


