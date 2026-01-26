export const gameData = {

  /* ===============================
     START
  ================================ */
  start: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/luis1.png",
    pages: [
      "Welcome to Luis G's Mansion",
      "An ancient relic of an office competition ages ago.",
      "Follow the prompts using the A and B buttons to make important decisions.",
      "Solve the riddles of the mansion and face challenges from familiar faces.",
      "Only the smartest escape.<br><br>Are you ready?"
    ],
    choiceA: "Let's-a-go!",
    nextA: "foyer"
  },

  foyer: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/foyer.png",
    pages: [
      "The door creaks open easily, as though it has been waiting for you.",
      "You stand in the foyer. Dusty paintings line the walls.",
      "A parchment rests alone on the floor.<br><br>Read it?"
    ],
    choiceA: "YES",
    choiceB: "GO BACK",
    nextA: "parchment",
    nextB: "start",
    statsA: { courage: 1},
    statsB: { courage: -1}
  },

  parchment: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/parchment.png",
    pages: [
      "I have cities, but no houses.<br>I have forests, but no trees.<br>I have rivers, but no water. <br> What am I?"
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
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/shakeevent.png",
    pages: [
      "You speak the answer aloud.",
      "The mansion begins to shake.",
      "How do you react?"
    ],
    choiceA: "RUN!",
    choiceB: "HIDE!",
    statsA: { courage: 1 },
    statsB: { courage: -1 },
    nextA: "basement",
    nextB: "dead"
  },

  basement: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/basement.png",
    pages: [
      "You race down the stairs into a cluttered basement.",
      "A figure waits for you.",
      "The fabled Sunnie Jae.",
      "What do you do?"
    ],
    choiceA: "SAY HI",
    choiceB: "HOLD STILL",
    statsA: { charisma: 1 },
    statsB: { charisma: -1 },
    nextA: "sunnie1",
    nextB: "sunnie1"
  },

  sunnie1: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunnie1.png",
    pages: [
      "I have a gift for you.",
      "But first—answer my riddle.",
      "How do you respond?"
    ],
    choiceA: "OKAY",
    choiceB: "NO THANKS",
    nextA: "sunniesriddle",
    nextB: "dead",
    statsA: { charisma: 1 },
    statsB: { charisma: -1 }
  },

  sunniesriddle: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunnie2.png",
    pages: [
      "The more of this there is, the less you see."
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
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunniesgift.png",
    pages: [
      "Wow. You actually got it right.",
      "Here’s your gift.",
      "It's another key.",
      "Good luck figuring out where it goes.",
      "How do you respond?"
    ],
    choiceA: "THANKS",
    choiceB: "I DON'T CARE",
    statsA: { charisma: 1 },
    statsB: { charisma: -1},
    nextA: "sunnie4",
    nextB: "dead"
  },

  sunnie4: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/threedoors.png",
    pages: ["Which door will you try?"],
    choiceA: "Door One",
    choiceB: "Door Two",
    statsA: { curiosity: 1},
    statsB: { courage: 1},
    nextA: "wrongroom",
    nextB: "dead"
  },

  grandroom: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/grandroom.png",
    pages: ["The key works.", "You step into a vast, dusty room."],
    choiceA: "Enter",
    choiceB: "Turn Around",
    statsA: { courage: 1},
    statsB: { courage: -1},
    nextA: "grandroom2",
    nextB: "sunnie4"
  },

  grandroom2: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/gracie1.png",
    pages: ["You hear breathing behind you.", "A haunted fairy appears.", 'What do you do?'],
    choiceA: "HELLO?",
    choiceB: "EW!",
    statsA: { charisma: 1 },
    statsB: { charisma: -1 },
    nextA: "gracie",
    nextB: "dead2"
  },

  gracie: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/gracie2.png",
    pages: ["I'm Scary Fairy Gracie.", "The bags under my eyes are designer.", "What do you say?"],
    choiceA: "OKAY",
    choiceB: "NOT AGAIN",
    statsA: { charisma: 1 },
    statsB: { charisma: -1 },
    nextA: "graciesriddle",
    nextB: "dead2"
  },

  graciesriddle: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/gracie2.png",
    pages: ["I am not alive, but I grow. <br> What am I?"],
    input: {
      answers: ["fire"],
      success: "library"
    },
    statsSuccess: { curiosity: 1 },
    statsFailure: {curiosity: -1 }
  },

  library: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/library.png",
    pages: ["Welcome to the library.", "Be quiet.", "What do you do?"],
    choiceA: "*SNEEZE*",
    choiceB: "HOLD STILL",
    statsA: { charisma: -1 },
    statsB: { charisma: 1 },
    nextA: "kelsea",
    nextB: "kelsea2"
  },

  kelsea2: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/kelsea1.png",
    pages: ["Who interrupts my self care time???", "Oh. It's you.", "I was finishing my 1000th book of 2025, so you better have something good to say.", "How do you respond?"
          ],
    choiceA: "WHAT ARE YOU READING?",
    choiceB: "I DON'T WANT TO BE HERE",
    statsA: { charisma: 1 },
    statsB: { charisma: -1 },
    nextA: "kelsea3",
    nextB: "dead3"
  },

  kelsea3: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/kelsea2.png",
    pages: ["I'm so glad you asked!", "It's a book of riddles.", "Wanna try one?", "How do you respond?"],
    choiceA: "NO THANKS, I'M GOOD",
    choiceB: "I'D LOVE TO.",
    statsA: { charisma: -1 },
    statsB: { charisma: 1 },
    nextA: "kelseasriddle",
    nextB: "dead3" 
  },

  kelseasriddle: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/kelsea2.png",
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
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/twodoors.png",
    pages: ["Two doors await you.", "Which do you enter?"],
    choiceA: "LEFT",
    choiceB: "RIGHT",
    statsA: { charisma: 1 },
    statsB: { courage: 1 },
    nextA: "jesse",
    nextB: "brenda"
  },

  jesse: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/bathroom.png",
    pages: ["You step into what appears to be the bathroom.", "The lights flicker.<br><br>Someone clears their throat behind you.", "How do you react?"],
    choiceA: "Uh—sorry!",
    choiceB: "EW.",
    statsA: { charisma: 1 },
    statsB: { courage: -1 },
    nextA: "jesse2",
    nextB: "dead4"
  },

  jesse2: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/jessie1.png",
    pages: ["Ope! Guess someone *was* in here.", "It's me.<br>The man. The myth. The Wizard Jesse.", "How do you respond?"],
    choiceA: "HELLO",
    choiceB: "UGH",
    statsA: { charisma: 1 },
    statsB: { courage: -1 },
    nextA: "jesse3",
    nextB: "dead4"
  },

  jesse3: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/jessie2.png",
    pages: ["I can get you out of this place.", "But only if you solve my final riddle.", "How do you respond?"],
    choiceA: "YES PLEASE",
    choiceB: "NO WAY",
    statsA: { courage: 1 },
    nextA: "jessesriddle",
    nextB: "dead4"
  },

  jessesriddle: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/jessie2.png",
    pages: ["I can be long or short.", "I can be grown or bought.", "I can be painted or left bare.", "I can be round or square."],
    input: {
      answers: ["hair"],
      success: "jesse5",
      failure: "wrongjesse"
    },
    statsSuccess: { curiosity: 1 },
    statsFailure: { courage: -1 }
  },

  jesse5: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/jessie2.png",
    pages: ["Correct.", "You've got a good head on your shoulders."],
    choiceA: "LEAVE BATHROOM",
    statsA: { courage: 1 },
    nextA: "ending"
  },

  brenda: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/pianoroom.png",
    pages: ["You enter a grand piano room.", "What do you do?", "A ghostly melody drifts through the air."],
    choiceA: "FOLLOW THE MUSIC",
    choiceB: "BACK AWAY",
    statsA: { curiosity: 1 },
    nextA: "brenda2",
    nextB: "leavelibrary"
  },

  brenda2: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/brenda1.png",
    pages: ["A translucent figure sits at the piano.", "She turns slowly.<br><br>'I was a princess once.'", "How do you react?"],
    choiceA: "LISTEN",
    choiceB: "RUN",
    statsA: { charisma: 1 },
    statsB: {courage: -1},
    nextA: "brenda3",
    nextB: "dead2"
  },

  brenda3: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/brenda2.png",
    pages: ["They called me Ghost Princess Brenda.", "Solve my riddle, and I'll bless your journey.", "How do you respond?"],
    choiceA: "OKAY",
    choiceB: "NO",
    statsA: { courage: 1 },
    statsB: {courage: -1},
    nextA: "brendasriddle",
    nextB: "dead2"
  },

  brendasriddle: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/brenda2.png",
    pages: ["I speak without a mouth and hear without ears.", "I have no body, but I come alive with wind."],
    input: {
      answers: ["echo"],
      success: "brenda5",
      failure: "wrongbrenda"
    },
    statsSuccess: { charisma: 2 },
    statsFailure: { courage: -1 }
  },

  brenda5: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/brenda2.png",
    pages: ["Thank you for listening.", "Kindness is rarer than courage here.", "What do you do next?"],
    choiceA: "LEAVE QUIETLY",
    choiceB: "SCREAM",
    statsA: { charisma: 1 },
    statsB: { charisma: -1 },
    nextA: "ending"
  },

  /* ===============================
     DEAD / FAIL STATES
  ================================ */
  wrongparchment: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.png",
    pages: [
      "Lol, wrong!"
    ],
    choiceA: "RESTART",
    nextA: "start",
    choiceB: "TRY AGAIN",
    nextB: "parchment"
  },

