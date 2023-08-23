import Exercise from "./Exercise";
import Result from "./Result";

export default interface Activity {
    id: number;
    note: string;
    exercise: {
      picture: string;
      id: number;
      name: string;
        level: string;
        focus: string;
    };
    workout: {
      id: number;
    };
    results: Result[];
  }