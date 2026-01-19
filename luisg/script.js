        // Game data structure
        const gameData = {
            start: {
                background: '1.gif',
                title: 'LUIS G\'S MANSION',
                text: ` <p class="riddle-text">
Welcome to Luis G's Mansion... <br> A relic of an office incentive competition <br>
                        <br> Solve the riddles to survive. Enter if you dare.
<br> <span class="blink">► PRESS START ◄</span>`,
                buttons: [
                    { text: 'START GAME', nextScene: 'entrance' },
                    { text: 'INSTRUCTIONS', nextScene: 'instructions' }
                ]
            },
            
            instructions: {
                background: 'idle.gif',
                title: 'INSTRUCTIONS',
                text: `Read each riddle carefully.
                
Choose your answer wisely.

Wrong choices may lead to danger!`,
                buttons: [
                    { text: 'BACK TO START', nextScene: 'start' }
                ]
            },
            
            entrance: {
                background: 'entry.gif',
                title: 'THE ENTRANCE HALL',
                text: 'The air is cold, the floors creak beneath your feet, and strange whispers echo through the halls. <br> Solve the riddles of the mansion and face challenges from some familiar faces. Only the smartest will escape... Are you ready?',
                 buttons: [
                    { text: 'Lets-a-go!', nextScene: 'foyer' }
                ]
            },
            
            hallway: {
                background: 'foyer.gif',
                title: 'THE HALLWAY',
                text: `You stand in the foyer, the walls adorned with old, dusty paintings and cobwebs stretching from corner to corner. 
The room feels colder as you aproach the desk, where a piece of parchment rests atop it.
<br> Read the parchment?`,
                buttons: [
                    { text: 'YES', nextScene: 'parchment' },
                    { text: 'GO BACK', nextScene: 'entrance' }
                ]
            },
            
            parchment: {
                background: 'parchment.gif',
                title: 'DUSTY PARCHMENT',
                text: `I have cities, but no houses. I have forests, but no trees. I have rivers, but no water. 
<br> What am I?`,
                buttons: [
                    { text: 'Encyclopedia', nextScene: 'shakeevent' },
                    { text: 'Book', nextScene: 'wrong' },
                    { text: 'Map', nextScene: 'wrong' }
                ]
            },
            shakeevent: {
                background: 'shakeevent.gif',
                title: 'THE MANSION RESPONDS',
                text: `confidently, you speak your answer out loud. as you do, the room begins to shake.`,
                buttons: [
                    { text: 'RUN!', nextScene: 'basement' },
                    { text: 'HIDE!', nextScene: 'dead' },
            
                ]
            },
            
            basement: {
                background: 'basement.gif',
                title: 'DUSTY BASEMENT!',
                text: 'You run down the set of stairs that you notice in the corner. You end up in a dirty, cluttered basement. <br> When you get there, you’re greeted by the fabled Sunnie Jae.',
                buttons: [
                    { text: 'SAY HI', nextScene: 'sunnie1' }
                ]
            },

            sunnie1: {
                background: 'sunnie1.gif',
                title: 'SUNNIEJAE',
                text: `I have a gift for you! But you must answer a riddle before I'll give it to you.`,
                buttons: [
                    { text: 'OKAY', nextScene: 'sunnie2' },
                    { text: 'NO THANKS', nextScene: 'entrance' }
                ]
            },
        sunnie2: {
                background: 'sunnie2.gif',
                title: 'RIDDLE',
                text: `The more of this there is, the less of it you see. <br> What is it?`,
                buttons: [
                    { text: 'DARKNESS', nextScene: 'sunnie3' },
                    { text: 'TIME', nextScene: 'wrong' },
                    { text: 'FOG', nextScene: 'wrong' }
                ]
            },
                 sunnie3: {
                background: 'sunnie2.gif',
                title: 'GOOD ONE',
                text: `Wow, you actually got it right. <b> Here's your gift.`,
                buttons: [
                    { text: 'THANKS', nextScene: 'sunnie4' },
                    { text: 'I DONT CARE', nextScene: 'dead' }
                ]
},
                 sunnie4: {
                background: 'sunnie4.gif',
                title: 'YOUR GIFT',
                text: `Yup! It's another key. Good luck finding out which room it goes to!`,
                buttons: [
                    { text: 'Door One', nextScene: 'wrongroom' },
                    { text: 'Door Two', nextScene: 'wrongroom' },
                    { text: 'Door Three', nextScene: 'grandroom' }
                ]  
                },
                grandroom: {
                background: 'grandroom.gif',
                title: 'IT WORKED',
                text: `The door opens and you step into another dusty room with creaky floorboards and a really really overworked A/C unit`,
                buttons: [
                    { text: 'next', nextScene: 'grandroom2' },

                ]
},
                  grandroom2: {
                background: 'grandroom.gif',
                title: 'HAUNTING WHISPERS',
                text: `you hear breathing behind you, and before you could even turn around, you see...
a haunted... fairy? `,
                buttons: [
                    { text: 'HELLO?', nextScene: 'gracie' },
                    { text: 'EW!', nextScene: 'dead2' }

                ]
},
                  gracie: {
                background: 'gracie.gif',
                title: 'SCARY FAIRY',
                text: `hello everyone<br>
i’m scary fairy gracie<br>

the bags under my eyes are designer,<br>

and so is the riddle i’m about to give to you`,
                buttons: [
                    { text: 'OKAY', nextScene: 'gracie2' },
                    { text: 'NOT AGAIN', nextScene: 'dead2' }

                ]
                },
                  gracie3: {
                background: 'gracie.gif',
                title: 'THE RIDDLE',
                text: `I am not alive, but I grow; I do not have lungs, but I need air. I do not have a mouth, but water kills me. <br> What am I?`,
                buttons: [
                    { text: 'EARTH', nextScene: 'wrong2' },
                    { text: 'WIND', nextScene: 'wrong2' },
                    { text: 'FIRE', nextScene: 'gracie4' }

                ]
},
                  gracie4: {
                background: 'gracie.gif',
                title: 'GOOD ANSWER',
                text: `I’m so proud of you. <br>
go upstairs to continue your haunted adventure`,
                buttons: [
                    { text: 'OKAY', nextScene: 'library' },
                    { text: 'NO', nextScene: 'dead2' }

                ]
},
                
            wrong1: {
                background: 'dead.gif',
                title: 'WRONG ANSWER!',
                text: `The ghost of Luis G appears!
                
"Think more carefully..."

Try again?`,
                buttons: [
                    { text: 'TRY AGAIN', nextScene: 'entrance' },
                    { text: 'GIVE UP', nextScene: 'start' }
                ]
            },
            
            wrong2: {
                background: 'dead.gif',
                title: 'WRONG ANSWER!',
                text: `The ghost of Luis G appears again!
                
"So close, yet so far..."

Try again?`,
                buttons: [
                    { text: 'TRY AGAIN', nextScene: 'library' },
                    { text: 'GIVE UP', nextScene: 'start' }
                ]
            }
        };

        let currentScene = 'start';

        // Initialize the game
        function init() {
            loadScene(currentScene);
        }

        function loadScene(sceneId) {
            const scene = gameData[sceneId];
            if (!scene) return;

            currentScene = sceneId;

            // Fade out current content
            const oldContent = document.querySelector('.game-content.active');
            const oldBg = document.querySelector('.background-image.active');
            
            if (oldContent) oldContent.classList.remove('active');
            if (oldBg) oldBg.classList.remove('active');

            // Create new background
            setTimeout(() => {
                const backgroundsContainer = document.getElementById('backgrounds');
                backgroundsContainer.innerHTML = `<img src="${scene.background}" alt="Background" class="background-image active">`;

                // Create new content
                const scenesContainer = document.getElementById('scenes');
                const buttonsHTML = scene.buttons.map(btn => 
                    `<button class="game-button" onclick="loadScene('${btn.nextScene}')">${btn.text}</button>`
                ).join('');

                scenesContainer.innerHTML = `
                    <div class="game-content active">
                        <div class="title-bar">${scene.title}</div>
                        <div class="text-box">
                            <p class="riddle-text">${scene.text}</p>
                        </div>
                        <div class="button-container">
                            ${buttonsHTML}
                        </div>
                        <div class="credits">© 2026 LUIS G'S MANSION • INSERT COIN</div>
                    </div>
                `;
            }, 300);
        }

        // Start the game
        init();
