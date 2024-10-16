document.addEventListener('DOMContentLoaded', function() {
    // Selecting elements
    const computerDiceOne = document.querySelector('.computer-dice-one');
    const computerDiceTwo = document.querySelector('.computer-dice-two');
    const playerDiceOne = document.querySelector('.player-dice-one');
    const playerDiceTwo = document.querySelector('.player-dice-two');
    const computerCreditsElement = document.querySelector('.computer-credits');
    const playerCreditsElement = document.querySelector('.player-credits');
    const rollButton = document.querySelector('.dice-button');
    const higherButton = document.querySelector('.higher-button');
    const lowerButton = document.querySelector('.lower-button');
    const messageElement = document.querySelector('.message1');
    const goButton = document.querySelector('.go-button')

    let computerCredits = 0;
    let playerCredits = 0;
    let computerTotal = 0;
    let playerTotal = 0;

    // Roll dice function (returns a random value between 1 and 6)
    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    // Function to update the dice visuals and calculate totals
    function updateDice() {
        const computerDice1 = rollDice();
        const computerDice2 = rollDice();
        const playerDice1 = rollDice();
        const playerDice2 = rollDice();
        computerTotal = computerDice1 + computerDice2;
        playerTotal = playerDice1 + playerDice2;

        // Use Unicode characters to display dice
        computerDiceOne.innerHTML = getDiceUnicode(computerDice1);
        computerDiceTwo.innerHTML = getDiceUnicode(computerDice2);
        playerDiceOne.innerHTML = getDiceUnicode(playerDice1);
        playerDiceTwo.innerHTML = getDiceUnicode(playerDice2);

        // Update message with dice totals for clarity
        messageElement.textContent = `Computer Total: ${computerTotal}, Player Total: ${playerTotal}`;

        // Enable the guess buttons after rolling
        higherButton.disabled = false;
        lowerButton.disabled = false;
    }

    // Function to get the correct Unicode for the dice face (1-6)
    function getDiceUnicode(diceValue) {
        const unicodeStart = 9855; // The Unicode for ⚀ is 9856, so 9855 + diceValue gives the correct character
        return `&#${unicodeStart + diceValue};`;
    }

    // Function to update the credits display
    function updateCredits() {
        computerCreditsElement.textContent = `Computer Credits: ${computerCredits}`;
        playerCreditsElement.textContent = `Player Credits: ${playerCredits}`;
    }

    // Event listeners for buttons
    rollButton.addEventListener('click', function() {
        updateDice();
        messageElement.textContent = 'Make a guess! Choose Higher or Lower.';

        // Disable roll button until a guess is made
        rollButton.disabled = true;
    });

    higherButton.addEventListener('click', function() {
        if (playerTotal > computerTotal) {
            playerCredits += 1;
            messageElement.textContent = 'Correct! Player wins!';
        } else if(playerTotal == computerTotal){
            playerCredits += 1;
            computerCredits += 1;
            messageElement.textContent = 'You Bought Win'
        }
        else {
            computerCredits += 1;
            messageElement.textContent = 'Wrong! Computer wins!';
        }
        updateCredits();

        // Enable the roll button again and disable guess buttons
        rollButton.disabled = false;
        higherButton.disabled = true;
        lowerButton.disabled = true;
    });

    lowerButton.addEventListener('click', function() {
        if (playerTotal < computerTotal) {
            playerCredits += 1;
            messageElement.textContent = 'Correct! Player wins!';
        } else {
            computerCredits += 1;
            messageElement.textContent = 'Wrong! Computer wins!';
        }
        updateCredits();

        // Enable the roll button again and disable guess buttons
        rollButton.disabled = false;
        higherButton.disabled = true;
        lowerButton.disabled = true;
    });

    // Initialize the game by disabling guess buttons
    higherButton.disabled = true;
    lowerButton.disabled = true;

    // Initial credits update
    updateCredits();
});
