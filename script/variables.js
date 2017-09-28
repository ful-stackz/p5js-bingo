// Stores all global variables
/*
 * Grid
 * => A container for the fields
 */
var grid;

/*
 * Timer
 * => Used to pick numbers after a given time
 */
var timer;

// Sizes
/*
 * @canvasWidth 
 * => the width of the canvas, default 500
*/
var canvasWidth = 720;
/*
 * @canvasHeight 
 * => the height of the canvas, default 500
 */
var canvasHeight = canvasWidth;
/*
 * @fieldSize 
 * => width/height of the field, it is by default a square
 */
var fieldSize;

// Numbers
// All the different types of numbers in the game
/*
 * @pickedNumbers
 * => All the numbers that have been picked
 */
var pickedNumbers = [];
/*
 * @unpickedNumbers
 * => All numbers that have not been picked yet
 */
var unpickedNumbers = [];
/*
 * @lastPickedNumber
 * => The last picked number
 */
var lastPickedNumber;
/*
 * @pickedFields
 * => An array with the fields' ids that's been picked
 */
var pickedFields = [];
/*
 * @maximumPicks
 * => Integer value of maximum possible picks
 */
var maximumPicks = 25;
/*
 * @pickngInterval
 * => The picking interval in milliseconds
 */
 var pickingInterval;

// Booleans
/* 
 * @gameSetup 
 * => Controls whether the draw method should initially setup the UI or not
 */
var gameSetup;
/* 
 * @gameRunning 
 * => Controls whether the game is running or not
 */
var gameRunning;
/*
 * @gameStoped
 * => Shows whether the game was stopped by the Stop button
 */
var gameStopped;
/* 
 * @gotBingo 
 * => true when there is a bingo
 */
var gotBingo;