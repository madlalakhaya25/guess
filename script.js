function playSound(soundId) {
    const sound = new Audio(soundId + ".mp3");
    sound.currentTime = 0;
    sound.play();
}

function provideFeedback(message, color) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.style.color = color;
}

function generateHint(secretNumber) {
    const isEven = secretNumber % 2 === 0;
    if (isEven) {
        return "Hint: The number is even.";
    } else {
        return "Hint: The number is odd.";
    }
}

function startGame() {
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let countdown;

    const gameDiv = document.getElementById("game-container");
    const guessInput = document.getElementById("guess-input");
    const submitButton = document.getElementById("submit-button");
    const hintButton = document.getElementById("hint-button");

    hintButton.addEventListener("click", function () {
        const hintMessage = generateHint(secretNumber);
        provideFeedback(hintMessage, "blue");
    });

    submitButton.addEventListener("click", function () {
        const userGuess = parseInt(guessInput.value);
        attempts++;

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            provideFeedback("Please enter a valid number between 1 and 100.", "red");
            playSound("wrong-sound");
        } else if (userGuess < secretNumber) {
            provideFeedback(`Too low! Attempts left: ${10 - attempts}`, "red");
            playSound("wrong-sound");
        } else if (userGuess > secretNumber) {
            provideFeedback(`Too high! Attempts left: ${10 - attempts}`, "red");
            playSound("wrong-sound");
        } else {
            clearInterval(countdown);
            provideFeedback(`Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts.`, "green");
            playSound("correct-sound");
        }
    });

    countdown = setInterval(function () {
        provideFeedback(`Time left: ${(10 - attempts)} attempts`, "red");
        if (attempts >= 10) {
            clearInterval(countdown);
            provideFeedback(`Sorry, you're out of attempts! The number was ${secretNumber}.`, "red");
            playSound("wrong-sound");
        }
    }, 10000); // Countdown for 10 seconds per attempt
}

startGame();
