document.addEventListener("DOMContentLoaded", function () {
    let options = {};
    let winCount = 0;
    let count = 0;
    let wrongLetters = [];
    let chosenWord = "";
    let guessedLetters = new Set();
    let wrongGuessedLetters = new Set();
    let categorySelected = false;
    let letterButtons = [];
    let ResettingGame = false;
    let dashes;
    let originalDisplayItem = [];
    let lastChosenWord = -1;

    const userInputSection = document.getElementById("user-input-section");
    const optionsContainer = document.getElementById("options-container");
    const letterContainer = document.getElementById("letter-container");
    const resultText = document.getElementById("result-text");
    const newGameContainer = document.getElementById("new-game-container");
    const canvas = document.getElementById("canvas");
    const welcomeContainer = document.getElementById("welcome-container");
    const gameContainer = document.querySelector(".container");
    const returnGameButton = document.getElementById("returnGameButton");
    const returnGameButton1 = document.getElementById("returnGameButton1");
    const sanat = {
        colors: ['red', 'blue', 'green', 'black', 'orange', 'yellow', 'green', 'white', 'gray', 'pink', 'beige', 'brown', 'purple', 'violet', 'turquoise'],
        animals: ['elephant', 'giraffe', 'lion', 'tiger', 'monkey', 'kangaroo', 'dog', 'cat', 'fish', 'rabbit', 'hamster', 'pigeon', 'crow', 'owl', 'eagle', 'cow', 'sheep', 'pig', 'horse', 'chicken', 'rooster', 'ant', 'fly', 'spider', 'bee', 'wasp', 'butterfly', 'frog', 'budgie', 'lizard', 'parrot', 'tortoise', 'snake', 'cheetah', 'zebra', 'gorilla', 'panda', 'bear', 'wolf', 'fox', 'swan', 'elk', 'squirrel', 'magpie', 'reindeer', 'snail', 'bird', 'worm', 'deer', 'rat', 'mouse', 'duck', 'penguin', 'bat', 'polar bear', 'hippo'],
        groceries: ['soda', 'candyfloss', 'bacon', 'beef', 'chicken', 'ham', 'lamb', 'salami', 'sausages', 'pork', 'turkey', 'apple', 'apricot', 'banana', 'blackberry', 'blackcurrant', 'blueberry', 'cherry', 'coconut', 'fig', 'gooseberry', 'grape', 'grape', 'kiwi fruit', 'lemon', 'lime', 'mango', 'melon', 'orange', 'peach', 'pear', 'pineapple', 'plum', 'pomegranate', 'raspberry', 'rhubarb', 'strawberry', 'anchovy', 'cod', 'herring', 'mackerel', 'sardine', 'salmon', 'trout', 'tuna', 'artichoke', 'asparagus', 'eggplant', 'avocado', 'beetroot', 'broccoli', 'cabbage', 'carrot', 'cauliflower', 'celery', 'courgette', 'cucumber', 'garlic', 'ginger', 'leek', 'lettuce', 'mushroom', 'onion', 'peas', 'pepper', 'potato', 'pumpkin', 'radish', 'arugula', 'swede', 'sweet potato', 'corn', 'tomato', 'turnip', 'spinach', 'spring onion', 'soup', 'chips', 'fish fingers', 'pizza', 'ice cream', 'butter', 'cream', 'cheese', 'egg', 'margarine', 'milk', 'yoghurt', 'baguette', 'bread rolls', 'bread', 'cake', 'Danish pastry', 'sugar', 'icing sugar', 'pepper', 'salt', 'pastry', 'yeast', 'raisin', 'honey', 'jam', 'marmalade', 'muesli', 'porridge', 'toast', 'noodles', 'pasta', 'rice', 'spaghetti', 'ketchup', 'mayonnaise', 'mustard', 'vinegar', 'biscuit', 'chocolate', 'crisps', 'peanut', 'sweets', 'walnuts', 'basil', 'chives', 'coriander', 'dill', 'parsley', 'rosemary', 'sage', 'thyme', 'cinnamon', 'water'],
        "other things": ["key", "money", "bush", "bracelet", "ring", "necklace", "thermometer", "tree", "earth", "aquarium", "blinds", "lamp switch", "radiator", "door handle", "door knob"],
        "fish and sealife": ["squid", "seal", "sea lion", "salmon", "octopus", "mackerel", "jellyfish", "herring", "eel", "dolphin", "cod", "catfish", "starfish", "sea urchin", "shrimp", "prawn", "oyster", "mussel", "lobster", "crab", "whale", "walrus", "tuna", "trout", "shark"],
        "kitchen items": ["table", "chair", "dishwasher", "cooker", "fridge", "freezer", "microwave", "toaster", "oven", "stove", "sink", "kitchen paper", "draining board", "cookery book", "plastic wrap", "tea pot", "sugar bowl", "plate", "mug", "jar", "glass", "bowl", "cup", "chopsticks", "spoon", "fork", "knife", "whisk", "tray", "kettle", "rolling pin", "mixing bowl", "ladle", "kitchen foil", "juicer", "cheese grater", "frying pan", "carpet", "colander", "chopping board", "bottle opener", "coffee maker", "shelf", "cupboard", "lamp"],
        "living room items": ["sofa", "bookcase", "armchair", "TV", "carpet", "shelf", "dresser", "lamp", "radio"],
        schoolVocabulary: ["marker", "exercise book", "lesson", "homework", "test", "term", "teacher", "pupil", "reading", "writing", "computer room", "changing room", "gymnasium", "playground", "library", "lecture hall", "desk", "locker", "sports hall", "college", "primary school",
            "secondary school", "private school", "boarding school", "vocational school", "art school", "university", "pencil", "student", "course", "subject", "grade", "calculator", "textbook", "question", "answer", "mistake", "correct", "wrong", "laptop", "backpack", "school", "pen", "ruler", "pencil case", "rubber", "notebook", "classroom", "desk", "blackboard", "chalk"],
        clothingAndAccessories: ["swimsuit", "scarf", "nightdress", "jumper", "jacket", "dress", "gloves", "mittens",
            "pyjamas", "underpants", "swimming trunks", "football boots", "underwear", "sweatpants",
            "sweatshirt", "jeans", "skirt", "beanie", "hat", "trousers", "hoodie", "wellies",
            "helmet", "leggings", "sneakers", "cap", "skates", "rollerblades", "boots", "glasses",
            "socks", "shorts", "top", "t-shirt", "flip-flops", "sweater"],
        bathroomItems: ["shower", "bathtub", "sink", "mirror", "tap", "washing machine", "hair dryer", "toothpaste",
            "toothbrush", "comb", "nail polish", "shampoo", "lotion", "conditioner", "deodorant", "hair gel",
            "soap", "lipstick", "lip balm", "towel", "shelf", "plug", "bin", "carpet", "cupboard", "lamp"],  
        vehicles: ["ferry", "campervan", "bus", "car", "caravan", "truck", "moped", "motorcycle", "scooter",
            "taxi", "tractor", "lorry", "van", "boat", "ship", "bicycle", "excavator"],
        humanBody: ["beard", "cheek", "chin", "hair", "head", "ear", "eye", "eyebrow", "eyelash", "eyelid",
            "forehead", "freckles", "lips", "mustache", "mouth", "nose", "tongue", "tooth", "arm",
            "armpit", "back", "chest", "elbow", "hand", "nail", "forearm", "finger", "belly button",
            "neck", "shoulder", "throat", "waist", "wrist", "ankle", "stomach", "shin", "foot", "heel",
            "hip", "knee", "foot", "thigh", "toe"],
        countries: ["United States", "Jamaica", "Argentina", "Brazil", "Israel", "Colombia", "Iraq", "Iran",
            "Saudi Arabia", "Syria", "Turkey", "Africa", "Madagascar", "Kenya", "Egypt", "Algeria",
            "Vietnam", "Australia", "New Zealand", "Thailand", "Philippines", "Malaysia", "Indonesia",
            "Taiwan", "South Korea", "North Korea", "Mongolia", "Japan", "China", "Kazakhstan", "India",
            "Afghanistan", "Denmark", "England", "Estonia", "Finland", "Iceland", "Ireland", "Latvia",
            "Lithuania", "Norway", "Scotland", "Sweden", "United Kingdom", "Wales", "Austria", "Belgium",
            "France", "Germany", "Netherlands", "Switzerland", "Albania", "Croatia", "Cyprus", "Greece",
            "Italy", "Portugal", "Serbia", "Slovenia", "Spain", "Bulgaria", "Czech Republic", "Hungary",
            "Poland", "Romania", "Russia", "Slovakia", "Ukraine", "Canada"],
        languages: ["Slovak", "Russian", "Romanian", "Polish", "Hungarian", "Czech", "Bulgarian", "Spanish",
            "Slovenian", "Serbian", "Portuguese", "Italian", "Greek", "Croatian", "Albanian", "Dutch",
            "French", "German", "Welsh", "Swedish", "Scottish Gaelic", "Norwegian", "Lithuanian", "Latvian",
            "Irish", "Icelandic", "English", "Danish", "Estonian", "Finnish", "Ukrainian", "Persian",
            "Arabic", "Turkish", "Malagasy", "Swahili", "Vietnamese", "Thai", "Filipino", "Malay",
            "Indonesian", "Korean", "Mongolian", "Japanese", "Chinese", "Kazakh", "Hindi", "Pashto"],
        "bedroom items": ["bed", "wardrobe", "mattress", "pillow", "sheet", "carpet", "shelf", "dresser", "cupboard", "lamp", "alarm clock"],
        "musical instruments": ["piano", "banjo", "cello", "guitar", "violin", "trumpet", "tuba", "bagpipes",  "clarinet", "flute", "drums", "drum set"],
        "decoration items": [
            "lamp", "carpet", "calendar", "hanger", "painting", "vase", "plant", "candle", 
            "tablecloth", "curtains", "pillow", "pillow case", "shelf", "poster", "picture", 
            "lampshade", "houseplant", "record player", "doormat"],
        "places": ["house", "art gallery", "bank", "bar", "cafe", "cathedral", "church", "cinema", 
            "concert hall", "dentists", "fire station", "garage", "gym", "health center", 
            "hospital", "hotel", "sports center", "library", "museum", "petrol station", 
            "police station", "post office", "restaurant", "school", "shopping center", 
            "skyscraper", "swimming hall", "theater", "town hall", "vet", "summer cottage", 
            "bowling alley", "house", "bus station", "cemetery", "marketplace", "park", 
            "skate park", "stadium", "train station", "zoo", "beach"],
        months: [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        seasons: ["spring", "summer", "autumn", "winter"],
        "days of the week": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "the rooms": ["bedroom", "living room", "bathroom", "toilet", "kitchen", "hall", "closet", "garage", "hall"],
        numbers: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", 
            "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", 
            "eighteen", "nineteen", "twenty", "twenty-one", "zero", "thirty", "forty", 
            "fifty", "sixty", "seventy", "eighty", "ninety", "hundred", "thousand"],
        "ordinal numbers": ["the first", "the second", "the third", "the fourth", "the fifth", "the sixth", 
            "the seventh", "the eighth", "the ninth", "the tenth", "the eleventh", "the twelfth", "the thirteenth", "the fourteenth", "the fifteenth", "the sixteenth", "the seventeenth", "the eighteenth", "the nineteenth", 
            "the twentieth", "the twenty-first", "the thirtieth", "the fortieth", "the fiftieth", "the sixtieth", "the seventieth", "the eightieth", "the ninetieth", "the hundredth", "the thousandth"],
        "free time items": ["speakers", "phone", "headphones", "flashlight", "games console", "DVD player", "CD player", "Blu-ray player"],
        "cleaning equipment": ["vacuum cleaner", "sponge", "mop", "ironing board", "iron", "broom", "bucket"],
        sports: ["wrestling", "weightlifting", "walking", "volleyball", "tennis", 
            "swimming", "snowboarding", "skiing", "skateboarding", "scuba diving", 
            "sailing", "running", "rowing", "mountain climbing", "motorsport", "karate", "judo", "jogging", "ice skating", "ice hockey", "riding", 
            "hiking", "handball", "gymnastics", "golf", "football", "fishing", "diving", "cycling", "climbing", "canoeing", "boxing", "basketball", 
            "badminton", "baseball", "athletics", "American football"],
        "holiday vocabulary": ["hair brush", "camera", "sea", "sun", "snorkeling", "tourist", "ticket", "passport", "souvenir", "sun lotion", "sightseeing", 
            "relaxation", "travel", "destination", "hotel", "resort", "sunglasses", "towel", "flip-flops"],
        "office supplies": ["screen", "keyboard", "mouse", "charger", "computer", "tablet"],
        sickness: ["cough", "cold", "temperature", "tummy ache", "headache", "toothache", "earache", "sore throat", "broken leg"],
        "school subjects": ["art", "biology", "chemistry", "crafts", "maths", "music", "PE", "physics", "history", "geography"],
    };

    const initializer = () => {
        winCount = 0;
        count = 0;
        categorySelected = false;

        let keyboardButtons = document.querySelectorAll(".letters");
        keyboardButtons.forEach((button) => {
            button.disabled = false;
            button.addEventListener("click", () => {
                handleKeyboardButtonClick(button.innerText);
                window.location.href = "h.html";
            });
        });

        document.addEventListener("keydown", (event) => {
            const pressedKey = event.key.toUpperCase();
            if (/^[A-Z]$/.test(pressedKey)) {
                handleKeyPress(pressedKey);
            }
        });

        userInputSection.innerHTML = "";
        optionsContainer.innerHTML = "";
        letterContainer.classList.add("hide");
        newGameContainer.classList.add("hide");
        letterContainer.innerHTML = "";

        guessedLetters.clear();
        wrongGuessedLetters.clear();
        wrongLetters = [];
        updateWrongLetters();

        displayOptions();
        let { initialDrawing } = canvasCreator();
        initialDrawing();

        resetLetterButtons();
        activateLetterButtons(categorySelected);

        document.removeEventListener("keydown", handleKeyDown);
        document.addEventListener("keydown", handleKeyDown);

        originalDisplayItem = "";
    };

    const newGameButton = document.getElementById("newGameButton");
    const nextGameButton = document.getElementById("nextGameButton");

    newGameButton.addEventListener("click", () => {
        resetGuessedLetters();
        resetGame();
    });

    nextGameButton.addEventListener("click", () => {
        resetGuessedLetters();
        generateWordForNextGame();
    });

    const generateWordForNextGame = () => {
        if (!categorySelected) {
            return;
        }

        letterContainer.innerHTML = "";
        newGameContainer.classList.add("hide");
        resultText.innerHTML = "";

        let optionArray = sanat[getCurrentCategory()];
        let availableWords = optionArray.filter(word => word !== lastChosenWord);
        if (availableWords.length === 0) {
            availableWords = optionArray.slice();
        }
        let randomIndex = Math.floor(Math.random() * availableWords.length);
        chosenWord = availableWords[randomIndex].toUpperCase();
        lastChosenWord = chosenWord;


        dashes = document.getElementsByClassName("dashes");
        originalDisplayItem = chosenWord.replace(/./g, (char) => {
            if (char === "-") {
                return '<span class="dashes">-</span>';
            } else if (char === " ") {
                return '<span class="dashes space">&nbsp;</span>';
            } else {
                return '<span class="dashes">_</span>';
            }
        });

        userInputSection.innerHTML = originalDisplayItem;

        count = 0;
        winCount = 0;
        wrongLetters = [];
        guessedLetters.clear();
        wrongGuessedLetters.clear();
        updateWrongLetters();

        let { initialDrawing } = canvasCreator();
        initialDrawing();

        resetLetterButtons();
        activateLetterButtons(true);
    };

    const getCurrentCategory = () => {
        const activeCategoryButton = document.querySelector(".options.active");
        return activeCategoryButton ? activeCategoryButton.innerText.toLowerCase() : "";
    };

    const allowedCategories = [
        "colors", "animals", "groceries",
        "fish and sealife", "kitchen items", "living room items",
        "school vocabulary", "clothing and accessories", "bathroom items",
        "vehicles", "human body", "countries", "languages", "bedroom items",
        "musical instruments", "decoration items", "places",
        "months", "days of the week", "the rooms", "numbers",
        "ordinal numbers", "free time items", "cleaning equipment", "sports",
        "holiday vocabulary", "office supplies", "sickness", "school subjects",
        "other things"
    ];

    const displayOptions = () => {
        let buttonCon = document.createElement("div");
        allowedCategories.forEach((category) => {
            if (sanat.hasOwnProperty(category)) {
                let button = document.createElement("button");
                button.classList.add("options");
                button.innerText = category;
                button.addEventListener("click", () => {
                    generateWord(category);
                });
                buttonCon.appendChild(button);
            }
        });

        optionsContainer.appendChild(buttonCon);
        updateLetterButtons();
    };

    const blocker = () => {
        let optionsButtons = document.querySelectorAll(".options");
        let letterButtons = document.querySelectorAll(".letters");

        optionsButtons.forEach((button) => {
            button.disabled = true;
        });

        letterButtons.forEach((button) => {
            button.disabled = !categorySelected;
        });

        newGameContainer.classList.remove("hide");

        let { initialDrawing } = canvasCreator();
        initialDrawing();
    };

    const selectedCategoryContainer = document.getElementById("selected-category-container");

    const generateWord = (optionValue) => {
        categorySelected = true;
        if (optionValue === "numbers" || optionValue === "ordinal numbers") {
            alert("Kategorioissa käytetään numeroita 0-21, tasa-kymmenlukuja (esim. 30, 40, 50 jne.), 100 sekä 1000.");
        }
        let optionsButtons = document.querySelectorAll(".options");
        optionsButtons.forEach((button) => {
            if (button.innerText.toLowerCase() === optionValue) {
                button.classList.add("active");
            }
            button.disabled = true;
        });

        selectedCategoryContainer.innerText = `Category: ${optionValue.charAt(0).toUpperCase() + optionValue.slice(1)}`;

        welcomeContainer.classList.add("hide");
        gameContainer.classList.remove("hide");

        letterContainer.classList.remove("hide");
        userInputSection.innerText = "";

        let optionArray = sanat[optionValue];
        chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
        chosenWord = chosenWord.toUpperCase();

        dashes = document.getElementsByClassName("dashes");

        originalDisplayItem = chosenWord.replace(/./g, (char) => {
            if (char === "-") {
                return '<span class="dashes">-</span>';
            } else if (char === " ") {
                return '<span class="dashes space">&nbsp;</span>';
            } else {
                return '<span class="dashes">_</span>';
            }
        });

        userInputSection.innerHTML = originalDisplayItem;

        activateLetterButtons(true);
    };

    const canvasCreator = () => {
        let context = canvas.getContext("2d");
        context.beginPath();
        context.strokeStyle = "#000";
        context.lineWidth = 2;

        const drawLine = (fromX, fromY, toX, toY) => {
            context.moveTo(fromX, fromY);
            context.lineTo(toX, toY);
            context.stroke();
        };

        const head = () => {
            context.beginPath();
            context.arc(70, 30, 10, 0, Math.PI * 2, true);
            context.stroke();
        };

        const body = () => {
            drawLine(70, 40, 70, 80);
        };

        const leftArm = () => {
            drawLine(70, 50, 50, 70);
        };

        const rightArm = () => {
            drawLine(70, 50, 90, 70);
        };

        const leftLeg = () => {
            drawLine(70, 80, 50, 110);
        };

        const rightLeg = () => {
            drawLine(70, 80, 90, 110);
        };

        const initialDrawing = () => {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            drawLine(10, 130, 130, 130);
            drawLine(10, 10, 10, 131);
            drawLine(10, 10, 70, 10);
            drawLine(70, 10, 70, 20);
        };

        return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
    };

    const drawMan = (count) => {
        let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
        switch (count) {
            case 1:
                head();
                break;
            case 2:
                body();
                break;
            case 3:
                leftArm();
                break;
            case 4:
                rightArm();
                break;
            case 5:
                leftLeg();
                break;
            case 6:
                rightLeg();
                break;
            default:
                break;
        }
    };

    const handleKeyPress = (pressedKey) => {
        if (!categorySelected || resultText.innerHTML.includes("You Win") || resultText.innerHTML.includes("You Lose")) {
            return;
        }

        let charArray = chosenWord.split("");
        let dashes = document.getElementsByClassName("dashes");

        if (guessedLetters.has(pressedKey) || wrongGuessedLetters.has(pressedKey)) {
            return;
        }

        if (resultText.innerHTML.includes("You Win") || resultText.innerHTML.includes("You Lose")) {
            activateLetterButtons(false);

            updateLetterButtons();

            return;
        }

        guessedLetters.add(pressedKey);

        let correctGuess = false;
        charArray.forEach((char, index) => {
            if (char === pressedKey && dashes[index].innerText === '_') {
                dashes[index].innerText = pressedKey.toLowerCase();
                correctGuess = true;
            }
        });

        if (Array.from(dashes).every(span => span.innerText !== '_')) {
            resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
            blocker();
            activateLetterButtons(false); 

            updateLetterButtons();
        } else if (!correctGuess) {
            wrongGuessedLetters.add(pressedKey);

            count += 1;
            drawMan(count);

            if (count === 6) {
                resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                blocker();
                activateLetterButtons(false); 

                updateLetterButtons();
            } else {
                wrongLetters.push(pressedKey);
                updateWrongLetters();
            }
        }
        updateLetterButtons();
    };

    const handleKeyDown = (event) => {
        const pressedKey = event.key.toUpperCase();
        if (/^[A-Z]$/.test(pressedKey)) {
            handleKeyPress(pressedKey);
        }
    };

    const resetGame = () => {
        winCount = 0;
        count = 0;
        categorySelected = false;

        userInputSection.innerHTML = "";
        optionsContainer.innerHTML = "";
        letterContainer.classList.add("hide");
        newGameContainer.classList.add("hide");
        letterContainer.innerHTML = "";

        guessedLetters.clear();
        wrongGuessedLetters.clear();
        wrongLetters = [];
        updateWrongLetters();

        resultText.innerHTML = "";

        displayOptions();
        let { initialDrawing } = canvasCreator();
        initialDrawing();

        document.getElementById("welcome-container").classList.remove("hide");
        document.querySelector(".container").classList.add("hide");

        letterButtons = [];
        resetLetterButtons();

        ResettingGame = true;

        activateLetterButtons(true); 
        ResettingGame = false; 

        dashes = document.getElementsByClassName("dashes");
        originalDisplayItem = chosenWord.replace(/./g, (char, index) => {
            if (char === "-") {
                return '<span class="dashes">-</span>';
            } else if (char === " ") {
                return '<span class="dashes space">&nbsp;</span>';
            } else {
                return `<span class="dashes">${guessedLetters.has(char) ? char : "_"}</span>`;
            }
        });

        userInputSection.innerHTML = originalDisplayItem;
    };

    const handleKeyboardButtonClick = (letter) => {
        let charArray = chosenWord.split("");
        let dashes = document.getElementsByClassName("dashes");

        if (charArray.includes(letter)) {
            charArray.forEach((char, index) => {
                if (char === letter) {
                    dashes[index].innerText = char;
                    winCount += 1;

                    if (winCount == charArray.length) {
                        resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                        blocker();
                    }
                }
            });
        } else {
            count += 1;
            drawMan(count);

            if (count == 6) {
                resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                blocker();
            }
        }

        let keyboardButtons = document.querySelectorAll(".letters");
        keyboardButtons.forEach((button) => {
            if (button.innerText === letter) {
                button.disabled = true;
            }
        });
    };

    const resetLetterButtons = () => {
        letterContainer.innerHTML = "";
        letterButtons = [];

        for (let i = 65; i < 91; i++) {
            let button = document.createElement("button");
            button.classList.add("letters");
            button.innerText = String.fromCharCode(i);

            letterButtons.push(button);
            letterContainer.append(button);

            button.disabled = !categorySelected || guessedLetters.has(button.innerText);

            button.removeEventListener("click", handleLetterButtonClick);

            button.addEventListener("click", handleLetterButtonClick);
        }
    };

    const updateLetterButtons = () => {
        letterContainer.innerHTML = "";
        resetLetterButtons();
    };

    const activateLetterButtons = (activate) => {
        if (!categorySelected || resultText.innerHTML.includes("You Win") || resultText.innerHTML.includes("You Lose")) {
            letterButtons.forEach(button => {
                button.disabled = true;
            });
            newGameButton.disabled = false; 
        } else {
            letterButtons.forEach(button => {
                button.disabled = !activate || guessedLetters.has(button.innerText);
            });
            newGameButton.disabled = activate; 
        }
    };

    const handleLetterButtonClick = (event) => {
        const pressedKey = event.target.innerText;
        handleKeyPress(pressedKey);
    };

    const resetGuessedLetters = () => {
        guessedLetters = new Set();
        wrongGuessedLetters = new Set();
    };

    const updateWrongLetters = () => {
        const wrongLettersContainer = document.getElementById("wrong-letters-container");
        wrongLettersContainer.innerHTML = `<p>Wrong Letters: ${wrongLetters.join(', ')}</p>`;
    };
    newGameButton.addEventListener("click", initializer);
    window.onbeforeunload = function () {
        
    };
    returnGameButton.addEventListener("click", () => {
       
        window.location.href = "../index.html";
    });
    returnGameButton1.addEventListener("click", () => {
       
        window.location.href = "../index.html";
    });

    initializer(); 
});
