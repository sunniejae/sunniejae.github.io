/* =========================================================
   DATA
   ========================================================= */

const pinData = [
    { id:"4", title:"Webcomic Self Portrait", description:"Exploring techniques", tags:["webcomic","self portrait"], type:"image" },
    { id:"2", title:"Siberian", description:"Color block portrait of a cat", tags:["cat","pet art"], type:"image" },
    { id:"3", title:"Winter Speedpaint", description:"Colorblock speedpaint video", tags:["video","speedpaint"], type:"video",
      poster:"https://sunniejae.blob.core.windows.net/sunniejae/assets/digital%20art/3.png",
      src:"https://sunniejae.blob.core.windows.net/sunniejae/assets/digital%20art/videos/3.mp4"
    },
    { id:"1", title:"If I Knew Then", description:"Exploring techniques", tags:["2020","surreal"], type:"image" },
    { id:"6", title:"Finale", description:"First OT7 izna", tags:["2024","color block","kpop","izna"], type:"image" },
    { id:"7", title:"Hailey", description:"Webcomic portrait of the main character in Love Bites Back", tags:["2025","webcomic","hailey","love bites back"], type:"image" },
    { id:"8", title:"It's (a bubblegum), Bitch", description:"celebrity portrait with holographic effect", tags:["2025","surreal","celebrity","britney spears"], type:"image" },
    { id:"9", title:"Now You See Me", description:"surreal portrait", tags:["2020","commissioned","portrait"], type:"image" },
    { id:"10", title:"MoonSun", description:"Moonbyul and Solar from Mamamoo", tags:["2023","color block","kpop","mamamoo"], type:"image" },
    { id:"11", title:"Bombshell", description:"Digital art celebrity portrait", tags:["2022","color block","kpop","izna"], type:"image" },
    { id:"12", title:"Flowers Pt 1", description:"honeysuckle, orchid, and sunflower", tags:["2025","flowers"], type:"image" },
    { id:"13", title:"Flowers Pt 2", description:"peony, dandelion, and rose", tags:["2025","flowers"], type:"image" },
    { id:"14", title:"Crystals Pt 1", description:"turquoise, amethyst, sapphire, emerald, and diamond", tags:["2025","crystals"], type:"image" },
    { id:"15", title:"Going, Going...", description:"surreal portrait", tags:["2020","surreal","commissioned"], type:"image" },
    { id:"16", title:"Am I Pretty Yet?", description:"Portrait inspired by vintage blush", tags:["2021","out of my mind","portrait"], type:"image" },
    { id:"17", title:"Everyone Starts Somewhere", description:"first finished piece of digital art", tags:["2020"], type:"image" },
    { id:"18", title:"In the Clouds", description:"physically im here, mentally im... somewhere else", tags:["2021","out of my mind","portrait"], type:"image" },
    { id:"19", title:"Scary Go Round", description:"playing with line art", tags:["line art","minimalistic","2023"], type:"image" },
    { id:"20", title:"Self Portrait", description:"tattoo design", tags:["2023","line art","minimalistic"], type:"image" },
    { id:"21", title:"Commissioned Tattoo Piece", description:"skull and knife linework tattoo", tags:["lineart","2023","tattoo"], type:"image" },
    { id:"22", title:"Nightsweats", description:"linework inspired by combining adderall and lamictal", tags:["mental health","2020","lineart","minimalistic"], type:"image" },
    { id:"23", title:"I Am Precious", description:"surreal celestite portrait", tags:["surreal","commissioned","portrait"], type:"image" },
    { id:"24", title:"Basshead", description:"2021 rave attendee", tags:["2021","out of my mind","portrait","surreal"], type:"image" },
    { id:"25", title:"Things I Left Unsent", description:"inspired by The Unsent Project", tags:["the unsent project","2021","surreal","out of my mind"], type:"image" },
    { id:"26", title:"Still Blooming", description:"a daisy for my daisy", tags:["out of my mind","portrait","surreal"], type:"image" },
    { id:"27", title:"She Talks Too Much", description:"Elohim fan art.", tags:["out of my mind","crystals","surreal","fanart"], type:"image" }
];

/* =========================================================
   ELEMENTS
   ========================================================= */

const masonry = document.getElementById("masonry");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

/* =========================================================
   MASONRY LOGIC (FIXED)
   ========================================================= */

function resizeMasonryItem(item) {
    const rowHeight = 10;
    const rowGap = 20;
    const height = item.getBoundingClientRect().height;
    const span = Math.ceil((height + rowGap) / (rowHeight + rowGap));
    item.style.setProperty("--row-span", span);
}

function resizeAll() {
    document.querySelectorAll(".pin").forEach(resizeMasonryItem);
}

/* =========================================================
   LAZY LOAD MEDIA
   ========================================================= */

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const media = entry.target;
        if (!media.dataset.src) return;

        media.src = media.dataset.src;

        if (media.tagName === "VIDEO") {
            media.onloadedmetadata = () => {
                media.play();
                resizeMasonryItem(media.closest(".pin"));
            };
        } else {
            media.onload = () =>
                resizeMasonryItem(media.closest(".pin"));
        }

        observer.unobserve(media);
    });
}, { rootMargin: "200px" });

