
///Soundtrack///

const soundtrack = new Audio(
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/soundtrack.mp3"
);

soundtrack.loop = true;
soundtrack.volume = 0.4
let audioStarted = false;


//Script///

        const gameData = {
start: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/luis1.gif',
    title: 'LUIS G\'S MANSION',
    text: ` <p class="riddle-text">
            Welcome to Luis G's Mansion... <br> A relic of an office incentive competition
            <br>
            Solve the riddles to survive.
            <br>
             Enter if you dare.
            <br>
            Survive if you can.`,
    buttons: [
            { text: 'START GAME', nextScene: 'foyer' },
            { text: 'INSTRUCTIONS', nextScene: 'instructions' }
            ]
},
            
instructions: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/idle.gif',
    title: 'INSTRUCTIONS',
    text: `Read each riddle carefully.
        <br>
        Choose your answer wisely.
        <br>
        Wrong choices may lead to danger, and there are no save points!`,
    buttons: [
        { text: 'BACK', nextScene: 'start' },
        { text: 'LETS-A-GO', nextScene: 'foyer' }
            ]
},
                     
foyer: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/foyer1.gif',
    title: 'THE THE FOYER',
    text: `You stand in the foyer, the walls adorned with old, dusty paintings and cobwebs stretching from corner to corner. 
    <br>
    The room feels colder as you walk further from the door. <br> On the floor, a rolled parchment rests alone.
    <br>
    Read the parchment?`,
    buttons: [
        { text: 'YES', nextScene: 'parchment' },
        { text: 'GO BACK', nextScene: 'cowardsexit' }
             ]
},
            
parchment: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/parchment.gif',
    title: 'DUSTY PARCHMENT',
    text: `I have cities, but no houses. I have forests, but no trees. I have rivers, but no water.
        <br>
        What am I?`,
    buttons: [
        { text: 'Encyclopedia', nextScene: 'shakeevent' },
        { text: 'Book', nextScene: 'wrong' },
        { text: 'Map', nextScene: 'wrong' }
             ]
},

shakeevent: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/shakeevent.gif',
    title: 'THE MANSION RESPONDS',
    text: `confidently, you speak your answer out loud. as you do, the room begins to shake.`,
    buttons: [
        { text: 'RUN!', nextScene: 'basement' },
        { text: 'HIDE!', nextScene: 'collapsed' },
            ]
},

collapsed: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/collapsed.gif',
    title: 'GONER',
    text: `You tried to hide under the stairs, but the ceiling collapsed on you.
    <br>
    You have died.`,
    buttons: [
        { text: 'START OVER?', nextScene: 'start' },
            ]
},

basement: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/basement.gif',
    title: 'DUSTY BASEMENT!',
    text: 'You run down the set of stairs that you notice in the corner. You end up in a dirty, cluttered basement. <br> When you get there, you’re greeted by the fabled Sunnie Jae.',
    buttons: [
        { text: 'SAY HI', nextScene: 'sunnie1' }
            ]
},

sunnie1: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunnie1.gif',
    title: 'SUNNIEJAE',
    text: `I have a gift for you! But you must answer a riddle before I'll give it to you.`,
    buttons: [
        { text: 'OKAY', nextScene: 'sunnie2' },
        { text: 'NO THANKS', nextScene: 'entrance' }
            ]   
},

sunnie2: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunnie2.gif',
    title: 'RIDDLE',
    text: `The more of this there is, the less of it you see. <br> What is it?`,
    buttons: [
        { text: 'DARKNESS', nextScene: 'sunnie3' },
        { text: 'TIME', nextScene: 'wrong' },
        { text: 'FOG', nextScene: 'wrong' }
                ]
},

sunnie3: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/sunniesgift.gif',
    title: 'GOOD ONE',
    text: `Wow, you actually got it right. <b> Here's your gift.`,
    buttons: [
        { text: 'THANKS', nextScene: 'sunnie4' },
        { text: 'I DONT CARE', nextScene: 'dead' }
            ]
},

sunnie4: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/threedoors.gif',
    title: 'YOUR GIFT',
    text: `Yup! It's another key. Good luck finding out which room it goes to!`,
    buttons: [
        { text: 'Door One', nextScene: 'wrongroom' },
        { text: 'Door Two', nextScene: 'wrongroom' },
        { text: 'Door Three', nextScene: 'room1' }
        ]  
},

room1: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/room1.gif',
    title: 'IT WORKED',
    text: `The door opens and you step into another dusty room with creaky floorboards and a really really overworked A/C unit`,
    buttons: [
        { text: 'next', nextScene: 'room2' },
        ]
},

