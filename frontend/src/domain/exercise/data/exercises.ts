export interface Exercise {
  id: string;
  name: string;
  image: string;
  type: "reps" | "time";
}

export const exercises: Exercise[] = [
  {
    id: "pushups",
    name: "Flexiones",
    image: "https://source.unsplash.com/300x200/?pushups",
    type: "reps",
  },
  {
    id: "pullups",
    name: "Dominadas",
    image: "https://source.unsplash.com/300x200/?pullups",
    type: "reps",
  },
  {
    id: "squats",
    name: "Sentadillas",
    image: "https://source.unsplash.com/300x200/?squats",
    type: "reps",
  },
  {
    id: "running",
    name: "6 KM",
    image: "https://source.unsplash.com/300x200/?running",
    type: "time",
  },
  {
    id: "plank",
    name: "Plancha",
    image: "https://source.unsplash.com/300x200/?plank",
    type: "time",
  },
];
