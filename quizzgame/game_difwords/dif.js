document.addEventListener("DOMContentLoaded", function() {
    const categorySelect = document.getElementById("category-select");
    const goToEtusivuButton = document.getElementById('page');
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const categoryMenuButton = document.getElementById('category-menu-btn');
    const questionContainerElement = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    let shuffledQuestions, currentQuestionIndex;
    const categories = Object.keys(sanat);
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
    });

    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });

    categoryMenuButton.addEventListener('click', toggleCategoryMenu);
    goToEtusivuButton.addEventListener('click', goToEtusivu);

    function startGame() {
        startButton.classList.add('hide');
        categoryMenuButton.classList.remove('hide');
        questionContainerElement.classList.remove('hide');
        document.getElementById('category-select-container').style.display = 'none';
        shuffledQuestions = getQuestionsFromCategory().sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
        setNextQuestion();
    }

    function toggleCategoryMenu() {
        questionContainerElement.classList.toggle('hide');
        startButton.classList.toggle('hide');
        categoryMenuButton.classList.toggle('hide'); 
        const categorySelectContainer = document.getElementById('category-select-container');
        categorySelectContainer.style.display = categorySelectContainer.style.display === 'none' ? 'block' : 'none';
        if (!questionContainerElement.classList.contains('hide')) {
            categorySelect.value = ''; 
        }
    }

    function setNextQuestion() {
        clearStatusClass(document.body);
        if (currentQuestionIndex === shuffledQuestions.length) {
            shuffledQuestions = shuffledQuestions.sort(() => Math.random() - 0.5);
            currentQuestionIndex = 0;
        }
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        currentQuestionIndex++;
    }

    function showQuestion(question) {
        questionElement.innerHTML = question.question;
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
            setTimeout(() => {
                setNextQuestion();
            }, 1000); 
        } else {
            setTimeout(() => {
                setNextQuestion();
            }, 1500); 
        }
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
            const question = {
                question: `Translate <span id="translation" style="font-size: 24px;">${word.suomeksi}</span> into English.`,
                answers: [
                    { text: word.englanniksi, correct: true },
                    ...getRandomOptions(word.englanniksi, selectedCategory) 
                ]
            };
            questions.push(question);
        });
        return questions;
    }    
    
    function goToEtusivu() {
        window.location.href = "../etusivu.html";
    }
    
    function getRandomOptions(correctOption, selectedCategory) {
        const categoryWords = sanat[selectedCategory].map(word => word.englanniksi);
        const uniqueOptions = Array.from(new Set(categoryWords.filter(option => option !== correctOption)));
        return uniqueOptions.sort(() => Math.random() - .5).slice(0, 3).map(option => ({ text: option, correct: false }));
    }    
});