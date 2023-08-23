import { IonIcon } from "@ionic/react";
import { balloonOutline, rocketOutline, flashOutline } from "ionicons/icons";

export const getIconBasedOnLevel = (level: string | undefined) => {
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