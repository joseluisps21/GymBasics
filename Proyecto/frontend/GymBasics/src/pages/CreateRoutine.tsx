import React, { useEffect, useRef } from 'react';
import { IonAlert, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import ExerciseDetail from './ExerciseDetail';
import { addCircleOutline } from 'ionicons/icons';

const CreateRoutine: React.FC = () => {
  const history = useHistory();
  const data = [
    'Flexiones',
    'Sentadillas',
    'Abdominales',
    'Dominadas',
    'Press de banca',
    'Zancadas',
    'Planchas',
    'Remo con mancuerna',
    'Fondos en paralelas',
    'Peso muerto',
  ];

  const handleExerciseDetail = () => {
    history.push('/ExerciseDetail');
    modal.current?.dismiss();
  };

  const handleCreateExercise = () => {
    history.push('/CreateExercise');
    modal.current?.dismiss();
  };

  const [results, setResults] = useState([...data]);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const handleInput = (ev: Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(data.filter((d) => d.toLowerCase().indexOf(query) > -1));
  };

  const handleCheckboxChange = (exercise: string) => {
    setSelectedExercises((prevSelectedExercises) => {
      if (prevSelectedExercises.includes(exercise)) {
        // Eliminamos el ejercicio si ya esta seleccionado
        return prevSelectedExercises.filter((selectedExercise) => selectedExercise !== exercise);
      } else {
        // Lo añadimos si no lo está
        return [...prevSelectedExercises, exercise];
      }
    });
  };

  const handleRemoveExercise = (exercise: string) => {
    setSelectedExercises((prevSelectedExercises) => {
      return prevSelectedExercises.filter((selectedExercise) => selectedExercise !== exercise);
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Creación de Rutina</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-text-center">
          <IonItem>
            <IonInput
              type="text"
              //value={}
              //onIonChange={(e) => setUser({ ...user, username: e.detail.value! })}
              label="Nombre de la rutina"
              labelPlacement="floating"
              placeholder="Nombre de la rutina"
              style={{ width: '100%' }}
            ></IonInput>
          </IonItem>

          <IonButton id="open-modal" >
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
                <IonCard key={exercise}>
                  <IonCardHeader>
                    <IonCardTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                      <div onClick={handleExerciseDetail}>
                        {exercise}
                      </div>
                      <IonCheckbox
                        checked={true}
                        onIonChange={() => handleRemoveExercise(exercise)}
                      />
                    </IonCardTitle>
                    <IonCardSubtitle>
                      <div>Nivel Avanzado</div>
                      <div>Ganar Masa Muscular</div>
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Espalda Inferior, Espalda Superior, Biceps</IonCardContent>
                </IonCard>
              ))}
            </IonList>
          }

          <IonButton color="success">
            Crear Rutina
          </IonButton>

          <IonModal ref={modal} trigger="open-modal" presentingElement={presentingElement!}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>
                  <IonSegment color={'primary'} value="all">
                    <IonSegmentButton value="all">
                      <IonLabel>Sugeridos</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="favorites">
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

              <IonIcon id='create-exercise' icon={addCircleOutline} size='large' />

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
                  <IonCard key={result}>
                    <IonCardHeader>
                      <IonCardTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div onClick={handleExerciseDetail}>
                        {result}
                      </div>
                        <IonCheckbox
                          checked={selectedExercises.includes(result)}
                          onIonChange={() => handleCheckboxChange(result)}
                        />
                      </IonCardTitle>
                      <IonCardSubtitle>
                        <div>Nivel Avanzado</div>
                        <div>Ganar Masa Muscular</div>
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>Espalda Inferior, Espalda Superior, Biceps</IonCardContent>
                  </IonCard>
                ))}
              </IonList>
            </IonContent>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateRoutine;
