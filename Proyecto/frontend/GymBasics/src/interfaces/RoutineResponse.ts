import Exercise from "./Exercise";
import Workout from "./Workout";
import WorkoutResponse from "./WorkoutResponse";

export default interface RoutineResponse {

    id: number;
    name: string;
    exercises: Exercise[];
    workouts: WorkoutResponse[];

}