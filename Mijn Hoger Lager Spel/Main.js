//This adds an event listener that waits for the entire HTML document to be fully loaded and parsed before executing the function. This ensures that all elements are available to interact with.
document.addEventListener('DOMContentLoaded', function() {
    //This selects the first dice element for the computer (the one showing one) using its class name and stores it in the computerDiceOne variable.
    const computerDiceOne = document.querySelector('.computer-dice-one');
    //This selects the second dice element for the computer (the one showing two).
    const computerDiceTwo = document.querySelector('.computer-dice-two');
    const playerDiceOne = document.querySelector('.player-dice-one');
    const playerDiceTwo = document.querySelector('.player-dice-two');
    const computerCreditsElement = document.querySelector('.computer-credits');
    const playerCreditsElement = document.querySelector('.player-credits');
    const rollButton = document.querySelector('.dice-button');
    const higherButton = document.querySelector('.higher-button');
    const lowerButton = document.querySelector('.lower-button');
    const messageElement = document.querySelector('.message1');
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
    }
 
    // Function to get the correct Unicode for the dice face (1-6)
    function getDiceUnicode(diceValue) {
        const unicodeStart = 9855; // The Unicode for ⚀ is 9856, so 9855 + diceValue gives the correct character
        return `&#${unicodeStart + diceValue};`;
    }
 
    // Event listeners for buttons
    rollButton.addEventListener('click', function() {
        updateDice();
        messageElement.textContent = 'Make a guess! Choose Higher or Lower.';
    });
 
    higherButton.addEventListener('click', function() {
        if (playerTotal > computerTotal) {
            playerCredits += 1;
            messageElement.textContent = 'Correct! Player wins!';
        } else {
            computerCredits += 1;
            messageElement.textContent = 'Wrong! Computer wins!';
        }
        updateCredits();
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
    });
 
    // Function to update the credits display
    function updateCredits() {
        computerCreditsElement.textContent = computerCredits;
        playerCreditsElement.textContent = playerCredits;
    }
});