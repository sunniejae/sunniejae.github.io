export const gameData = {
  start: {
    id: "start",
    title: "LUIS G'S MANSION",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/luis1.png",
    pages: [
      "Welcome to Luis G's Mansion...",
      "A relic of an office incentive competition.",
      "Solve the riddles to escape.",
      "Enter if you dare. Survive if you can."
    ],
    choiceA: "START",
    choiceB: "INSTRUCTIONS",
    nextA: "foyer",
    nextB: "instructions",
    statsA: { courage: 1 },
    statsB: { curiosity: 1 }
  },

  instructions: {
    id: "instructions",
    title: "INSTRUCTIONS",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/instructions.png",
    pages: [
      "Use A to continue.",
      "Use B to go back.",
      "Solve riddles to escape."
    ],
    choiceA: "BACK",
    choiceB: "BACK",
    nextA: "start",
    nextB: "start"
  },

  foyer: {
    id: "foyer",
    title: "THE FOYER",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/foyer.png",
    pages: [
      "You stand in the foyer, the walls adorned with dusty paintings.",
      "A rolled parchment lies on the floor."
    ],
    choiceA: "READ IT",
    choiceB: "LEAVE",
    nextA: "parchment",
    nextB: "cowardsexit",
    statsA: { curiosity: 1 },
    statsB: { courage: -1 }
  },

  parchment: {
    id: "parchment",
    title: "DUSTY PARCHMENT",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/parchment.png",
    pages: [
      "I have cities, but no houses. I have forests, but no trees.<br>What am I?"
    ],
    input: {
      answers: ["map"],
      success: "shakeevent",
      failure: "wrongParchment"
    }
  },

  wrongParchment: {
    id: "wrongParchment",
    title: "WRONG",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.png",
    pages: ["That answer fades into dust."],
    choiceA: "TRY AGAIN",
    choiceB: "RUN",
    nextA: "parchment",
    nextB: "cowardsexit"
  },

  shakeevent: {
    id: "shakeevent",
    title: "THE SHAKE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/shakeevent.png",
    pages: [
      "The mansion trembles.",
      "A staircase opens beneath you."
    ],
    choiceA: "RUN DOWN",
    choiceB: "FREEZE",
    nextA: "basement",
    nextB: "dead",
    statsA: { courage: 2 }
  },

  basement: {
    id: "basement",
    title: "THE BASEMENT",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/basement.png",
    pages: [
      "A cluttered basement.",
      "A figure steps forward. It's Sunnie Jae."
    ],
    choiceA: "SAY HI",
    choiceB: "STARE",
    nextA: "sunnie1",
    nextB: "sunnie1",
    statsA: { charisma: 1 },
    statsB: { charisma: -1 }
  },

  sunnie1: {
    id: "sunnie1",
    title: "SUNNIE JAE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunnie1.png",
    pages: [
      "`I have a gift for you...`",
      "`If you answer my riddle.`"
    ],
    choiceA: "OKAY",
    choiceB: "NO THANKS",
    nextA: "sunniesriddle",
    nextB: "dead"
  },

  sunniesriddle: {
    id: "sunniesriddle",
    title: "SUNNIE'S RIDDLE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunnie2.png",
    pages: [
      "The more of this there is, the less you see.<br>What is it?"
    ],
    input: {
      answers: ["darkness"],
      success: "sunniesgift",
      failure: "wrongSunnie"
    }
  },

  wrongSunnie: {
    id: "wrongSunnie",
    title: "NOT QUITE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.png",
    pages: ["Sunnie tilts her head."],
    choiceA: "TRY AGAIN",
    choiceB: "LEAVE",
    nextA: "sunniesriddle",
    nextB: "dead"
  },

  sunniesgift: {
    id: "sunniesgift",
    title: "SUNNIE'S GIFT",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunniesgift.png",
    pages: [
      "She hands you a key.",
      "`Kindness travels far here.`"
    ],
    choiceA: "THANK HER",
    choiceB: "SAY NOTHING",
    nextA: "twodoors1",
    nextB: "twodoors1",
    statsA: { charisma: 1, hasKey: 1 },
    statsB: { hasKey: 1 }
  },

  twodoors1: {
    id: "twodoors1",
    title: "TWO DOORS",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/twodoors.png",
    pages: ["Two doors stand before you."],
    choiceA: "LEFT",
    choiceB: "RIGHT",
    nextA: "gracieRoom",
    nextB: "library"
  },

  gracieRoom: {
    id: "gracieRoom",
    title: "GRACIE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/gracie.png",
    pages: [
      "Gracie blocks the path.",
      "`Prove your courage.`"
    ],
    choiceA: "ANSWER",
    choiceB: "RETREAT",
    nextA: "gracieRiddle",
    nextB: "neutralEnding"
  },

  gracieRiddle: {
    id: "gracieRiddle",
    title: "GRACIE'S RIDDLE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/gracieRiddle.png",
    pages: [
      "I speak without a mouth and hear without ears. What am I?"
    ],
    input: {
      answers: ["echo"],
      success: "braveEnding",
      failure: "dead"
    }
  },

  library: {
    id: "library",
    title: "THE LIBRARY",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/library.png",
    pages: [
      "A towering library.",
      "One book sticks out."
    ],
    choiceA: "PULL BOOK",
    choiceB: "LEAVE",
    nextA: "libraryPuzzle",
    nextB: "neutralEnding"
  },

  libraryPuzzle: {
    id: "libraryPuzzle",
    title: "BOOK PUZZLE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/libraryPuzzle.png",
    pages: ["Unscramble: OETRP"],
    input: {
      answers: ["rope"],
      success: "curiousEnding",
      failure: "dead"
    }
  },

  braveEnding: {
    id: "braveEnding",
    title: "BRAVE ENDING",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/ending.png",
    pages: [
      "Your courage carried you through.",
      "The mansion bows."
    ],
    choiceA: "RESTART",
    choiceB: "RESTART",
    nextA: "start",
    nextB: "start"
  },

  curiousEnding: {
    id: "curiousEnding",
    title: "CURIOUS ENDING",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/ending.png",
    pages: [
      "You outsmarted the mansion.",
      "It had nowhere left to hide."
    ],
    choiceA: "RESTART",
    choiceB: "RESTART",
    nextA: "start",
    nextB: "start"
  },

  neutralEnding: {
    id: "neutralEnding",
    title: "ESCAPE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/ending.png",
    pages: [
      "You escaped.",
      "The mansion watches silently."
    ],
    choiceA: "RESTART",
    choiceB: "RESTART",
    nextA: "start",
    nextB: "start"
  },

  cowardsexit: {
    id: "cowardsexit",
    title: "THE EXIT",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/dead.png",
    pages: [
      "You flee.",
      "The mansion laughs."
    ],
    choiceA: "RESTART",
    choiceB: "RESTART",
    nextA: "start",
    nextB: "start"
  },

  dead: {
    id: "dead",
    title: "DEAD",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/dead.png",
    pages: [
      "The mansion claims another soul."
    ],
    choiceA: "RESTART",
    choiceB: "RESTART",
    nextA: "start",
    nextB: "start"
  }
};
