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
    nextB: "start",
    statsA: { curiosity: 1 },
    statsB: { curiosity: 1 }
  },

  foyer: {
    id: "foyer",
    title: "THE FOYER",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/foyer.png",
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
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/parchment.png",
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
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/shakeevent.png",
    pages: [
      "confidently, you speak your answer out loud.",
      " as you do, the room begins to shake."
    ],
    choiceA: "RUN",
    choiceB: "HIDE",
    nextA: "basement",
    nextB: "dead",
    statsA: { courage: 2 }
  },

  wrong: {
    id: "wrong",
    title: "WRONG",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.png",
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
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/dead.png",
    pages: [
      "You run back to the door.",
      "The mansion laughs behind you."
    ],
    choiceA: "RESTART",
    choiceB: "RESTART",
    nextA: "start",
    nextB: "start"
  },

  basement: {
    id: "basement",
    title: "SAFE DOWN HERE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/basement.png",
    pages: [
      "You run down the set of stairs that you notice in the corner. You end up in a dirty, cluttered basement.",
      "When you get there, you're greeted by the fabled Sunnie Jae.",
    ],
    choiceA: "SAY HI",
    choiceB: "STARE SILENTLY",
    nextA: "sunnie1",
    nextB: "sunnie1",
    statsA: {charisma: 1 },
    statsB: { charisma: -1 }
  },

 sunnie1: {
    id: "sunnie1",
    title: "SUNNIE JAE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunnie1.png",
    pages: [
      "`I have a gift for you!",
      "But you must answer a riddle before I'll give it to you.",
    ],
    choiceA: "SAY: OKAY",
    choiceB: "SAY: NO THANKS",
    nextA: "sunniesriddle",
    nextB: "dead",
    statsA: {courage : 1, curiousity: 1 },
    statsB: {charisma : -1 }
  },

 sunniesriddle: {
    id: "sunniesriddle",
    title: "sunniesriddle PARCHMENT",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunnie2.png",
    pages: [
      "The more of this there is, the less of it you see.<br>What am I?"
    ],
    input: {
      answers: ["darkness, the dark, dark"],
      success: "sunniesgift",
      failure: "wrong"
    }
  },

    sunniesgift: {
    id: "sunniesgift",
    title: "sunniesgift",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunniesgift.png",
    pages: [
      "Wow, you actually got it right.",
      "Here's your gift.",
      "Yup! I's a key. Good luckinf with finding which room it goes to!",
    ],
    choiceA: "SAY:THANKS",
    choiceB: "SAY: I DONT CARE",
    nextA: "twodoors1",
    nextB: "dead",
    statsA: {charisma: 1 },
    statsB: { curiosity: -1 }
  },

    twodoors1: {
    id: "twodoors1",
    title: "CHOOSE WISELY",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/twodoors.png",
    pages: [
      "Where do you want to go?",
    ],
    choiceA: "LEFT",
    choiceB: "RIGHT",
    nextA: "ending",
    nextB: "ending",
    statsA: {curiosity: 1 },
    statsB: { courage: 1 }
  },
  

  ending: {
    id: "ending",
    title: "ESCAPE",
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/ending.png",
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
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/ending.png",
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
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/ending.png",
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
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/ending.png",
    pages: [
      "Your charisma saved you.",
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
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/ending.png",
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
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/ending.png",
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