room2: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/room1.gif',
    title: 'HAUNTING WHISPERS',
    text: `you hear breathing behind you, and before you could even turn around, you see...
    <br>
    a haunted...
    <br>
    fairy? `,
    buttons: [
        { text: 'HELLO?', nextScene: 'gracie' },
        { text: 'EW!', nextScene: 'dead' }
]
},

gracie: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/gracie1.gif',
    title: 'SCARY FAIRY',
    text: `hello everyone
        <br>
        i’m scary fairy gracie
        <br>
        the bags under my eyes are designer,
        <br>
        and so is the riddle i’m about to give to you`,
    buttons: [
        { text: 'OKAY', nextScene: 'gracie2' },
        { text: 'NOT AGAIN', nextScene: 'dead' }
]
},
                
gracie2: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/gracie2.gif',
    title: 'THE RIDDLE',
    text: `I am not alive, but I grow; I do not have lungs, but I need air. I do not have a mouth, but water kills me. <br> What am I?`,
    buttons: [
        { text: 'EARTH', nextScene: 'wrong2' },
        { text: 'WIND', nextScene: 'wrong2' },
        { text: 'FIRE', nextScene: 'gracie3' }
                ]
},

gracie3: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/gracie2.gif',
    title: 'GOOD ANSWER',
    text: `I’m so proud of you.
        <br>
        <br> Go upstairs to continue your haunted adventure`,
    buttons: [
        { text: 'OKAY', nextScene: 'library' },
        { text: 'NO', nextScene: 'dead' }
                ]
},

library: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/library.gif',
    title: 'THE LIBRARY',
    text: `Welcome to the library. <br> Be quiet- you might disturb someone reading-`,
    buttons: [
        { text: '*SNEEZE*', nextScene: 'kelsea' },
        { text: 'HOLD STILL', nextScene: 'kelsea1' }
            ]
},

kelsea: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/kelsea1.gif',
    title: 'I WARNED YOU',
    text: `WHO DISTURBS MY SELF CARE TIME?!
        <br>
        I’m kelsea the cat.
        <br>
        I was reading my 1000th book of the year, so this better be good`,
    buttons: [
        { text: 'UHH..', nextScene: 'dead3' },
        { text: 'WHAT ARE YOU READING?', nextScene: 'kelsea2' }
            ]
},

kelsea1: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/kelsea1.gif',
    title: 'I WARNED YOU',
    text: `Did you really think I wouldn't see you?
    <br>
    I’m kelsea the cat.
    <br>
    I was reading my 1000th book of the year, so this better be good`,
    buttons: [
        { text: 'UHH..', nextScene: 'dead3' },
        { text: 'WHAT ARE YOU READING?', nextScene: 'kelsea2' }
            ]
},

kelsea2: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/kelsea2.gif',
    title: 'BE POLITE',
    text: `oh- what am i reading?
        <br>
        I’m glad you asked.
        <br>
        It’s a book of riddles.
        <br>
        Wanna try?`,
    buttons: [
        { text: 'SURE', nextScene: 'kelsea3' },
        { text: 'NO', nextScene: 'dead' }
            ]
},

kelsea3: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/kelsea2.gif',
    title: 'THE RIDDLE',
    text: `You measure my life in hours.
    <br>
    I am quicker when I am thinner, and I am slower when I am thicker. `,
    buttons: [
        { text: ' ', nextScene: 'wrong' },
        { text: '', nextScene: 'wrong' },
        { text: 'A CANDLE', nextScene: 'kelsea4' },
             ]
},

kelsea4: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/kelsea2.gif',
    title: 'DONT OVERSTAY YOUR WELCOME',
    text: `Now get out of here so I can start book 1001!`,
    buttons: [
        { text: 'LEAVE', nextScene: 'twodoors' },
        { text: 'NO', nextScene: 'dead' }
            ],
},

 twodoors: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/twodoors.gif',
    title: 'WHERE TO GO',
    text: `You turn around, unsure where to go next. <br> There are two doors in front of you. <br> Which will you choose?`,
    buttons: [
        { text: 'LEFT', nextScene: 'bathroom' },
        { text: 'RIGHT', nextScene: 'pianoroom' }
            ]
},

 bathroom: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/bathroom.gif',
    title: 'THE BATHROOM',
    text: `you walk into what seems to be the bathroom
        <br> 
        I hope it’s not already occupied-`,
    buttons: [
        { text: 'EW, SAME', nextScene: 'jesse' },
        { text: 'ANYONE HERE?', nextScene: 'jesse' }
            ]
},

