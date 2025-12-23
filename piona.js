// ===== MEMBER DATA =====
const members = {
    chaewon: { display: "Chaewon", subtitle: "Ssamudan", color: "var(--chaewon)", accent: "var(--chaewon-dark)" },
    ot5: { display: "OT5", subtitle: "Fearnot", color: "var(--primary)", accent: "var(--dark-purple)" },
    sakura: { display: "Sakura", subtitle: "39er", color: "var(--sakura)", accent: "var(--sakura-dark)" },
    yunjin: { display: "Yunjin", subtitle: "Burned Passport", color: "var(--yunjin)", accent: "var(--yunjin-dark)" },
    kazuha: { display: "Kazuha", subtitle: "Komorebis", color: "var(--kazuha)", accent: "var(--kazuha-dark)" },
    eunchae: { display: "Eunchae", subtitle: "Eunchae Mother Association", color: "var(--eunchae)", accent: "var(--eunchae-dark)" }
};

// ===== PRODUCT DATA =====
const products = [
    { 
        name: "Hangul Member Names", 
        images: { ot5: "hangul-member.png", chaewon: "hangul-chaewon.png", sakura: "hangul-sakura.png", yunjin: "hangul-yunjin.png", kazuha: "hangul-kazuha.png", eunchae: "hangul-eunchae.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"Multi",
        link: "https://www.redbubble.com/shop/hangul+member+names"
    },
    { 
        name: "Spaghetti Era Stickers", 
        images: { ot5: "spaghetti-member.png", chaewon: "spaghetti-chaewon.png", sakura: "spaghetti-sakura.png", yunjin: "spaghetti-yunjin.png", kazuha: "spaghetti-kazuha.png", eunchae: "spaghetti-eunchae.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"Multi",
        link: "https://www.redbubble.com/shop/spaghetti+era+stickers"
    },
    { 
        name: "Lightstick Keychains", 
        images: { ot5: "lightstick-member.png", chaewon: "lightstick-chaewon.png", sakura: "lightstick-sakura.png", yunjin: "lightstick-yunjin.png", kazuha: "lightstick-kazuha.png", eunchae: "lightstick-eunchae.png" }, 
        brand: "Sunnie Jae", price: "$15", size:"1pc" 
    },
    { 
        name: "Phone Case", 
        images: { ot5: "phonecase-member.png", chaewon: "phonecase-chaewon.png", sakura: "phonecase-sakura.png", yunjin: "phonecase-yunjin.png", kazuha: "phonecase-kazuha.png", eunchae: "phonecase-eunchae.png" }, 
        brand: "Sunnie Jae", price: "$25", size:"1pc" 
    },
    { 
        name: "AutoGraphics", 
        images: { ot5: "autograph-member.png", chaewon: "autograph-chaewon.png", sakura: "autograph-sakura.png", yunjin: "autograph-yunjin.png", kazuha: "autograph-kazuha.png", eunchae: "autograph-eunchae.png" }, 
        brand: "Redbubble", price: "$1.79+", size:"1pc",
        link: "https://www.redbubble.com/shop/autographics"
    }
];

// ===== QUIZ DATA =====
const quizQuestions = [
    { question: "Favorite Color", answers: [ {text: "White", members:["chaewon"]}, {text:"Pink", members:["sakura"]}, {text:"Blue", members:["kazuha"]}, {text:"Green", members:["yunjin"]}, {text:"Red", members:["eunchae"]} ] },
    { question: "MBTI Type - Are you an introvert or an extrovert?", answers: [ {text:"Introvert", members:["sakura","eunchae","kazuha"]}, {text:"Extrovert", members:["yunjin","chaewon"]} ] },
    { question: "MBTI Type - Down to Earth vs Head in the Clouds", answers: [ {text:"Down to Earth", members:["chaewon","eunchae"]}, {text:"Head in the Clouds", members:["sakura","yunjin","kazuha"]} ] },
    { question: "MBTI Type - Head vs Heart", answers: [ {text:"Head", members:["sakura","eunchae","chaewon"]}, {text:"Heart", members:["kazuha","yunjin"]} ] },
    { question: "MBTI Type - Order vs Chaos", answers: [ {text:"Order", members:["yunjin","kazuha","eunchae"]}, {text:"Chaos", members:["chaewon","sakura"]} ] },
    { question: "Favorite Animal", answers: [ {text:"Cheetah", members:["chaewon"]}, {text:"Cat", members:["sakura"]}, {text:"Swan", members:["kazuha"]}, {text:"Baby Chick", members:["eunchae"]}, {text:"Snake", members:["yunjin"]} ] },
    { question: "Favorite English Name", answers: [ {text:"Anna", members:["chaewon"]}, {text:"Sebastian
