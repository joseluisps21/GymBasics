import ActivityResponse from "./ActivityResponse";

export default interface WorkoutResponse{
    id: number;
    date: string;
    time: string;
    activities: ActivityResponse[];
}