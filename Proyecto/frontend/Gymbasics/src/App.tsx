import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { barbellOutline, ellipse, homeOutline, personOutline, square, triangle } from 'ionicons/icons';

//Pages
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import CustomerEdit from './pages/extra/CustomerEdit';
import Tab4 from './pages/extra/Tab4';
import CreateRoutine from './pages/CreateRoutine';
import ExerciseDetail from './pages/ExerciseDetail';
import CreateExercise from './pages/CreateExercise';
import TrainingDetail from './pages/TrainingDetail';
import EditRoutine from './pages/EditRoutine';
//Security
import NotAuthorized from './pages/security/NotAuthorized';


//Forms
import RegisterForm from './forms/RegisterForm';
import LoginForm from './forms/LoginForm';
import EditPassword from './forms/EditPassword';
import EditProfile from './forms/EditProfile';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './pages/security/PrivateRoute';


setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <IonTabs>
            <IonRouterOutlet>
              {/**************** Rutas protegidas ****************/}
              
              <PrivateRoute path="/tab2" component={Tab2} />
              <PrivateRoute path="/tab3" component={Tab3} />
              <PrivateRoute path="/tab4" component={Tab4} />
              <PrivateRoute path="/CreateRoutine" component={CreateRoutine} />
              <PrivateRoute path="/ExerciseDetail/:exerciseId" component={ExerciseDetail} />
              <PrivateRoute path="/CreateExercise" component={CreateExercise} />
              <PrivateRoute path="/TrainingDetail/:workoutId" component={TrainingDetail} />
              <PrivateRoute path="/EditRoutine/:routineId" component={EditRoutine} />
              <PrivateRoute path="/EditProfile" component={EditProfile} />
              <PrivateRoute path="/EditPassword" component={EditPassword} />



              {/**************** Rutas públicas ****************/}
              <Route path="/tab1" component={Tab1} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/NotAuthorized" component={NotAuthorized} />
              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon aria-hidden="true" icon={homeOutline} />
                <IonLabel>Inicio</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon aria-hidden="true" icon={barbellOutline} />
                <IonLabel>Entrenamientos</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon aria-hidden="true" icon={personOutline} />
                <IonLabel>Perfil</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;