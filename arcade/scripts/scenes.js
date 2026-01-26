export const gameData = {

  /* ===============================
     START
  ================================ */
  start: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/luis.webp",
    pages: [
      "Welcome to <strong> Luis G's Mansion </strong>",
      "An ancient relic of an office competition past.",
      "Follow the prompts using the <strong>A</strong> and <strong>B</strong> buttons to make important decisions.",
      "Solve the riddles of the mansion and face challenges from familiar faces.",
      "Only the smartest escape.<br><br><strong>Are you ready?</strong>"
    ],
    choiceA: "Let's-a-go!",
    nextA: "foyer",
    choiceB: "Instructions",
    nextB: "instructions",
    statsA: { courage: 1},
    statsB: {curiosity: 1}
  },

  instructions: {
  background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/idle.webp",
pages: [
  "How to Play: <br> Use the <strong> A </strong> and <strong> B </strong> buttons to make key decisions through the story. <br> Answer the riddles to clear the encounters by entering your answer in the submission text box. <br> Build your <strong> Courage, Curiosity, </strong> and <strong> Charisma </strong> to determine your fate."
],
choiceA: "back to start",
nextA: "start",
choiceB: "enter the mansion",
nextB: "foyer",
statsA: { courage: -1},
statsB: { courage: 1}
  },
  
  foyer: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/foyer.webp",
    pages: [
      "The door creaks open easily, as though it has been waiting for you.",
      "You stand in the foyer. Dusty paintings line the walls.",
      "A parchment rests alone on the floor.<br><br><strong>Read it?</strong>"
    ],
    choiceA: "YES",
    choiceB: "GO BACK",
    nextA: "parchment",
    nextB: "start",
    statsA: { courage: 1},
    statsB: { courage: -1}
  },

  parchment: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/parchment.webp",
    pages: [
      "I have cities, but no houses.<br>I have forests, but no trees.<br>I have rivers, but no water. <br> <strong> What am I? </strong>"
    ],
    input: {
      answers: ["map"],
    success: "shakeevent",
    failure: "wrongparchment"
  },
  statsSuccess: { curiosity: 1 },
  statsFailure: { curiosity: -1 }
},


  shakeevent: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/shakeevent.webp",
    pages: [
      "You speak the answer aloud.",
      "The mansion begins to shake.",
      "<strong> DECISION POINT </strong>"
    ],
    choiceA: "RUN!",
    choiceB: "HIDE!",
    statsA: { courage: 1 },
    statsB: { courage: -1 },
    nextA: "basement",
    nextB: "dead"
  },

  basement: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/basement.webp",
    pages: [
      "You race down the stairs into a cluttered basement.",
      "A figure waits for you.",
      "The fabled Sunnie Jae.",
      "<strong> DECISION POINT </strong>"
    ],
    choiceA: "SAY HI",
    choiceB: "HOLD STILL",
    statsA: { charisma: 1 },
    statsB: { charisma: -1 },
    nextA: "sunnie1",
    nextB: "sunnie1"
  },

  sunnie1: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunnie.webp",
    pages: [
      "I have a gift for you.",
      "But first—answer my riddle.",
      "<strong> DECISION POINT </strong>"
    ],
    choiceA: "OKAY",
    choiceB: "NO THANKS",
    nextA: "sunniesriddle",
    nextB: "dead",
    statsA: { charisma: 1 },
    statsB: { charisma: -1 }
  },

  sunniesriddle: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunnie.webp",
    pages: [
      "The more of this there is, the less you see. <br> <strong> What am I? </strong>"
    ],
    input: {
      answers: ["darkness"],
      success: "sunnie3",
      failure: "wrongsunnie"
    },
    statsSuccess: { curiosity: 1 },
    statsFailure: { curiosity: -1 }
  },

  sunnie3: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunniesgift.webp",
    pages: [
      "Wow. You actually got it right.",
      "Here’s your gift.",
      "It's another key.",
      "Good luck figuring out where it goes.",
      "<strong> DECISION POINT </strong>"
    ],
    choiceA: "THANKS",
    choiceB: "I DON'T CARE",
    statsA: { charisma: 1 },
    statsB: { charisma: -1},
    nextA: "sunnie4",
    nextB: "dead"
  },

  sunnie4: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/doors.webp",
    pages: ["<strong> DECISION POINT </strong>"],
    choiceA: "Door One",
    choiceB: "Door Two",
    statsA: { curiosity: 1},
    statsB: { courage: 1},
    nextA: "grandroom",
    nextB: "dead"
  },

  grandroom: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/grandroom.webp",
    pages: ["The key works.", "You step into a vast, dusty room.", "<strong> DECISION POINT </strong>"],
    choiceA: "Enter",
    choiceB: "Turn Around",
    statsA: { courage: 1},
    statsB: { courage: -1},
    nextA: "grandroom2",
    nextB: "sunnie4"
  },

  grandroom2: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/gracie.webp",
    pages: ["You hear breathing behind you.", "A haunted fairy appears.", "<strong> DECISION POINT </strong>"
],
    choiceA: "HELLO?",
    choiceB: "EW!",
    statsA: { charisma: 1 },
    statsB: { charisma: -1 },
    nextA: "gracie",
    nextB: "dead2"
  },

  gracie: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/gracie.webp",
    pages: ["I'm Scary Fairy Gracie.", "The bags under my eyes are designer.", "<strong> DECISION POINT </strong>"
],
    choiceA: "OKAY",
    choiceB: "NOT AGAIN",
    statsA: { charisma: 1 },
    statsB: { charisma: -1 },
    nextA: "graciesriddle",
    nextB: "dead2"
  },

  graciesriddle: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/gracie.webp",
    pages: ["I am not alive, but I grow. <br> <strong> What am I? </strong>"],
    input: {
      answers: ["fire"],
      success: "graciesuccess"
    },
    statsSuccess: { curiosity: 1 },
    statsFailure: {curiosity: -1 }
  },

  graciesuccess: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/gracie.webp",
 pages: ["I'm proud of you. Go ahead and leave using this convenient secret passageway to the library.", "<strong> DECISION POINT </strong>"],
 choiceA: "WHAT ABOUT AN EXIT",
 choiceB: "SEE YOU LATER THEN",
 statsA: { charisma: -1},
 statsB: { charisma: 1},
 nextA: "dead2",
 nextB: "library"
  },

  library: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/library.webp",
    pages: ["Welcome to the library.", "Be quiet.", "What do you do?"],
    choiceA: "*SNEEZE*",
    choiceB: "HOLD STILL",
    statsA: { charisma: -1 },
    statsB: { charisma: 1 },
    nextA: "kelsea2",
    nextB: "kelsea2"
  },

  kelsea2: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/kelsea.webp",
    pages: ["Who interrupts my self care time???", "Oh. It's you.", "I was finishing my 1000th book of 2025, so you better have something good to say.", "<strong> DECISION POINT </strong>"
          ],
    choiceA: "WHAT ARE YOU READING?",
    choiceB: "I DON'T WANT TO BE HERE",
    statsA: { charisma: 1 },
    statsB: { charisma: -1 },
    nextA: "kelsea3",
    nextB: "dead3"
  },

  kelsea3: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/kelsea.webp",
    pages: ["I'm so glad you asked!", "It's a book of riddles.", "Wanna try one?", "<strong> DECISION POINT </strong>"],
    choiceA: "NO THANKS, I'M GOOD",
    choiceB: "I'D LOVE TO.",
    statsA: { charisma: -1 },
    statsB: { charisma: 1 },
    nextA: "dead3",
    nextB: "kelseasriddle" 
  },

  kelseasriddle: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/kelsea.webp",
    pages: ["What weighs nothing, but can make the strongest person fall?"],
    input: {
      answers: ["ego"],
      success: "leavelibrary",
      failure: "wrongkelsea"
    },
    statsSuccess: { curiosity: 1 },
    statsFailure: { curiosity: -1 }
  },

  leavelibrary: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/doors2.webp",
    pages: ["Two doors await you.", "Which do you enter? <br><strong> DECISION POINT </strong>"],
    choiceA: "LEFT",
    choiceB: "RIGHT",
    statsA: { charisma: 1 },
    statsB: { courage: 1 },
    nextA: "jesse",
    nextB: "brenda"
  },

  jesse: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/bathroom.webp",
    pages: ["You step into what appears to be the bathroom.", "The lights flicker.<br><br>Someone clears their throat behind you.", "<strong> DECISION POINT </strong>"],
    choiceA: "Uh—sorry!",
    choiceB: "EW.",
    statsA: { charisma: 1 },
    statsB: { courage: -1 },
    nextA: "jesse2",
    nextB: "dead4"
  },

  jesse2: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/jesse.webp",
    pages: ["Ope! Guess someone *was* in here.", "It's me.<br>The man. The myth. The Wizard Jesse.", "<strong> DECISION POINT </strong>"],
    choiceA: "HELLO",
    choiceB: "UGH",
    statsA: { charisma: 1 },
    statsB: { courage: -1 },
    nextA: "jesse3",
    nextB: "dead4"
  },

  jesse3: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/jesse.webp",
    pages: ["I can get you out of this place.", "But only if you solve my final riddle.", "<strong> DECISION POINT </strong>"],
    choiceA: "YES PLEASE",
    choiceB: "NO WAY",
    statsA: { courage: 1 },
    nextA: "jessesriddle",
    nextB: "dead4"
  },

  jessesriddle: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/jesse.webp",
    pages: ["I can be long or short.", "I can be grown or bought.", "I can be painted or left bare.", "I can be round or square. <br> <strong> What am I? </strong>"],
    input: {
      answers: ["hair"],
      success: "jesse5",
      failure: "wrongjesse"
    },
    statsSuccess: { curiosity: 1 },
    statsFailure: { courage: -1 }
  },

  jesse5: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/jesse.webp",
    pages: ["Correct.", "You've got a good head on your shoulders."],
    choiceA: "LEAVE BATHROOM",
    statsA: { courage: 1 },
    nextA: "statEnding"
  },

  brenda: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/pianoroom.webp",
    pages: ["You enter a grand piano room.", "What do you do?", "A ghostly melody drifts through the air.", "<strong> DECISION POINT </strong>"],
    choiceA: "FOLLOW THE MUSIC",
    choiceB: "BACK AWAY",
    statsA: { curiosity: 1 },
    nextA: "brenda2",
    nextB: "leavelibrary"
  },

  brenda2: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/brenda.webp",
    pages: ["A translucent figure sits at the piano.", "She turns slowly.<br><br>'I was a princess once.'", "<strong> DECISION POINT </strong>"],
    choiceA: "LISTEN",
    choiceB: "RUN",
    statsA: { charisma: 1 },
    statsB: {courage: -1},
    nextA: "brenda3",
    nextB: "dead2"
  },

  brenda3: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/brenda.webp",
    pages: ["They called me Ghost Princess Brenda.", "Solve my riddle, and I'll bless your journey.", "<strong> DECISION POINT </strong>"],
    choiceA: "OKAY",
    choiceB: "NO",
    statsA: { courage: 1 },
    statsB: {courage: -1},
    nextA: "brendasriddle",
    nextB: "dead2"
  },

  brendasriddle: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/brenda.webp",
    pages: ["I speak without a mouth and hear without ears.", "I have no body, but I come alive with wind.<br> <strong>What am I?</strong>"],
    input: {
      answers: ["echo"],
      success: "brenda5",
      failure: "wrongbrenda"
    },
    statsSuccess: { charisma: 2 },
    statsFailure: { courage: -1 }
  },

  brenda5: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/brenda.webp",
    pages: ["Thank you for listening.", "Kindness is rarer than courage here.", "<strong> DECISION POINT </strong>"],
    choiceA: "LEAVE QUIETLY",
    choiceB: "SCREAM",
    statsA: { charisma: 1 },
    statsB: { charisma: -1 },
    nextA: "statEnding",
    nextB: "dead4"
  },

  /* ===============================
     DEAD / FAIL STATES
  ================================ */
  wrongparchment: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.webp",
    pages: [
      "Lol, wrong!"
    ],
    choiceA: "RESTART",
    nextA: "start",
    choiceB: "TRY AGAIN",
    nextB: "parchment"
  },

