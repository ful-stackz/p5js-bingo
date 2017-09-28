/* ResetGlobalVariables
 * => Resets all the variables used in the game
 */
function ResetGlobalVariables() {
	pickedNumbers = [];
	unpickedNumbers = [];
	lastPickedNumber = null;
	pickedFields = [];
	timer = new Timer();
	grid = new Grid();
	gotBingo = false;
}

/* CreateCanvas
 * => Creates the canvas and appends it to its designated parent
 */
function CreateCanvas() {
	canvasSize = canvasContainer.size().width;
	canvas = createCanvas(canvasSize, canvasSize);
	canvas.parent(canvasContainer);
	fieldSize = (canvas.size().width - 0) / 5;
}

/* ResizeCanvas
 * => Used when the window is resized
 */
function ResizeCanvas() {
	canvasSize = canvasContainer.size().width;
	resizeCanvas(canvasSize, canvasSize);
	fieldSize = (canvas.size().width - 0) / 5;
}

/* MarkField
 * => Marks a field true
 * @row = row on which the field is
 * @col = column on which the field is
 */
function MarkField(_row, _col) {
	grid.fields[_row][_col].marked = true;
	pickedFields.push(grid.fields[_row][_col].id);
}

/* PickNumber
 * => Picks a random number from the array with unpicked numbers
 */
function PickNumber() {
		lastPickedNumber = random(unpickedNumbers); // Pick new number from the @unpickedNumbers
		pickedNumbers.push(lastPickedNumber); // Add last picked number to @pickedNumbers
		unpickedNumbers.splice(unpickedNumbers.indexOf(lastPickedNumber), 1); // Remove picked number from @unpickedNumbers
		if (pickedNumbers.length == maximumPicks) timer.interval = 10000; // If this was the last number being picked then set the timer to 10 secs
		timer.lastPick = millis(); // Update timer's last pick time
}

/* UserOption_MaxPicks
 * => Reads the user input on number of maximum picks and returns
 * the value he/she chose
 */
function UserOption_MaxPicks() {
	var maxPicks = [select("#picksOption1"), select("#picksOption2"), select("#picksOption3")];
	for (var i = 2; i >= 0; i--) {
		if (maxPicks[i].elt.checked) return int(maxPicks[i].elt.value);
	}
}

/* UserOption_PickInterval
 * => Reads the user input on the picking interval and returns
 * the value he/she chose
 */
function UserOption_PickInterval() {
	var pickIntervals = [select("#timeOption1"), select("#timeOption2"), select("#timeOption3")];
	for (var i = 2; i >= 0; i--) {
		if (pickIntervals[i].elt.checked) return int(pickIntervals[i].elt.value) * 1000;
	}
}

/* StartGame
 * => Sets the options of the game according to the user input,
 * initializes the timer and runs the game
 * If the game has been stopped by the user this function resets the whole canvas
 * and then starts the game according to the user input
 */
function StartGame() {
	if (gameStopped) {
		setup();
	}
	if (!gameRunning) {
		// Set maximum picks
		maximumPicks = UserOption_MaxPicks();
		// Set picking interval
		pickingInterval = UserOption_PickInterval();
		// Initialize timer
		timer.Initialize(pickingInterval);
		// Start game
		gameRunning = true;
		gameStopped = false;
	}
}

/* ArrayToText
 * => Reads a given parameter (@_array) and returns accordingly:
 * 1. If the parameter is empty => returns "-" string
 * 2. If the parameter is an array with 1 element only => return the element
 * 3. If the parameter is a proper array => return the elements neatly formatted in the style:
 * elem1, elem2, elem3
 */
function ArrayToText(_array) {
	if (_array.length == 0) return "-";

	if (_array.length == 1) {
		return _array[0];
	}

	// The array's length is > 1
	var outputString = "";
	for (var i = 0; i < _array.length; i++) {
		outputString += _array[i];
		if (i != _array.length - 1) {
			outputString += ", ";
		}
	}
	return outputString;
}

/* FillNumbers(@min, @max)
 * => Returns an array with sequential numbers from min to max inclusive
 * @min = the first number, inclusive
 * @max = the last number, inclusive
 */
function FillNumbers(min, max) {
	var _nums = []; // temporary holder

	for (var i = min; i <= max; i++) {
		_nums.push(i);
	}

	return _nums;
}

/* CheckBingo
 * => Loops through the combos in @bingoCombos and checks whether the user has a bingo or not
 * and sets the global @gotBingo accordingly
 */
function CheckBingo() {
	for (var combo = 1; combo < 14; combo++) { // Loop through every combo
		for (var i = 0; i < 5; i++) { // Loop through every field in the combo
			if (pickedFields.includes(bingoCombos[combo][i]) == false) { // If that field is not contained in the @pickedFields
				break; // You can't have a bingo from this combo
			} else { // if the field is contained in the @pickedFields
				if (i == 4) { // and this is the last field from combo being checked
					gotBingo = true; // then the this is a bingo!
					return;
				}
			}
		}
	}
}

/* DrawBingo
 * => Executes an order of commands to show the user that he has a bingo
 */
function DrawBingo() {
	ChangeInfoText("Bingo! You win!", false);
}

/* ChangeInfoText(@_text, [@_includeSeconds = true])
 * => Changes the displayed info text
 * Takes 2 parameters
 * @text - string; required; the text to display
 * @includeSeconds - boolean; optional; if true includes the time until the next pick (2 seconds)
 */
function ChangeInfoText(_text, _includeSeconds = true) {
	_text += (_includeSeconds) ? (int(((timer.lastPick + timer.interval) - millis()) / 1000) + " seconds") : "";
	timeInfoContainer.html(_text, false);
}