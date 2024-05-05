document.addEventListener("DOMContentLoaded", async () => {
    const pauseOverlayButtons = document.querySelectorAll('.overlay-content>button');
    pauseOverlayButtons.forEach(button => button.addEventListener('click', handleButtonClick));
    const categorySelect = document.getElementById("category-select");
    const categories = Object.keys(sanat);
    let currentTime = 5;
    let clockInterval;
    let score = 0;
    let isGameRunning = false;
    const startButton = document.getElementById('start-btn');
    const questionContainerElement = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const clockElement = document.getElementById('clock');
    const pauseButton = document.getElementById('pause-btn');
    pauseButton.addEventListener('click', pause);
    const newGameButton = document.getElementById('new-game-btn');
    newGameButton.addEventListener('click', startNewGame);
    const goToEtusivuButton = document.getElementById('page');
    goToEtusivuButton.addEventListener('click', goToEtusivu);
    const goToEtusivuButton1 = document.getElementById('page1');
    goToEtusivuButton1.addEventListener('click', goToEtusivu);

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
    });

    let shuffledQuestions;

    startButton.addEventListener('click', startGame);

    function startGame() {
        isGameRunning = true;
        startButton.classList.add('hide');
        questionContainerElement.classList.remove('hide');
        document.getElementById('category-select-container').style.display = 'none';
        shuffledQuestions = getQuestionsFromCategory().sort(() => Math.random() - .5); 
        currentQuestionIndex = 0;
        setNextQuestion();
        startTimer();
        clockElement.classList.remove('hide');
        goToEtusivuButton.classList.add('hide');
    }
    
    function startTimer(initialTime = 5) {
        clearInterval(clockInterval);
        currentTime = initialTime;
        clockElement.textContent = padTime(currentTime);
        clockInterval = setInterval(updateClock, 1000);
    }
    
    function updateClock() {
        if (currentTime > 0) {
            currentTime--;
            clockElement.textContent = padTime(currentTime);
        } else {
            clearInterval(clockInterval); 
            showLoseScreen(); 
        }
    }
    
    function padTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    function startNewGame() {
        isGameRunning = true;
        score = 0;
        currentQuestionIndex = 0;
        shuffledQuestions = getQuestionsFromCategory().sort(() => Math.random() - .5);
        setNextQuestion();
        startTimer();
        clockElement.classList.remove('hide');
        newGameButton.classList.add('hide');
        pauseButton.classList.remove('hide'); 
        goToEtusivuButton.classList.add('hide');
    }
    
    function setNextQuestion() {
        clearStatusClass(document.body);
        if (currentQuestionIndex === shuffledQuestions.length) {
            shuffledQuestions = shuffledQuestions.sort(() => Math.random() - 0.5);
            currentQuestionIndex = 0;
        }
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        currentQuestionIndex++;
        updateScoreDisplay();
    }
    
    function showQuestion(question) {
        startTimer();
        questionElement.innerHTML = '';
        questionElement.appendChild(document.createTextNode(question.question));
        questionElement.appendChild(question.translatedWord);
        questionElement.appendChild(document.createTextNode(question.intoEnglish));
        let answers = question.answers.slice();
        answers = shuffleAnswers(answers);
        answerButtonsElement.innerHTML = '';
        answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }  

    function shuffleAnswers(answers) {
        const correctAnswers = answers.filter(answer => answer.correct);
        const incorrectAnswers = answers.filter(answer => !answer.correct);

        incorrectAnswers.sort(() => Math.random() - 0.5);

        const randomIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));
        incorrectAnswers.splice(randomIndex, 0, ...correctAnswers);

        return incorrectAnswers;
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        setStatusClass(document.body, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
        if (correct) {
            score++; 
            clearInterval(clockInterval);
            setTimeout(() => {
                currentQuestionIndex++;
                setNextQuestion();
                startTimer();
            }, 1000);
        } else {
            clearInterval(clockInterval);
            showLoseScreen();
        }
    }

    function showLoseScreen() {
        isGameRunning = false;
        goToEtusivuButton.classList.remove('hide');
        questionElement.innerHTML = "<h2 id='lose-message'>You Lose!</h2>";
        answerButtonsElement.innerHTML = '';
        clockElement.classList.add('hide');
        document.getElementById('new-game-btn').classList.remove('hide'); 
        pauseButton.classList.add('hide'); 
        const loseMessage = document.getElementById('lose-message');
        loseMessage.style.fontSize = '24px';
        loseMessage.style.marginBottom = '10px';
        const loseScreenScore = document.getElementById('score');
        loseScreenScore.classList.add('lose-screen-score');
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function getQuestionsFromCategory() {
        const selectedCategory = categorySelect.value;
        const categoryWords = sanat[selectedCategory];
        const questions = [];
        categoryWords.forEach(word => {
            const translatedWord = document.createElement('span');
            translatedWord.textContent = word.suomeksi;
            translatedWord.style.fontSize = '24px';
    
            const question = {
                question: 'Translate ',
                translatedWord: translatedWord,
                intoEnglish: ' into English.',
                answers: [
                    { text: word.englanniksi, correct: true },
                    ...getRandomOptions(word.englanniksi)
                ]
            };
            questions.push(question);
        });
    
        return questions;
    }

    function getRandomOptions(correctOption) {
        const allOptions = Object.values(sanat).flat().map(word => word.englanniksi);
        const uniqueOptions = Array.from(new Set(allOptions.filter(option => option !== correctOption)));
        return uniqueOptions.sort(() => Math.random() - .5).slice(0, 3).map(option => ({ text: option, correct: false }));
    }

    function pause() {
        isGameRunning = false;
        goToEtusivuButton1.classList.remove('hide');
        document.getElementById("pauseOverlay").style.display = "block";
        clearInterval(clockInterval);
        localStorage.setItem('pausedTime', currentTime);
        goToEtusivuButton.classList.add('hide');
    }
    
    function continueGame() {
        const pausedTime = parseInt(localStorage.getItem('pausedTime')) || 5;
        document.getElementById("pauseOverlay").style.display = "none";
        startTimer(pausedTime);
    }
    
    function changeCategory() {
        score = 0; 
        currentQuestionIndex = 0;
        clearInterval(clockInterval);
        document.getElementById("pauseOverlay").style.display = "none";
        document.getElementById('category-select-container').style.display = 'block';
        document.getElementById('question-container').classList.add('hide');
        document.getElementById('start-btn').classList.remove('hide');
    }

    function updateScoreDisplay() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
        scoreElement.classList.remove('lose-screen-score'); 
    }
    }

    function goToEtusivu() {
        if (!isGameRunning) {
        window.location.href = "../etusivu.html";
        }
    }

    function handleButtonClick(event) {
        const buttonId = event.target.id;
        switch (buttonId) {
            case 'continue-btn':
                continueGame();
                break;
            case 'change-category-btn':
                changeCategory();
                break;
            default:
                break;
        }
    }
});