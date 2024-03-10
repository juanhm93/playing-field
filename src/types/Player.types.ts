
export type Player = {
    ref: string;
    name: string;
    number: number;
    position: { x: number; y: number };
    moved: boolean;
};