wrongsunnie: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.png",
    pages: [
      "Lol, wrong!"
    ],
    choiceA: "RESTART",
    nextA: "start",
    choiceB: "TRY AGAIN",
    nextB: "sunniesriddle"
  },

  wronggracie: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.png",
    pages: [
      "Lol, wrong!"
    ],
    choiceA: "RESTART",
    nextA: "start",
    choiceB: "TRY AGAIN",
    nextB: "graciesriddle"
  },

  wrongkelsea: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.png",
    pages: [
      "Lol, wrong!"
    ],
    choiceA: "RESTART",
    nextA: "start",
    choiceB: "TRY AGAIN",
    nextB: "kelseasriddle"
  },

  wrongjesse: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.png",
    pages: [
      "Lol, wrong!"
    ],
    choiceA: "RESTART",
    nextA: "start",
    choiceB: "TRY AGAIN",
    nextB: "jessesriddle"
  },

  wrongbrenda: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/wrong.png",
    pages: [
      "Lol, wrong!"
    ],
    choiceA: "RESTART",
    nextA: "start",
    choiceB: "TRY AGAIN",
    nextB: "brendasriddle"
  },

  dead: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/dead.png",
    pages: ["Oof.", "You didn’t make it."],
    choiceA: "TRY AGAIN",
    nextA: "start"
  },

  dead2: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/dead.png",
    pages: ["You were not careful.", "You’re dead."],
    choiceA: "TRY AGAIN",
    nextA: "start"
  },

  dead3: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/dead.png",
    pages: ["Wrong choice.", "Better luck next time."],
    choiceA: "TRY AGAIN",
    nextA: "start"
  },

  dead4: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/dead.png",
    pages: ["Oof.", "Whatever you said wasn't very polite.<br><br>You're dead now."],
    choiceA: "TRY AGAIN",
    nextA: "start"
  },

  
  /* ===============================
     ENDINGS
  ================================ */
  neutralEnding: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lscenessg/luisg_mansion_neutral.jpg",
    pages: [
      "The house remains as quietly as you leave it, the weight of unanswered questions pressing down on your shoulders.",
      "Shadows linger in the corners of your vision, whispers echo in your ears, but nothing truly reaches out.",
      "Perhaps you survived, or perhaps you were simply unnoticed. The Luisg Mansion waits for the next curious soul."
    ],
    nextA: "start",
    choiceA: "Restart Adventure"
  },

  curiousEnding: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lscenessg/luisg_mansion_curious.jpg",
    pages: [
      "Your insatiable curiosity drives you deeper into the mansion’s hidden corners.",
      "You uncover secret rooms, arcane symbols, and remnants of past tragedies. Each revelation spins your mind, yet you press on.",
      "By the time you leave, you know too much to ever be the same. The mansion whispers your name, and you wonder if you’ll ever escape its gaze."
    ],
    nextA: "start",
    choiceA: "Restart Adventure"
  },

  kindEnding: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lscenessg/luisg_mansion_kind.jpg",
    pages: [
      "Wherever fear and sorrow lingered in the mansion, your presence offered a glimmer of comfort.",
      "The spirits pause, some even acknowledging your kindness. You soothe the restless and leave with your heart lighter than it arrived.",
      "Though the mansion remains haunted, your compassion echoes long after you step outside."
    ],
    nextA: "start",
    choiceA: "Restart Adventure"
  },

  braveEnding: {
    background: "https://sunniejae.blob.core.windows.net/sunniejae/assets/lscenessg/luisg_mansion_brave.jpg",
    pages: [
      "Fear does not stop you, and the mansion takes note. You stride boldly through haunted halls, confronting specters and curses alike.",
      "The darkness recoils before your courage, revealing truths others might never see.",
      "By night’s end, you have faced the mansion head-on, and though scars remain, you exit changed forever."
    ],
    nextA: "start",
    choiceA: "Restart Adventure"
  }

};
