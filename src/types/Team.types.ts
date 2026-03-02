export type TeamMember = {
  ref: string;
  name: string;
  number: number;
  moved: boolean;
};

export type Team = {
  name: string;
  defaultAlignment: string;
  colors: {
    primary: string;
    secondary: string;
  };
  starters: TeamMember[];
  bench: TeamMember[];
};
