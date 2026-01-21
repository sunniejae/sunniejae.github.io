export const gameData = {
  start: {
    id: "start",
    title: "love bites back",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/luis1.png",
    pages: [
      "Welcome to love bites back...",
      "a placeholder for something that may never come",
      "just a fun lil rpg",
      "inspired by a webnovel"
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
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/instructions.png",
    pages: [
      "Use A to continue.",
      "Use B to go back.",
      "Solve riddles to escape."
    ],
    choiceA: "BACK",
    choiceB: "BACK",
    nextA: "start",
    nextB: "start",
    statsA: { curiosity: 1 },
    statsB: { curiosity: 1 }
  },

  foyer: {
    id: "foyer",
    title: "THE FOYER",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/foyer.png",
    pages: [
      "You stand in the foyer, the walls adorned with old, dusty paintings and cobwebs stretching from corner to corner.",
      "The room feels colder as you walk further from the door.",
      "On the floor, a rolled parchment rests alone. Read the parchment?"
    ],
    choiceA: "YES",
    choiceB: "NO",
    nextA: "parchment",
    nextB: "cowardsexit",
    statsA: { curiosity: 1 },
    statsB: { courage: -1 }
  },

  parchment: {
    id: "parchment",
    title: "DUSTY PARCHMENT",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/parchment.png",
    pages: [
      "I have cities, but no houses. I have forests, but no trees.<br>What am I?"
    ],
    input: {
      answers: ["map"],
      success: "shakeevent",
      failure: "wrong"
    }
  },

  shakeevent: {
    id: "shakeevent",
    title: "THE SHAKE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/shake.png",
    pages: [
      "The parchment trembles.",
      "A secret door opens. You step through..."
    ],
    choiceA: "CONTINUE",
    choiceB: "CONTINUE",
    nextA: "hallway",
    nextB: "hallway",
    statsA: { courage: 2 }
  },

  wrong: {
    id: "wrong",
    title: "WRONG",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/wrong.png",
    pages: [
      "That’s not right.",
      "Try again."
    ],
    choiceA: "TRY AGAIN",
    choiceB: "EXIT",
    nextA: "parchment",
    nextB: "cowardsexit",
    statsA: { courage: -1 },
    statsB: { courage: -2 }
  },

  cowardsexit: {
    id: "cowardsexit",
    title: "THE EXIT",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/exit.png",
    pages: [
      "You run back to the door.",
      "The mansion laughs behind you."
    ],
    choiceA: "RESTART",
    choiceB: "RESTART",
    nextA: "start",
    nextB: "start"
  },

  hallway: {
    id: "hallway",
    title: "THE HALLWAY",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/hallway.png",
    pages: [
      "You walk down the hallway.",
      "A portrait stares at you with empty eyes.",
      "There are two doors: left and right."
    ],
    choiceA: "LEFT",
    choiceB: "RIGHT",
    nextA: "leftdoor",
    nextB: "rightdoor",
    statsA: { curiosity: 1 },
    statsB: { kindness: 1 }
  },

  leftdoor: {
    id: "leftdoor",
    title: "LEFT DOOR",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/left.png",
    pages: [
      "The left door creaks open.",
      "A dark room awaits."
    ],
    choiceA: "CONTINUE",
    choiceB: "BACK",
    nextA: "riddle2",
    nextB: "hallway",
    statsA: { courage: 1 }
  },

  rightdoor: {
    id: "rightdoor",
    title: "RIGHT DOOR",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/right.png",
    pages: [
      "The right door opens into a bright room.",
      "A voice whispers..."
    ],
    choiceA: "CONTINUE",
    choiceB: "BACK",
    nextA: "riddle2",
    nextB: "hallway",
    statsA: { kindness: 1 }
  },

  riddle2: {
    id: "riddle2",
    title: "RIDDLE ROOM",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/riddle2.png",
    pages: [
      "I speak without a mouth and hear without ears. I have nobody, but I come alive with wind. What am I?"
    ],
    input: {
      answers: ["echo"],
      success: "ending",
      failure: "wrong2"
    }
  },

  wrong2: {
    id: "wrong2",
    title: "WRONG",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/wrong.png",
    pages: [
      "Not quite.",
      "Try again."
    ],
    choiceA: "TRY AGAIN",
    choiceB: "EXIT",
    nextA: "riddle2",
    nextB: "cowardsexit"
  },

  ending: {
    id: "ending",
    title: "ESCAPE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/ending.png",
    pages: [
      "You escaped the mansion.",
      "But the mansion never forgets..."
    ],
    choiceA: "CONTINUE",
    choiceB: "CONTINUE",
    nextA: "endingStats",
    nextB: "endingStats"
  },

  endingStats: {
    id: "endingStats",
    title: "CREDITS + STATS",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/ending.png",
    pages: [
      "Credits:",
      "Sunnie Jae • Game Design",
      "Luis G • Mansion",
      "Thanks for playing!"
    ],
    choiceA: "RESTART",
    choiceB: "RESTART",
    nextA: "start",
    nextB: "start"
  },

  braveEnding: {
    id: "braveEnding",
    title: "BRAVE ENDING",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/ending.png",
    pages: [
      "Your courage saved you.",
      "You escaped the mansion with your head held high.",
      "The mansion respects you."
    ],
    choiceA: "RESTART",
    choiceB: "RESTART",
    nextA: "start",
    nextB: "start"
  },

  kindEnding: {
    id: "kindEnding",
    title: "KIND ENDING",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/ending.png",
    pages: [
      "Your kindness saved you.",
      "You escaped the mansion with a warm heart.",
      "The mansion lets you go peacefully."
    ],
    choiceA: "RESTART",
    choiceB: "RESTART",
    nextA: "start",
    nextB: "start"
  },

  curiousEnding: {
    id: "curiousEnding",
    title: "CURIOUS ENDING",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/ending.png",
    pages: [
      "Your curiosity saved you.",
      "You found a hidden exit behind the bookshelf.",
      "The mansion can’t hide from you."
    ],
    choiceA: "RESTART",
    choiceB: "RESTART",
    nextA: "start",
    nextB: "start"
  },

  neutralEnding: {
    id: "neutralEnding",
    title: "NEUTRAL ENDING",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lbb/ending.png",
    pages: [
      "You escaped the mansion.",
      "But the mansion never forgets..."
    ],
    choiceA: "RESTART",
    choiceB: "RESTART",
    nextA: "start",
    nextB: "start"
  }
};
