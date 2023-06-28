import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonItemGroup, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { add, pencil,close, checkbox } from 'ionicons/icons'
import ExploreContainer from '../../components/ExploreContainer';
import { useEffect, useState } from 'react';
import { removeCustomer, saveCustomer, searchCustomerById, searchCustomers } from './customerApi';
import Customer from './Customer';


const CustomerEdit: React.FC = () => {

    //con el useParams obtenemos cosas de la url

  const { name } = useParams<{ name: string; }>();
  
  const [customer, setCustomer] = useState<Customer>({});
  const history = useHistory();
  
  const routeMatch: any = useRouteMatch("/tab4/:id");
  let id = routeMatch?.params?.id;

  //cada vez que se modifique search se va a ejecutar(? creo que si. si, gracias al history.location.pathname
  useEffect(() => {
    search();
  },[history.location.pathname]);


  const search = async() => {

    if(id== 'new'){
    setCustomer({});
    }else{
      let result = await searchCustomerById(id);
      setCustomer(result);
    }
    // let result = searchCustomers();
    // setClientes(result);
  }

  const save = async () => {
    await saveCustomer(customer)
    history.push('/tab4');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
            çfdsgvdsgdsg        

          </IonToolbar>
        </IonHeader>
        




      <IonContent>
        <IonCard>
          <IonTitle> {id== 'new' ? 'Agregar cliente': 'Editar Cliente'}</IonTitle>

        <IonRow>
            <IonCol>
            <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput onIonChange={e => customer.firstname = String(e.detail.value)} 
            value={customer.firstname}> </IonInput>
          </IonItem>
            </IonCol>
        </IonRow>

        <IonRow>
            <IonCol>
            <IonItem>
            <IonLabel position="stacked">Apellidos</IonLabel>
            <IonInput onIonChange={e => customer.lastname = String(e.detail.value)} 
            value={customer.lastname}> </IonInput>
          </IonItem>
            </IonCol>
        </IonRow>

        <IonRow>
            <IonCol>
            <IonItem>
            <IonLabel position="stacked">Telefono</IonLabel>
            <IonInput onIonChange={e => customer.phone = String(e.detail.value)} 
            value={customer.phone}> </IonInput>
          </IonItem>
            </IonCol>
        </IonRow>

        <IonRow>
            <IonCol>
            <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput onIonChange={e => customer.email = String(e.detail.value)} 
            value={customer.email}> </IonInput>
          </IonItem>
            </IonCol>
        </IonRow>

        <IonRow>
            <IonCol>
            <IonItem>
            <IonLabel position="stacked">Direccion</IonLabel>
            <IonInput onIonChange={e => customer.address = String(e.detail.value)} 
            value={customer.address}> </IonInput>
          </IonItem>
            </IonCol>
        </IonRow>
        
        


          <IonItem>
            <IonButton onClick={save} color = "success" fill="solid" slot="end" size="default">
              <IonIcon icon={checkbox} />
              Guardar Cliente
              </IonButton>
          </IonItem>


    
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerEdit;