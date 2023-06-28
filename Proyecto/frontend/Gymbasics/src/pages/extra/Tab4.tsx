import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import Customer from './Customer';
import { useHistory, useParams } from 'react-router';
import { add, pencil,close } from 'ionicons/icons'
import { removeCustomer, searchCustomers } from './customerApi';

const Tab4: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [clientes, setClientes] = useState<Customer[]>([]);
  const history = useHistory();

  //cada vez que se modifique search se va a ejecutar(? creo que si

  
  useEffect (() => {
    search();
  },[history.location.pathname]);

  const search = async () => {
  const result = await searchCustomers();
    setClientes(result);
  }

  const remove = async (id:string) => {
    await removeCustomer(id);
    //al poner await se espera a que se ejecute la funcion remove para buscar despues, sino se ejecutan a la vez y no se ve el cambio
    search();
  }

  const addCustomer = () => {
    history.push('/tab4/new');

  }

  const editCustomer = (id: string) => {
    history.push('/tab4/' + id);
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 4</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 4</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonTitle>Gestión de clientes</IonTitle>

          <IonItem>
             <IonButton onClick={addCustomer}  color = "primary" fill="solid" slot="end" size="default"> 
              <IonIcon icon={add} />
              Agregar Cliente
              </IonButton>
          </IonItem>


    <IonGrid className='table'>
      <IonRow>
        <IonCol>Nombre</IonCol>
        <IonCol>Email</IonCol>
        <IonCol>Telefono</IonCol>
        <IonCol>Direccion</IonCol>
        <IonCol>Acciones</IonCol>
      </IonRow>

      {clientes.map((cliente: Customer) => (
  <IonRow key={cliente.id}>
    <IonCol>{cliente.firstname} {cliente.lastname}</IonCol>
    <IonCol>{cliente.email}</IonCol>
    <IonCol>{cliente.phone}</IonCol>
    <IonCol>{cliente.address}</IonCol>
    <IonCol>
      <IonButton onClick={() => editCustomer(String(cliente.id))} fill="clear" color="primary">
        <IonIcon icon={pencil} slot="icon-only" />
      </IonButton>
      <IonButton onClick={()=> remove(String(cliente.id))} fill="clear" color="danger">
        <IonIcon icon={close} slot="icon-only" />
      </IonButton>
    </IonCol>
  </IonRow>
))}
      

      
    </IonGrid>
    </IonCard>


        
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
