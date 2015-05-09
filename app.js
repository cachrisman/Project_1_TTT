// "use strict";
// OOP Tic Tac Toe boilerplate code

// Execute this code only AFTER the document is ready
// Hint: use jQuery's `$(document).ready`
$(document).on("ready", function() {

    function Game() {
        this.player1 = new Player("X");
        this.player2 = new Player("O");
        this.board = new Board();
        this.currentMove = "X";
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
        var self = this;
        this.el = $("<div id='board'>");
        this.$cells = {};
        for (var i=0; i<9; i++) { this.cells.push("<div id='"+i+"' class='box'>&nbsp;</div>"); }
        this.$cells.forEach(function(v){self.el.append(v);});

        //Tracks the cells of the board instance
        //this.$cells = ...

        //Store any other properties that board may have below, such as a reset option
    }

    // Start the game!
    var game = new Game();
    game.init();

});
