import Exercise from "./Exercise";
import Result from "./Result";

export default interface ActivityResponse {
    id: number;
    note: string;
    results: Result[];
    exercise: {
      picture: string;
        id: number;
        name: string;
          level: string;
          focus: string;
      };
  }