/* =========================================================
   RENDER PINS
   ========================================================= */

function normalizeTag(tag) {
    return tag.toLowerCase().replace(/\s+/g, "-");
}

function renderPins() {
    masonry.innerHTML = "";

    pinData.forEach(pin => {
        const el = document.createElement("div");
        el.className = "pin";

        const normalizedTags = pin.tags.map(normalizeTag);
        el.dataset.tags = normalizedTags.join(",");

        const tagsHTML = pin.tags.map(t =>
            `<span class="tag-item" data-tag="${normalizeTag(t)}">#${t}</span>`
        ).join("");

        el.innerHTML = `
            <div class="pin-image">
                ${
                    pin.type === "video"
                        ? `<video muted loop playsinline preload="none"
                              poster="${pin.poster}"
                              data-src="${pin.src}"></video>`
                        : `<img data-src="https://sunniejae.blob.core.windows.net/sunniejae/assets/digital%20art/${pin.id}.png">`
                }

                <div class="pin-overlay">
                    <div class="pin-actions">
                        <button class="action-btn tags-btn" data-id="${pin.id}">Tags</button>
                        <button class="action-btn share-btn" data-id="${pin.id}">Share</button>

                        <div class="dropdown-menu tags-menu" id="tags-${pin.id}">
                            ${tagsHTML}
                        </div>

                        <div class="dropdown-menu share-menu" id="share-${pin.id}">
                            <div class="share-option copy-link" data-id="${pin.id}">🔗 Copy link</div>
                            <div class="share-option" data-platform="twitter" data-id="${pin.id}">🖤 X</div>
                            <div class="share-option" data-platform="pinterest" data-id="${pin.id}">🧡 Pinterest</div>
                            <div class="share-option" data-platform="tumblr" data-id="${pin.id}">💜 Tumblr</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pin-info">
                <div class="pin-title">${pin.title}</div>
                <div class="pin-description">${pin.description}</div>
            </div>
        `;

        masonry.appendChild(el);
        observer.observe(el.querySelector("img, video"));

        el.addEventListener("click", e => {
            if (e.target.closest(".action-btn") || e.target.closest(".dropdown-menu")) return;
            openModal(pin);
        });
    });

    requestAnimationFrame(resizeAll);
}

/* =========================================================
   MODAL
   ========================================================= */

function openModal(pin) {
    modalContent.innerHTML =
        pin.type === "video"
            ? `<video class="modal-media" src="${pin.src}" controls autoplay></video>`
            : `<img class="modal-media" src="https://sunniejae.blob.core.windows.net/sunniejae/assets/digital%20art/${pin.id}.png">`;

    modal.classList.add("active");
}

document.getElementById("closeModal")?.addEventListener("click", closeModal);
modal?.addEventListener("click", e => e.target === modal && closeModal());

function closeModal() {
    modal.classList.remove("active");
    modalContent.innerHTML = "";
}

/* =========================================================
   TAGS + SHARE EVENTS
   ========================================================= */

document.addEventListener("click", e => {

    if (e.target.classList.contains("tags-btn")) {
        e.stopPropagation();
        document.getElementById(`tags-${e.target.dataset.id}`)?.classList.toggle("active");
        return;
    }

    if (e.target.classList.contains("share-btn")) {
        e.stopPropagation();
        document.getElementById(`share-${e.target.dataset.id}`)?.classList.toggle("active");
        return;
    }

    if (e.target.classList.contains("tag-item")) {
        const tag = e.target.dataset.tag;
        document.querySelectorAll(".pin").forEach(pin => {
            pin.style.display = pin.dataset.tags.includes(tag) ? "block" : "none";
        });
        requestAnimationFrame(resizeAll);
        return;
    }

    if (e.target.classList.contains("copy-link")) {
        navigator.clipboard.writeText(
            `https://sunniejae.blob.core.windows.net/sunniejae/assets/digital%20art/${e.target.dataset.id}.png`
        );
        return;
    }

    if (e.target.dataset.platform) {
        const id = e.target.dataset.id;
        const url = `https://sunniejae.blob.core.windows.net/sunniejae/assets/digital%20art/${id}.png`;
        const links = {
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
            pinterest: `https://pinterest.com/pin/create/button/?media=${encodeURIComponent(url)}`,
            tumblr: `https://www.tumblr.com/widgets/share/tool?posttype=photo&source=${encodeURIComponent(url)}`
        };
        window.open(links[e.target.dataset.platform], "_blank", "width=600,height=600");
        return;
    }

    document.querySelectorAll(".dropdown-menu").forEach(m => m.classList.remove("active"));
});

/* =========================================================
   INIT
   ========================================================= */

window.addEventListener("resize", resizeAll);
renderPins();
