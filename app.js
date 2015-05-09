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
        this.turnCount = 0;
        this.winner;
    }

    Game.prototype.winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Remember: prototypes are shared functions between all game instances
    Game.prototype.nextPlayer = function() {
        //Switch players
    };

    // `Game.prototype.init` kicks off a new game with a board and two players
    Game.prototype.init = function() {
        //
    };

    Game.prototype.checkWinner = function() {
        var isWinner = function(symbol) {
            var hasWon = false;
            for (var i = 0; i < this.winningCombinations.length; i++) {
                if (this.board[this.winningCombinations[i][0]] === symbol &&
                    this.board[this.winningCombinations[i][1]] === symbol &&
                    this.board[this.winningCombinations[i][2]] === symbol)
                    hasWon = true;
            }
            return hasWon;
        };
        if (isWinner("X")) this.winner = "X";
        if (isWinner("O")) this.winner = "O";
    };

    // A starter Player constructor.
    function Player(team) {
        this.team = team;
    }

    // A starter Board constructor.
    function Board() {
        var self = this;
        this.el = $("<div id='board'>");
        this.$cells = {};
        for (var i = 0; i < 9; i++) {
            this.$cells.push("<div id='" + i + "' class='box'>&nbsp;</div>");
        }
        this.$cells.forEach(function(v) {
            self.el.append(v);
        });

        //Store any other properties that board may have below, such as a reset option
    }

    Board.prototype.reset() {

    };

    Board.prototype.undo() {

    };

    Board.prototype.redo() {

    };

    // Start the game!
    var game = new Game();
    game.init();

});
