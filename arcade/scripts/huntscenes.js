export const gameData = {

  /* ===============================
     START
  ================================ */
  
  start: {
    background: "/assets/favicon.png",
    pages: [
        "Welcome to the Ghost Hunt",
        "Survive 7 Days in a haunted house to win"
    ],
    choiceA: "START",
    choiceB: "INSTRUCTIONS",
    nextA: "DayOne",
    nextB: "Instructions",
    statsA: {courage: 1},
    statsB: {curiosity: 1}
  },

  DayOne: {
    background: "/assets/favicon.png",
    pages: [
        "Day One begins..."
    ],
     choiceA: "filler",
    choiceB: "filler",
    nextA: "filler",
    nextB: "filler",
    statsA: {courage: 1},
    statsB: {curiosity: 1}
  },

    Instructions: {
    background: "/assets/favicon.png",
    pages: [
        "How to Play..."
    ],
     choiceA: "filler",
    choiceB: "filler",
    nextA: "filler",
    nextB: "filler",
    statsA: {courage: 1},
    statsB: {curiosity: 1}
  },

    filler: {
    background: "/assets/favicon.png",
    pages: [
        "scenes will continue"
    ],
     choiceA: "filler",
    choiceB: "filler",
    nextA: "filler",
    nextB: "filler",
    statsA: {courage: 1},
    statsB: {curiosity: 1}
  },


}