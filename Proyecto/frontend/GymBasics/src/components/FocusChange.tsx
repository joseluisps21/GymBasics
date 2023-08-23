import { IonIcon } from "@ionic/react";
import { bicycleOutline, barbellOutline, extensionPuzzleOutline } from "ionicons/icons";

export const getIconBasedOnFocus = (focus: string | undefined) => {
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