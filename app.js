// OOP Tic Tac Toe boilerplate code

// Execute this code only AFTER the document is ready
// Hint: use jQuery's `$(document).ready`
$(document).on("ready", function() {

    function Game() {
        //Create a new instance of player 1
        //this.player1 = ...

        //Do the same for a player 2
        //this.player2 = ...

        //Create the board
        //this.board = ...
    }

    // Remember: prototypes are shared functions between all game instances
    Game.prototype.nextPlayer = function() {
        //Switch players
    };

    // `Game.prototype.init` kicks off a new game with a board and two players
    Game.prototype.init = function() {
        //
    };

    // A starter Player constructor.
    function Player(team) {
        //Is the player X or O?
        //this.team = ...
    }

    // A starter Board constructor.
    function Board() {


        //Tracks the cells of the board instance
        //this.$cells = ...

        //Store any other properties that board may have below, such as a reset option
    }

    // Start the game!
    var game = new Game();
    game.init();

});
