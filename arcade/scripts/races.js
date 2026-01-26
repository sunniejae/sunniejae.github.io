export const races = {
  shattered: {
    name: "The Shattered",
    stats: { courage: 0, charisma: 0, curiosity: 2 }, // Wisdom→Curiosity, Dexterity→Courage maybe
    features: {
      senseTheVeil: {
        name: "Sense the Veil",
        description: "Detect spirits, curses, or supernatural phenomena within 30 ft.",
        action: () => alert("You sense a disturbance nearby...")
      },
      hauntingAura: {
        name: "Haunting Aura",
        description: "Once per day, frighten creatures within 10 ft.",
        action: () => alert("The shadows cling to you, frightening your foes!")
      }
    }
  },
  forsaken: {
    name: "The Forsaken",
    stats: { courage: 2, charisma: 0, curiosity: 0 },
    features: {
      endlessResilience: {
        name: "Endless Resilience",
        description: "Once per day, drop to 1 HP instead of 0.",
        action: () => alert("You survive the brink of death!")
      },
      hexsEcho: {
        name: "Hex’s Echo",
        description: "Impose disadvantage on an Insight or Persuasion check once per day.",
        action: () => alert("Your curse unnerves your target!")
      }
    }
  },
  witness: {
    name: "The Witness",
    stats: { courage: 0, charisma: 2, curiosity: 2 }, // Int→Curiosity, Cha→Charisma
    features: {
      insightBeyondReality: {
        name: "Insight Beyond Reality",
        description: "Roll with advantage on Arcana/Insight checks with supernatural phenomena.",
        action: () => alert("You notice patterns invisible to others!")
      },
      propheticGlimpse: {
        name: "Prophetic Glimpse",
        description: "Receive cryptic visions that may aid or mislead.",
        action: () => alert("Fragments of the future flash before your eyes!")
      }
    }
  },
  bound: {
    name: "The Bound",
    stats: { courage: 0, charisma: 2, curiosity: 0 },
    features: {
      otherworldlyLink: {
        name: "Otherworldly Link",
        description: "Reroll a failed saving throw once per day; next Wisdom save at disadvantage.",
        action: () => alert("Your bond grants you power, but leaves you vulnerable...")
      },
      unseenAid: {
        name: "Unseen Aid",
        description: "Manipulate small objects or trip enemies as a bonus action.",
        action: () => alert("A hidden force bends to your will!")
      }
    }
  },
  devout: {
    name: "The Devout",
    stats: { courage: 0, charisma: 0, curiosity: 2 }, // Wisdom→Curiosity or keep as is
    features: {
      sacredResolve: {
        name: "Sacred Resolve",
        description: "Reroll a failed save vs fear or charm once per day.",
        action: () => alert("Your faith shields you from dread!")
      },
      divineSense: {
        name: "Divine Sense",
        description: "Sense undead, fiends, or consecrated/desecrated objects within 30 ft.",
        action: () => alert("You sense a divine presence nearby!")
      }
    }
  }
};
