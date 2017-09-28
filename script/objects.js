function Grid() {
	this.fields = new Array(5);

	this.Make2D = function() {
		for (var i = 0; i < 5; i++) {
			this.fields[i] = new Array(5);
		}
	}

	this.Draw = function() {
		// Display grid
		background("#f53240")

		// Display marks and numbers
		for (var row = 0; row < 5; row++) { // loop through rows
			for (var col = 0; col < 5; col++) { // loop through columns
				var field = this.fields[row][col]; // get the current field
				if (field.marked) { // if the field is marked draw a circle mark
					stroke("#7cdbd5");
					fill("#7cdbd5");
					ellipse((row * fieldSize) + fieldSize / 2, (col * fieldSize) + fieldSize / 2, fieldSize / 2);
				} else { // if the field is not marked show it's value
					textSize(35);
					textFont("Impact");
					textAlign(CENTER);
					noStroke();
					fill("#fff");
					text(field.value, (row * fieldSize) + fieldSize / 2, (col * fieldSize) + fieldSize / 2 + 15);
				}
			}
		}
	}

}

function Field(_val, _id, _x, _y) {
	/* id table
	 * # 1 # 6 # 11 # 16 # 21 #
	 * # 2 # 7 # 12 # 17 # 22 #
	 * # 3 # 8 # 13 # 18 # 23 #
	 * # 4 # 9 # 14 # 19 # 24 #
	 * # 5 # 10# 15 # 20 # 25 #
	 */
	this.id = _id; // id ranges 1-25
	this.gridX = _x;
	this.gridY = _y;
	this.value = _val; // The numerical value this field holds
	this.marked = false; // Whether it is checked by the user or not

	this.Mark = function(_marked) {
		this.marked = _marked;
	}
}



//
// Timer
// => Holds the following values:
// @startTime = the millis() when the timer was started
// @interval = the interval on which a number is picked
// @lastPick = the millis() when the last pick occured
// @@Initialize(_interval) = Initializes the timer with new startTime
// => Expects one parameter (@_interval) which is the interval in milliseconds
function Timer() {
	this.startTime;
	this.interval;
	this.lastPick;

	this.Initialize = function(_interval) {
		this.startTime = millis();
		this.lastPick = this.startTime;
		this.interval = _interval;
	}
}

var bingoCombos = {
	// Vertical
	1: [1, 2, 3, 4, 5],
	2: [6, 7, 8, 9, 10],
	3: [11, 12, 13, 14, 15],
	4: [16, 17, 18, 19, 20],
	5: [21, 22, 23, 24, 25],
	// Horizontal
	6: [1, 6, 11, 16, 21],
	7: [2, 7, 12, 17, 22],
	8: [3, 8, 13, 18, 23],
	9: [4, 9, 14, 19, 24],
	10: [5, 10, 15, 20, 25],
	// Diagonals
	11: [1, 7, 13, 19, 25],
	12: [5, 9, 13, 17, 21],
	// Special
	13: [1, 5, 13, 21, 25]
}