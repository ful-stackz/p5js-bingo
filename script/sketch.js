function setup() {
	// Load the necassary dom elements into comfortable global variables
	LoadElements();
	// Set the visual data containers to empty texts
	ResetUI();

	gameSetup = true; // Game is to be initially drawn, but
	gameRunning = false; // Game is not to run unless the user clicks start

	// Create canvas and calculate the field's size
	CreateCanvas();
	
	// Null all global variables
	ResetGlobalVariables();

	// Define the possible numbers for each row
	var numbersRow = {
		0: FillNumbers(1, 15),
		1: FillNumbers(16, 30),
		2: FillNumbers(31, 45),
		3: FillNumbers(46, 60),
		4: FillNumbers(61, 75)
	};

	// Make the grid.fields a 2D array
	grid.Make2D();	

	// Make new field instances
	var fieldId = 1; // Each field has a unique id (1 - 25)
	for (var col = 0; col < 5; col++) {
		for (var row = 0; row < 5; row++) {
			var _number = random(numbersRow[col]); // Pick new random number for this column
			numbersRow[col].splice(numbersRow[col].indexOf(_number), 1); // Remove picked number from available
			grid.fields[col][row] = new Field(_number, fieldId, col, row); // Create new field instance
			fieldId++; // Prepare for next field instance
		}
	}

	// Make the center field marked, just like in real bingo
	MarkField(2, 2);

	// Seed the @unpickedNumbers array with all possible numbers for picking
	unpickedNumbers = FillNumbers(1, 75);
}

function draw() {
	// If the game needs initial draw, that's the func
	if (gameSetup) {
		// Display the grid
		grid.Draw();
		// Game is set
		gameSetup = false;
	}

	// If game is not running don't do anything
	if (!gameRunning) return;

	// If the max number of numbers is picked and time's over => game over
	if (pickedNumbers.length >= maximumPicks && timer.lastPick + timer.interval < millis()) {
		ChangeInfoText("Game over! No bingo :(", false);
		gameRunning = false;
		gameStopped = true;
		return;
	}

	// If it is time to pick then pick a number
	if (timer.lastPick + timer.interval < millis()) PickNumber();

	// Show the time remaining until the next pick
	var timeInfoText = (pickedNumbers.length == maximumPicks) ? "Game ends in " : "Next pick in ";
	ChangeInfoText(timeInfoText);

	// If there is a number picked, show it
	if (lastPickedNumber) lastPickContainer.html(lastPickedNumber, false);

	// If there are numbers picked show them
	// and how many are picked out of max
	if (pickedNumbers) {
		totalPicksContainer.html(pickedNumbers.length + '/' + maximumPicks, false);
		pickedNumbersContainer.html(ArrayToText(pickedNumbers), false);
	}

	// Display the grid
	grid.Draw();

	// Check for bingo and stop the game
	if (gotBingo) {
		DrawBingo();
		gameRunning = false;
	}
}

function mouseClicked() {
	var row = floor(mouseX / fieldSize); // Mouse position x to grid row
	var col = floor(mouseY / fieldSize); // Mouse position y to grid column
	if (![0, 1, 2, 3, 4].includes(row) || ![0, 1, 2, 3, 4].includes(col)) return;
	if (pickedNumbers.includes(grid.fields[row][col].value)) {
		MarkField(row, col, true);
		CheckBingo();
	}
}

function windowResized() {
	// ResizeCanvas(); // Not working properly
}