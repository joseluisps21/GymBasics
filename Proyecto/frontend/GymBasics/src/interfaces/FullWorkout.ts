export default interface FullWorkout {
    workout: {
      date: string;
      time: string;
      routine: {
        id: number;
      };
    };
    activities: {
      note: string;
      exercise: {
        id: number;
      };
      results: {
        serie: number;
        attr1: string;
        attr2: string;
      }[];
    }[];
  }
  