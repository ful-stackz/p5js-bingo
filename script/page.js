// DOM Containers
/*
 * @timeInfoContainer
 * => Displays the time left until next pick
 */
var timeInfoContainer;
/*
 * @lastPickContainer
 * => Displays the last picked number
 */
var lastPickContainer;
/*
 * @totalPicksContainer
 * => Displays the total current picks out of the maximum picks allowed
 */
var totalPicksContainer;
/*
 * @canvasContainer
 * => The DIV element that contains the canvas used by p5.js
 */
var canvasContainer;
/*
 * @canvas
 * => The canvas used by p5.js to render the game
 */
var canvas;
/*
 * @pickedNumbersContainer
 * => Displays all the picked numbers so far
 */
var pickedNumbersContainer;

function LoadElements() {
	timeInfoContainer = select("#timeInfo");
	lastPickContainer = select("#lastPick");
	totalPicksContainer = select("#totalPicks");
	canvasContainer = select("#canvasContainer");
	pickedNumbersContainer = select("#pickedNumbers");
}

function ResetUI() {
	timeInfoContainer.html("-", false);
	lastPickContainer.html("-", false);
	totalPicksContainer.html("-", false);
	pickedNumbersContainer.html("-", false);
}