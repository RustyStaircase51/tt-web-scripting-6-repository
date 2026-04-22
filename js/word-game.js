// Creates game object
const game = {
  targetWord: null,
  currentRow: 0,
  currentCol: 0,
  guesses: ["","","","","",""],
  checked: [false, false, false, false, false, false],
  state: "playing",
};

document.getElementById("resetBtn").addEventListener("click", resetGame);

function resetGame() {
    game.targetWord = null
    game.currentRow = 0
    game.currentCol = 0
    game.guesses = ["","","","","",""]
    game.checked = [false, false, false, false, false, false]
    game.state = "playing"
	
    generateRandomWord();
	console.log(game.targetWord)
	
	document.getElementById("status").textContent = "";
	renderGame();
	document.activeElement.blur()
}



//Listens for keyboard
document.addEventListener("keydown", (event) => {
// logic layer		
	if (game.state !== "playing") {
		return;
	}
	
	const key = event.key.toUpperCase();
		processInput(key);
		renderGame();
	});

//Creates the targetWord
function generateRandomWord() {
//logic layer
	const words = [ "PIXIE", "TALES", "FABLE", "BARDS" , "MUSIC", "BOONS", "CLOAK", "JUICE", "WOOZY", "ANGEL", "MAGIC", "RUNES" ]
    const randomIndex = Math.floor(Math.random() * words.length);

    game.targetWord = words[randomIndex];
	
}

generateRandomWord();
console.log(game.targetWord)


//Adds the (valid) letter, handles backspaces, and handles enter
function processInput(key) {
// logic layer
	if (key.length === 1 && key >= "A" && key <= "Z") {
		if (game.guesses[game.currentRow].length < 5) {
			game.guesses[game.currentRow] += key;
			game.currentCol++;
			console.log(key)
		}
	}
	
	else if (key === "BACKSPACE") {
		if (game.guesses[game.currentRow].length > 0) {
			game.guesses[game.currentRow] = game.guesses[game.currentRow].slice(0, -1);
			if (game.currentCol !== 0) {
				game.currentCol--;
			}
			console.log(key)
		}
	}
	
	else if(key === "ENTER") {
		if (game.guesses[game.currentRow].length === 5) {
			game.checked[game.currentRow] = true;
			checkGuess();
			console.log(key)
		}
	}
};

//Updates the game.state or advances you to the next row
function checkGuess() {
//logic layer	
	const guess = game.guesses[game.currentRow];
	
	
	if (guess === game.targetWord) {
		game.state = "win";
	}
	else if (game.currentRow === 5) {
		game.state = "lose";
	}
	else {
		game.currentRow++;
		game.currentCol = 0;
	}
}



//Prints if you win or lost to the status
function updateGame() {
//UI layer
	const status = document.getElementById("status");

    if (game.state === "win") {
        status.textContent = "WINNER!";
    } 
	else if (game.state === "lose") {
        status.textContent = `YOU LOST! THE WORD WAS ${game.targetWord}`;
	}
};





//Handles changing the color of squares for the user
function renderGame() {
//UI layer   
   const squares = document.querySelectorAll(".square");
   
    for (let row = 0; row < 6; row++) {
	   const guess = game.guesses[row];
	   
	for (let col = 0; col < 5; col++) {
		const index = row * 5 + col;
		const square = squares[index];
		const letter = guess[col];
		 square.textContent = letter ? letter : "";

            
            square.classList.remove("correct", "somewhere", "none");
		
            if (game.checked[row]) {
                const targetLetter = game.targetWord[col];

                if (letter === targetLetter) {
                    square.classList.add("correct");
                } 
                else if (game.targetWord.includes(letter)) {
                    square.classList.add("somewhere");
                } 
                else {
                    square.classList.add("none");
				}		
			}
		}	
	}
	
	updateGame();
}
   
   