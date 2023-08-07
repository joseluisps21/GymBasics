import React, { useEffect, useState } from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonPopover, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { ellipsisHorizontalOutline, createOutline, trashOutline, balloonOutline, flameOutline, flashOutline, bicycleOutline, barbellOutline, rocketOutline, extensionPuzzleOutline, barbell, basket, call, globe, heart, home, person, pin, star, trash, timeOutline } from 'ionicons/icons';
import { getUserByUsername } from '../apis/UserApi';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import UserAuth from '../interfaces/UserAuth';
import { Component } from "react";
import Chart from "react-apexcharts"
import ReactApexChart from 'react-apexcharts';
import TrainingDetail from './TrainingDetail';



const Tab3: React.FC = () => {

  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [userData, setUserData] = useState<UserAuth>({});

  const handleTrainingDetail = () => {
    history.push('/TrainingDetail');
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

  const getIconBasedOnLevel = (level: string | undefined) => {
    switch (level) {
      case 'beginner':
        return { icon: <IonIcon icon={balloonOutline} color="tertiary" />, label: 'Principiante' };
      case 'intermediate':
        return { icon: <IonIcon icon={rocketOutline} color="danger" />, label: 'Intermedio' };
      case 'advanced':
        return { icon: <IonIcon icon={flashOutline} color="success" />, label: 'Avanzado' };
      default:
        return { icon: null, label: '' };
    }
  };

  const getIconBasedOnFocus = (focus: string | undefined) => {
    switch (focus) {
      case 'loseweight':
        return { icon: <IonIcon icon={bicycleOutline} color="primary" />, label: 'Perder Peso' };
      case 'musclemass':
        return { icon: <IonIcon icon={barbellOutline} color="primary" />, label: 'Ganar Masa Muscular' };
      case 'mixed':
        return { icon: <IonIcon icon={extensionPuzzleOutline} color="primary" />, label: 'Mixto' };
      default:
        return { icon: null, label: '' };
    }
  };

  const getFocusText = (focus: string | undefined) => {
    switch (focus) {
      case 'loseweight':
        return 'Perder Peso';
      case 'musclemass':
        return 'Ganar Masa Muscular';
      case 'mixed':
        return 'Mixto';
      default:
        return '';
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
          <IonTitle>
            Tu Perfil
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-text-center" >

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

          <IonText>
            <h1>
              Estadísticas
            </h1>
          </IonText>

          <ReactApexChart options={options} series={series} type="bar" height={250} />

          <IonSegment scrollable={true} value="heart">
            <IonSegmentButton value="home">
              <IonText color="primary">Duración</IonText>
            </IonSegmentButton>
            <IonSegmentButton value="heart">
              <IonText color="primary">Volumen (kgs)</IonText>
            </IonSegmentButton>
            <IonSegmentButton value="pin">
              <IonText color="primary">Calorías</IonText>
            </IonSegmentButton>
            <IonSegmentButton value="star">
              <IonText color="primary">Entrenamientos</IonText>
            </IonSegmentButton>
            <IonSegmentButton value="call">
              <IonText color="primary">Ejercicios</IonText>
            </IonSegmentButton>
          </IonSegment>

          <IonText>
            <h1>
              Entrenamientos
            </h1>
          </IonText>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Lunes
                <IonIcon id='popover-profile' icon={ellipsisHorizontalOutline} color="primary" style={{ marginLeft: '5px' }} />
                <IonPopover trigger="popover-profile" dismissOnSelect={true}>
                  <IonContent>
                    <IonList onClick={handleTrainingDetail}>
                      <IonItem button={true} detail={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <IonIcon  icon={createOutline} color="primary" style={{ marginLeft: '3px' }} />
                        Ver Entrenamiento
                      </IonItem>
                    </IonList>
                  </IonContent>
                </IonPopover>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonCardSubtitle>
                <IonChip>
                  <IonIcon icon={timeOutline} />
                  <IonLabel>1 hora</IonLabel>
                </IonChip>
                <IonChip>
                  <IonIcon icon={barbellOutline} />
                  <IonLabel>3200 kgs</IonLabel>
                </IonChip>
                <IonChip>
                  <IonIcon icon={bicycleOutline} />
                  <IonLabel>435 calorías</IonLabel>
                </IonChip>
              </IonCardSubtitle>
              <h2>Ejercicios realizados:</h2>
              <IonItem>
                <IonAvatar slot="start">
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <IonLabel>Press Militar</IonLabel>
              </IonItem>
              <IonItem>
                <IonAvatar slot="start">
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <IonLabel>Elevaciones Laterales</IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>


        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;




