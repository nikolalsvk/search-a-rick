export interface Character {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  origin: Origin;
  status: "Alive" | "Dead" | "unknown";
}

interface Origin {
  name: string;
}
