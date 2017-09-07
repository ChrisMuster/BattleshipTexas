//The VIEW
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


//test code
view.displayMiss("00");
view.displayHit("34");
view.displayMiss("50");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("63");
view.displayHit("32");


//The MODEL
var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,

//Ships object, holding locations and hits(empty to start)
//currently values are hardcoded for testing, to be changed into dynamic code later
	ships: [
		{	locations: ["06", "16", "26"],
		 	hits: ["", "", ""]	},

		{	locations: ["24", "34", "44"],
		 	hits: ["", "", ""]	},

		{	locations: ["10", "11", "12"],
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
	}
};

//testing
/*
model.fire("06");
model.fire("16");
model.fire("26");
*/

//The CONTROLLER
