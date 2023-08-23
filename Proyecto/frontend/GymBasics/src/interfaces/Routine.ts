import Activity from "./Activity";
import Exercise from "./Exercise";

export default interface Routine {
    id: number;
    name?: string;
    exercises?: Exercise[];
    workouts?: {
      id?: number;
      date?: string;
      time?: string;
      activities: Activity[];
    }[];
  }