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

/*
//test code
view.displayMessage("Is this working?");

view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");
*/

//The MODEL
var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
//currently values are hardcoded for testing, to be changed into dynamic code later
	ships: [
		{
			locations: ["06", "16", "26"],
		 	hits: ["", "", ""]
		},
		{
			locations: ["24", "34", "44"],
		 	hits: ["", "", ""]
		},
		{
			locations: ["10", "11", "12"],
		 	hits: ["", "", ""]
		}
	],

	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			if (index >= 0) {
				ship.hits[index] = "hit";
				return true;
			}
		}
		return false;
	}
};




//The CONTROLLER
