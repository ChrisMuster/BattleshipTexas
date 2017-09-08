//The VIEW   ////////////////////////////////////////////////////////////////
var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "border hit hitColor");
		cell.innerHTML = "<p>HIT</p>";
	},

	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "border miss");
		cell.innerHTML = "<p>MISS</p>";
	}
};

//The MODEL   //////////////////////////////////////////////////////////////////
var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,

//Ships object, holding locations and hits(empty to start)
//currently values are hardcoded for testing, to be changed into dynamic code later
	ships: [
		{	locations: [0, 0, 0],
		 	hits: ["", "", ""]	},

		{	locations: [0, 0, 0],
		 	hits: ["", "", ""]	},

		{	locations: [0, 0, 0],
		 	hits: ["", "", ""]	}
	],

//Fire function, called when a guess is made
	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!!");
				if (this.isSunk(ship)) {
					view.displayMessage("You have 3 hits and sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},

//isSunk function, test to see if the ship has been hit enough times to be sunk
	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	},

//creates location array and assigns the result of generateShip function to it, then sends 
//to collision to check for no collisions before adding the location to the model.ships array
	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
	},

//assigns ship direction and location data and sends it to generateShipLocations
	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row;
		var col;
		if (direction === 1) {
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));

		} else {
			row = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

//takes the location from generateShipLocations and checks for collisions
	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
};

//The CONTROLLER   /////////////////////////////////////////////////////////////
var controller = {
	guesses: 0,
	//passes the guess to validation, then to the model to see if it is a hit or miss
	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage("You sank all 3 battleships, in " + this.guesses + " guesses!");
				document.getElementById("gameOver").removeAttribute("class");
			}
		}
	}
};

//Code to validate that guess is in the correct format
function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Oops, please only enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);

		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that entry isn't on the board.");
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert("Oops, that entry is way off the board!");
		} else {
			return row + column;
		}
	}
	return null;
};

//initialise, call only when window is fully loaded.
window.onload = init;

function init() {
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	model.generateShipLocations();
}


//Event handlers   /////////////////////////////////////////

//Click on FIRE button
function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();  //makes sure all input is uppercase even if entered in lowercase
	controller.processGuess(guess);

	guessInput.value = "";
}

//Press Enter when firing instead of clicking FIRE
function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event;

	if (e.keyCode === 13) {   //keyCode 13 means the Enter key was pressed
		fireButton.click();   //If Enter key pressed, trick the fireButton into thinking it was clicked
		return false;		  //so that all this does is click the FIRE button, nothing else
	}
}
