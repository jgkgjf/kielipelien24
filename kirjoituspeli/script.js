let displayWord = "";
let categoriaSelect;
let score = 0;
let words = [];
let languageSuomeksi = true;
let randomIndex;
let usedWords = [];

document.addEventListener("DOMContentLoaded", async () => {
    categoriaSelect = document.getElementById("categorySelect");
    await loadWords();

    const categories = Object.keys(sanat);
    categories.forEach((category, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = category;
        categoriaSelect.appendChild(option);
    });

    categoriaSelect.addEventListener("change", refresh);

    await refresh();

    document.getElementById("pauseOverlay1").style.display = "block";

    document.getElementById("input").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            check();
        }
    });
});

async function loadWords() {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "../sanat.js";
        script.async = true;
        script.onload = () => {
            initializeGame();
            resolve();
        };
        document.head.appendChild(script);
    });
}

async function initializeGame() {
    const selectedOption = categoriaSelect.options[categoriaSelect.selectedIndex];

    if (selectedOption && sanat[selectedOption.textContent.toLowerCase()]) {
        const wordsData = sanat[selectedOption.textContent.toLowerCase()];
        words = wordsData.map(word => ({
            id: word.id,
            suomeksi: word.suomeksi,
            englanniksi: word.englanniksi
        }));
        displayWord = languageSuomeksi ? words[0].englanniksi : words[0].suomeksi;
    }
}

async function refresh() {
    const answerOutput = document.getElementById("answer"); 

    answerOutput.innerText = "";

    await initializeGame();

    randomIndex = Math.floor(Math.random() * words.length);
    displayWord = languageSuomeksi ? words[randomIndex].englanniksi : words[randomIndex].suomeksi;

    document.getElementById("scrambleWord").innerText = displayWord;
    document.getElementById("output").innerText = "";
    document.getElementById("input").value = "";

    setTimeout(() => {
        document.getElementById("input").focus();
    }, 50);
}

const delayDuration = 3000;
function check() {
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const answerOutput = document.getElementById("answer"); 
    const currentWord = languageSuomeksi ? words[randomIndex].englanniksi.toLowerCase() : words[randomIndex].suomeksi.toLowerCase();

    const isCorrect = input.value.trim().toLowerCase() === (languageSuomeksi ? words[randomIndex].suomeksi.toLowerCase() : words[randomIndex].englanniksi.toLowerCase());

    if (isCorrect) {
        output.innerHTML = "Result: Correct";
        score++;
    } else {
        output.innerHTML = "Result: Wrong";
        answerOutput.innerText = `Correct answer: ${languageSuomeksi ? words[randomIndex].suomeksi : words[randomIndex].englanniksi}`;
    }
    document.getElementById("score").innerText = `Score: ${score}`;
    setTimeout(refresh, delayDuration);
}

function swapLanguage() {
    languageSuomeksi = !languageSuomeksi;

    if (words.length > 0) {
        displayWord = languageSuomeksi ? words[0].englanniksi : words[0].suomeksi;
        document.getElementById("scrambleWord").innerText = displayWord;

        const inputPlaceholder = languageSuomeksi ? "Kirjoita sana suomeksi" : "Write the word in English";
        document.getElementById("input").placeholder = inputPlaceholder;

        document.getElementById("input").value = "";
        document.getElementById("output").innerText = "";

        setTimeout(() => {
            document.getElementById("input").focus();
        }, 50);
    }
}

function start() {
    document.getElementById("pauseOverlay1").style.display = "none";
    refresh();
}

function pause() {
    document.getElementById("pauseOverlay").style.display = "block";
}

function continueGame() {
    document.getElementById("pauseOverlay").style.display = "none";
}

function changeCategory() {
    score = 0;
    document.getElementById("score").innerText = `Score: ${score}`;

    document.getElementById("pauseOverlay").style.display = "none";
    document.getElementById("pauseOverlay1").style.display = "block";

    document.getElementById("input").value = "";
    document.getElementById("output").innerText = "";
}

document.getElementById("swapLanguagesButton").addEventListener("click", swapLanguage);

function goHome() {
    window.location.href = "../index.html"; 
}
