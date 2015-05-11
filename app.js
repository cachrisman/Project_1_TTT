// "use strict";
// OOP Tic Tac Toe boilerplate code

// Execute this code only AFTER the document is ready
// Hint: use jQuery's `$(document).ready`
$(document).on("ready", function() {

    function Game() {
        this.player1 = new Player("X");
        this.player2 = new Player("O");
        this.board = new Board();
        this.currentMove = this.player1.team;
        this.turnCount = 0;
        this.moves = [];
        this.winner = null;
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

    /**
     * Switches currentMove to next player
     *
     * @method  nextPlayer
     */

    Game.prototype.nextPlayer = function() {
        this.currentMove = this.currentMove === this.player1.team ? this.player2.team : this.player1.team;
    };

    /**
     * Starts initial game setup: draws the board, sets up the event listeners: reset button, undo
     * button (initially disables button), and reset button (also initially disabled)
     *
     * @method  init
     */

    Game.prototype.init = function() {
        this.board.draw();
        $('.box').on("click", this.makeMove.bind(this));
        $('#reset').on("click", this.reset.bind(this)); //EL for reset btn
        $('#undo').on("click", this.undo.bind(this)); //EL for undo btn
        $('#undo').prop('disabled', true);
        $('#redo').on("click", this.redo.bind(this)); //EL for redo btn
        $('#redo').prop('disabled', true);
    };

    /**
     * makeMove is called when a box on the board is clicked.
     *
     * @method  makeMove
     * @return  {[type]}  [description]
     */

    Game.prototype.makeMove = function() {
        if (event.target.innerHTML === "X" || event.target.innerHTML === "O") {
            this.board.updateContent("Still " + this.currentMove + "'s move", "Already selected", "red", "Already selected. Still " + this.currentMove + "'s move");
        } else {
            event.target.innerHTML = this.currentMove;
            this.board.cells[event.target.id] = this.currentMove;
            if (this.turnCount < this.moves.length) this.moves = this.moves.slice(0, this.turnCount);
            this.moves.push([event.target.id, this.currentMove]);
            this.turnCount++;
            this.checkWinner();
            if (this.turnCount > 0) $('#undo').prop('disabled', false);
            if (this.turnCount === this.moves.length) $('#redo').prop('disabled', true);
        }
        this.board.draw();
        if (this.winner) $('.box').off("click");
    };

    Game.prototype.reset = function() {
        this.currentMove = this.player1.team;
        this.turnCount = 0;
        this.board.cells = [null, null, null, null, null, null, null, null, null];
        this.moves = [];
        this.winner = null;
        this.board.updateContent(this.currentMove + "'s move", "&nbsp;", "", "");
        this.board.draw();
        $('#undo').prop('disabled', true);
        $('#redo').prop('disabled', true);
        $('.box').on("click", this.makeMove.bind(this));
    };

    Game.prototype.undo = function() {
        this.turnCount--;
        this.nextPlayer();
        this.board.cells[this.moves[this.turnCount][0]] = null;
        this.board.updateContent(this.currentMove + "'s move", "&nbsp;", "", "");
        this.board.draw();
        if (this.turnCount === 0) $('#undo').prop('disabled', true);
        if (this.turnCount < this.moves.length) $('#redo').prop('disabled', false);
        if (this.winner) {
            this.winner = null;
            $('.box').on("click", this.makeMove.bind(this));
        }
    };

    Game.prototype.redo = function() {
        this.board.cells[this.moves[this.turnCount][0]] = this.moves[this.turnCount][1];
        $('#' + this.moves[this.turnCount][0]).html(this.moves[this.turnCount][1]);
        this.turnCount++;
        this.checkWinner();
        this.board.draw();
        if (this.turnCount > 0) $('#undo').prop('disabled', false);
        if (this.turnCount < this.moves.length) $('#redo').prop('disabled', false);
        if (this.turnCount === this.moves.length) $('#redo').prop('disabled', true);
        if (this.winner) $('.box').off("click");
    };

    Game.prototype.checkWinner = function() {
        var hasWon = false;
        for (var i = 0; i < this.winningCombinations.length; i++) {
            if (this.board.cells[this.winningCombinations[i][0]] === this.currentMove &&
                this.board.cells[this.winningCombinations[i][1]] === this.currentMove &&
                this.board.cells[this.winningCombinations[i][2]] === this.currentMove)
                hasWon = true;
        }
        if (hasWon) this.winner = this.currentMove;
        if (this.winner) {
            this.board.updateContent("&nbsp;", this.currentMove + " Wins!", "lime", this.currentMove + " Wins!");
            this.nextPlayer();
        } else {
            this.nextPlayer();
            this.board.updateContent(this.currentMove + "'s move", "&nbsp;", "", "");
        }
    };

    // A starter Player constructor.
    function Player(team) {
        this.team = team;
    }

    // A starter Board constructor.
    function Board() {
        this.cells = [null, null, null, null, null, null, null, null, null];
        this.updateContent("X's move", "&nbsp;", "", "");
        this.isDrawn = false;
    }

    Board.prototype.draw = function() {
        if (!this.isDrawn) {
            var $el_board = $("<div id='board'>");
            for (var i = 0; i < 9; i++) $el_board.append("<div id='" + i + "' class='box'>&nbsp;</div>");
            $('#board_container').append($el_board);
            this.isDrawn = true;
        } else {
            for (var j = 0; j < 9; j++) {
                if (!this.cells[j] && $('.box').eq(j) !== "&nbsp;") $('.box').eq(j).html("&nbsp;");
                else if (this.cells[j] !== $('.box').eq(j).html()) $('.box').eq(j).html(this.cells[j]);
            }
        }

        $('#playermove').html(this.playermove_text);
        $('#notification').html(this.notification_text);
        $('#notification').css("background-color", this.notification_color);
        if (this.alert_text) alert(this.alert_text);
    };

    Board.prototype.updateContent = function(playermove_text, notification_text, notification_color, alert_text) {
        this.playermove_text = playermove_text;
        this.notification_text = notification_text;
        this.notification_color = notification_color;
        this.alert_text = alert_text;
    };

    // Start the game!
    var game = new Game();
    game.init();

});
