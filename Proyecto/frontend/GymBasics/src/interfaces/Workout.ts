import Activity from "./Activity";

export default interface Workout {
    id?: number;
    date?: string;
    time?: string;
    routine: {
        id: number;
      };
    activities: Activity[];
  }