// Estructura de equipos: objeto con name, defaultAlignment, colors, starters, bench
// Las posiciones se heredan de la alineación por defecto (alignments.js)

export const REAL_MADRID = {
  name: "Real Madrid",
  defaultAlignment: "four-three-three",
  colors: {
    primary: "#FFFFFF",
    secondary: "#0D419A",
  },
  starters: [
    { ref: "Courtois", name: "Courtois", number: 1, moved: false },
    { ref: "Carvajal", name: "Carvajal", number: 2, moved: false },
    { ref: "Militao", name: "Militao", number: 3, moved: false },
    { ref: "Alaba", name: "Alaba", number: 4, moved: false },
    { ref: "Fran-Garcia", name: "Fran Garcia", number: 20, moved: false },
    { ref: "Tchouameni", name: "Tchouameni", number: 18, moved: false },
    { ref: "Kross", name: "Kross", number: 8, moved: false },
    { ref: "Valverde", name: "Valverde", number: 15, moved: false },
    { ref: "Belligham", name: "Belligham", number: 5, moved: false },
    { ref: "Vinicius-JR", name: "Vinicius JR", number: 7, moved: false },
    { ref: "Rodrygo", name: "Rodrygo", number: 11, moved: false },
  ],
  bench: [
    { ref: "Lunin", name: "Lunin", number: 13, moved: false },
    {
      ref: "Trent-Alexander-Arnold",
      name: "Trent Alexander Arnold",
      number: 2,
      moved: false,
    },
    { ref: "Arda-Gulleren", name: "Arda Gulleren", number: 15, moved: false },
  ],
};

export const VINOTINTO = {
  name: "Vinotinto",
  defaultAlignment: "four-three-three",
  colors: {
    primary: "#601025",
    secondary: "#FFFFFF",
  },
  starters: [
    { ref: "Rafa-romo", name: "Rafa romo", number: 22, moved: false },
    {
      ref: "Alexander-Gonzalez",
      name: "Alexander Gonzalez",
      number: 4,
      moved: false,
    },
    { ref: "Osorio", name: "Mejia", number: 3, moved: false },
    { ref: "Ferraresi", name: "Ferraresi", number: 4, moved: false },
    { ref: "navarro", name: "Makoun", number: 20, moved: false },
    { ref: "brujo-martinez", name: "Casseres", number: 13, moved: false },
    { ref: "herrera", name: "Y. Herrera", number: 6, moved: false },
    { ref: "segovia", name: "Segovia", number: 15, moved: false },
    { ref: "soteldo", name: "Soteldo", number: 7, moved: false },
    { ref: "savarino", name: "Bello", number: 10, moved: false },
    { ref: "rondon", name: "S. Rondon", number: 23, moved: false },
  ],
  bench: [],
};

// Lista de equipos: clave → objeto del equipo
export const TEAMS = {
  real_madrid: REAL_MADRID,
  vinotinto: VINOTINTO,
};