wrongsunnie: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.webp",
    pages: [
      "Lol, wrong!"
    ],
    choiceA: "RESTART",
    nextA: "start",
    choiceB: "TRY AGAIN",
    nextB: "sunniesriddle"
  },

  wronggracie: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.webp",
    pages: [
      "Lol, wrong!"
    ],
    choiceA: "RESTART",
    nextA: "start",
    choiceB: "TRY AGAIN",
    nextB: "graciesriddle"
  },

  wrongkelsea: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.webp",
    pages: [
      "Lol, wrong!"
    ],
    choiceA: "RESTART",
    nextA: "start",
    choiceB: "TRY AGAIN",
    nextB: "kelseasriddle"
  },

  wrongjesse: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.webp",
    pages: [
      "Lol, wrong!"
    ],
    choiceA: "RESTART",
    nextA: "start",
    choiceB: "TRY AGAIN",
    nextB: "jessesriddle"
  },

  wrongbrenda: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.webp",
    pages: [
      "Lol, wrong!"
    ],
    choiceA: "RESTART",
    nextA: "start",
    choiceB: "TRY AGAIN",
    nextB: "brendasriddle"
  },

  dead: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/dead.webp",
    pages: ["Oof.", "You didn’t make it."],
    choiceA: "START OVER",
    nextA: "start",
    choiceB: "LAST CHECKPOINT",
    nextB: "parchment",
    statsA: { curiosity: 1},
    statsB: { courage: 1}
  },

  dead2: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/dead.webp",
    pages: ["You were not careful.", "You’re dead."],
    choiceA: "START OVER",
    nextA: "start",
    choiceB: "LAST CHECKPOINT",
    nextB: "sunnie4",
    statsA: { curiosity: 1},
    statsB: { courage: 1}
  },

  dead3: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/dead.webp",
    pages: ["Wrong choice.", "Better luck next time."],
     choiceA: "START OVER",
    nextA: "start",
    choiceB: "LAST CHECKPOINT",
    nextB: "library",
    statsA: { curiosity: 1},
    statsB: { courage: 1}
  },

  dead4: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/dead.webp",
    pages: ["Oof.", "Whatever you said wasn't very polite.<br><br>You're dead now."],
     choiceA: "START OVER",
    nextA: "start",
    choiceB: "LAST CHECKPOINT",
    nextB: "leavelibrary",
    statsA: { curiosity: 1},
    statsB: { courage: 1}
  },

  
  /* ===============================
     ENDINGS
  ================================ */
  neutralEnding: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/luis.webp",
    pages: [
      "The house remains as quietly as you leave it, the weight of unanswered questions pressing down on your shoulders.",
      "Shadows linger in the corners of your vision, whispers echo in your ears, but nothing truly reaches out.",
      "Perhaps you survived, or perhaps you were simply unnoticed. The Luisg Mansion waits for the next curious soul."
    ],
    nextA: "start",
    choiceA: "Restart Adventure"
  },

  curiousEnding: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/luis.webp",
    pages: [
      "Your insatiable curiosity drives you deeper into the mansion’s hidden corners.",
      "You uncover secret rooms, arcane symbols, and remnants of past tragedies. Each revelation spins your mind, yet you press on.",
      "By the time you leave, you know too much to ever be the same. The mansion whispers your name, and you wonder if you’ll ever escape its gaze."
    ],
    nextA: "start",
    choiceA: "Restart Adventure"
  },

  kindEnding: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/luis.webp",
    pages: [
      "Wherever fear and sorrow lingered in the mansion, your presence offered a glimmer of comfort.",
      "The spirits pause, some even acknowledging your kindness. You soothe the restless and leave with your heart lighter than it arrived.",
      "Though the mansion remains haunted, your compassion echoes long after you step outside."
    ],
    nextA: "start",
    choiceA: "Restart Adventure"
  },

  braveEnding: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/luis.webp",
    pages: [
      "Fear does not stop you, and the mansion takes note. You stride boldly through haunted halls, confronting specters and curses alike.",
      "The darkness recoils before your courage, revealing truths others might never see.",
      "By night’s end, you have faced the mansion head-on, and though scars remain, you exit changed forever."
    ],
    nextA: "start",
    choiceA: "Restart Adventure"
  }

};
