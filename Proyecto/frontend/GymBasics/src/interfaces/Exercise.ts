import Muscle from "./Muscle";

export default interface Exercise {
  id?: number;
  name: string;
  level?: string;
  focus?: string;
  picture: string;
  muscles?: Muscle[];
  }
  