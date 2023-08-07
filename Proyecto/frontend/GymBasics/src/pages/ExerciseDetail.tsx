import React, { useEffect, useState } from 'react';
import { IonButton, IonChip, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { getUserByUsername } from '../apis/UserApi';
import UserAuth from '../interfaces/UserAuth';
import { balloonOutline, barbellOutline, flameOutline, flashOutline, medalOutline, pin, rocketOutline } from 'ionicons/icons';
import benchpress from '../static/images/benchpress.gif';
import '../static/css/ExerciseDetail.css'
import ReactApexChart from 'react-apexcharts';

const ExerciseDetail: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [userData, setUserData] = useState<UserAuth>({});

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
            data: [12, 19, 3, 5, 2, 3, 4, 5, 6, 7, 8, 9],
            color: '#007bff',
        },
    ];

    return (
        <IonPage>
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
                        <img alt="Silhouette of mountains" src={benchpress} className='image-class' />
                        <IonCardHeader>
                            <IonCardTitle>Press Banca</IonCardTitle>
                            <IonCardSubtitle>
                                <div>
                                    <IonChip>
                                        <IonIcon icon={rocketOutline} color="danger" />
                                        <IonLabel>Nivel Intermedio</IonLabel>
                                    </IonChip>
                                </div>
                                <div>
                                    <IonChip>
                                        <IonIcon icon={barbellOutline} color="primary" />
                                        <IonLabel>Ganar Masa Muscular</IonLabel>
                                    </IonChip>
                                </div>
                            </IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>Pectoral Superior, Pectoral Medio, Triceps</IonCardContent>
                    </IonCard>

                    <IonText>
                        <h1>Estadísticas</h1>
                    </IonText>

                    <ReactApexChart options={options} series={series} type="bar" height={250} />

                    <IonSegment scrollable={true} value="heart">
                        <IonSegmentButton value="heart">
                            <IonText color="primary">Peso Max</IonText>
                        </IonSegmentButton>
                        <IonSegmentButton value="pin">
                            <IonText color="primary">Reps Max</IonText>
                        </IonSegmentButton>
                        <IonSegmentButton value="star">
                            <IonText color="primary">Volumen (kgs)</IonText>
                        </IonSegmentButton>
                        <IonSegmentButton value="call">
                            <IonText color="primary">Calorias</IonText>
                        </IonSegmentButton>
                    </IonSegment>



                    <IonText>
                        <h1>Récords Personales</h1>
                    </IonText>

                    <IonCard>
                        <IonCardContent>
                            <IonRow>
                                <IonCol size="6" className='ion-text-start'>Mayor Peso</IonCol>
                                <IonCol size="6" className="ion-text-end">26kg</IonCol>
                            </IonRow>
                            <div className="separator"></div>
                            <IonRow>
                                <IonCol size="6" className='ion-text-start'>Máximas Repeticiones</IonCol>
                                <IonCol size="6" className="ion-text-end">12</IonCol>
                            </IonRow>
                            <div className="separator"></div>
                            <IonRow>
                                <IonCol size="6" className='ion-text-start'>Máximo Volumen Total</IonCol>
                                <IonCol size="6" className="ion-text-end">824 kgs</IonCol>
                            </IonRow>
                            <div className="separator"></div>
                            <IonRow>
                                <IonCol size="6" className='ion-text-start'>Máximas Calorías Quemadas</IonCol>
                                <IonCol size="6" className="ion-text-end">230</IonCol>
                            </IonRow>
                            <div className="separator"></div>
                        </IonCardContent>
                    </IonCard>


                </div>
            </IonContent>
        </IonPage>
    );
};

export default ExerciseDetail;