jesse: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/jesse1.gif',
    title: 'AW MAN',
    text: `Ope! Looks like someone was here after all...`,
    buttons: [
        { text: 'EW!', nextScene: 'dead' },
        { text: 'PARDON ME', nextScene: 'jesse2' }
            ]
},

jesse2: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/jesse2.gif',
    title: 'HEY TRIBE',
    text: `It's me.
        <br> 
        The man, the myth, the legend... 
        <br>
        The Wizard Jesse.`,
    buttons: [
        { text: 'HELLO', nextScene: 'jesse3' },
        { text: 'UGH', nextScene: 'dead' }
            ]
},

jesse3: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/jesse2.gif',
    title: 'SAVIOR',
    text: `I can get you out of here, just solve my final riddle.`,
    buttons: [
        { text: 'YES PLEASE', nextScene: 'jesse4' },
        { text: 'NO WAY', nextScene: 'dead' }
    ]
},

jesse4: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/jesse2.gif',
    title: 'THE RIDDLE',
    text: `I can be long or short. <br> I can be grown or bought. <br> I can be painted, or left bare. <br> I can be round, or I can be square. <br> What am I?`,
    buttons: [
        { text: 'PENCIL', nextScene: 'winner' },
        { text: 'BRUSH', nextScene: 'wrong' },
        { text: 'ROAD', nextScene: 'wrong' }
    ]
},

winner: {
    background: 'https://sunniejae.blob.core.windows.net/sunniejae/assets/luisg/winner.gif',
    title: 'CONGRATS',
    text: `You did it! <br> By golly, you did it. <br> Play Again?`,
    buttons: [
        { text: 'RESTART', nextScene: 'start' },
            ]
},
};
    

///// The Boring Parts ///
let currentScene = "start";
let typingInterval = null;
let isTyping = false;



/* ===============================
   TYPEWRITER EFFECT (HTML SAFE)
================================ */

function typeWriter(element, html, speed = 22, onComplete) {
    element.innerHTML = "";
    let i = 0;
    let isTag = false;
    let buffer = "";

    clearInterval(typingInterval);
    isTyping = true;

    typingInterval = setInterval(() => {
        if (i >= html.length) {
            clearInterval(typingInterval);
            isTyping = false;
            if (onComplete) onComplete();
            return;
        }

        const char = html[i];
        buffer += char;

        if (char === "<") isTag = true;
        if (char === ">") isTag = false;

        element.innerHTML = buffer;
        i++;

        // Skip delays inside HTML tags
        if (isTag) return;
    }, speed);
}



/* ===============================
   SCENE LOADING
================================ */

function loadScene(sceneId) {
    const scene = gameData[sceneId];
    if (!scene) return;

    currentScene = sceneId;

    // Fade out old scene
    document.querySelector(".game-content.active")?.classList.remove("active");
    document.querySelector(".background-image.active")?.classList.remove("active");

    setTimeout(() => {
        renderBackground(scene.background);
        renderScene(scene);
    }, 300);
}



/* ===============================
   RENDER FUNCTIONS
================================ */

function renderBackground(src) {
    const backgrounds = document.getElementById("backgrounds");
    backgrounds.innerHTML = `
        <img src="${src}" class="background-image active" alt="Background">
    `;
}

function renderScene(scene) {
    const scenes = document.getElementById("scenes");

    const buttonsHTML = scene.buttons
        .map(
            btn =>
                `<button class="game-button" onclick="loadScene('${btn.nextScene}')">
                    ${btn.text}
                 </button>`
        )
        .join("");

    scenes.innerHTML = `
        <div class="game-content active">

    <div class="title-bar">${scene.title}</div>

    <div class="text-area">
        <div class="text-box">
            <p class="riddle-text"></p>
        </div>
    </div>

</div>

<div class="ui-bottom">
    <div class="button-container">
        ${buttonsHTML}
    </div>

    <div class="credits">
        © 2025 SUNNIE JAE
    </div>
</div>

    `;

    const textElement = scenes.querySelector(".riddle-text");
    typeWriter(textElement, scene.text, 60);
}



document.addEventListener("click", () => {
    if (!isTyping) return;

    clearInterval(typingInterval);
    isTyping = false;

    const textElement = document.querySelector(".riddle-text");
    if (textElement) {
        textElement.innerHTML = gameData[currentScene].text;
    }
});

function showChoices(aText, bText) {
  document.getElementById("optionA").textContent = aText;
  document.getElementById("optionB").textContent = bText;
  document.getElementById("choicePrompt").style.display = "block";
}

function hideChoices() {
  document.getElementById("choicePrompt").style.display = "none";
}



/* ===============================
   INIT
================================ */

function init() {
    loadScene(currentScene);
}

init();