import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonInput, IonItem, IonLabel, IonReorder, IonRow, IonTextarea, IonAvatar, IonChip, IonIcon, IonList, IonPopover, IonText } from "@ionic/react";
import { ellipsisHorizontalOutline, createOutline, timeOutline, barbellOutline, bicycleOutline } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";

const TrainingDetail: React.FC = () => {

  const history = useHistory();

  const data = [
    'Flexiones',
    'Sentadillas',
    'Abdominales',
    'Dominadas',
  ];

  const [selectedExercises, setSelectedExercises] = useState<string[]>([data[0], data[1], data[2], data[3]]);

  const handleExerciseDetail = () => {
    history.push('/ExerciseDetail');
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle del entrenamiento</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-text-center">

          <IonCard>
            <IonCardContent>Has realizado un total de 4 ejercicios, sigue así </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Lunes
                <IonIcon id='popover-profile' icon={ellipsisHorizontalOutline} color="primary" style={{ marginLeft: '5px' }} />
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
            </IonCardContent>
          </IonCard>

          <IonText>
            <h1>Ejercicios Realizados</h1>
          </IonText>
          
          <div className="ion-text-center-small">
          {selectedExercises.map((exercise, index) => (

            
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div onClick={handleExerciseDetail}>
                      {exercise}
                    </div>

                    <IonIcon icon={ellipsisHorizontalOutline} color="primary" style={{ marginLeft: '5px' }} />

                  </IonCardTitle>
                  <IonCardSubtitle>
                    <div>Nivel Avanzado</div>
                    <div>Ganar Masa Muscular</div>

                  </IonCardSubtitle>

                </IonCardHeader>
                <IonCardContent >
                  <IonText>
                  Subimos repeticiones 
                  </IonText>
                  
                  <div className="separator"></div>

                  <IonRow>
                    <IonCol size="4">
                      <IonLabel>Serie </IonLabel>
                      
                    </IonCol>
                    <IonCol size="4">
                      <IonLabel>Reps</IonLabel>
                      
                    </IonCol>
                    <IonCol size="4">
                      <IonLabel>Kgs</IonLabel>
                      
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="4">
                      
                      <IonText>1</IonText>
                    </IonCol>
                    <IonCol size="4">
                      
                      <IonText>10</IonText>
                    </IonCol>
                    <IonCol size="4">
                      
                      <IonText>10</IonText>
                    </IonCol>
                  </IonRow>

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