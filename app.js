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
        this.moves = [];
        this.turnCount = 0;
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

    // Remember: prototypes are shared functions between all game instances
    Game.prototype.nextPlayer = function() {
        this.currentMove = this.currentMove === this.player1.team ? this.player2.team : this.player1.team;
    };

    // `Game.prototype.init` kicks off a new game with a board and two players
    Game.prototype.init = function() {
        this.board.draw();
        $(".box").on("click", this.makeMove.bind(this));
        $("#undo").on("click", this.board.undo.bind(this)); //EL for undo btn
        $("#redo").on("click", this.board.redo.bind(this)); //EL for redo btn
    };

    Game.prototype.makeMove = function() {
        $(".box").off("click");
        if (event.target.innerHTML === "X" || event.target.innerHTML === "O") {
            updateContent("Still " + this.currentMove + "'s move", "Already selected", "red", "Already selected. Still " + this.currentMove + "'s move");
        } else {
            event.target.innerHTML = this.currentMove;
            this.board.cells[event.target.id] = this.currentMove;
            this.moves.push([event.target.id, this.currentMove]);
            this.checkWinner();
            if (this.winner) {
                updateContent("&nbsp;", this.currentMove + " Wins!", "lime", this.currentMove + " Wins!");
            } else {
                this.nextPlayer();
                updateContent(this.currentMove + "'s move", "&nbsp;", "", "");
                this.turnCount++;
            }
            if (this.turnCount > 0) $('#undo').prop('disabled', false);
        }
        this.board.draw();
        $(".box").on("click", this.makeMove.bind(this));

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
    };

    // A starter Player constructor.
    function Player(team) {
        this.team = team;
    }

    // A starter Board constructor.
    function Board() {
        this.cells = [];
        this.cells = [null, null, null, null, null, null, null, null, null];
        this.playermove_text = "X's move";
        this.notification_text = "&nbsp;";
        this.notification_color = "";
        this.alert_text = "";
    }

    Board.prototype.draw = function() {
        var $el_board = $("<div id='board'>");
        for (var i = 0; i < 9; i++) {
            if (this.cells[i]) $el_board.append("<div id='" + i + "' class='box'>" + this.cells[i] + "</div>");
            else $el_board.append("<div id='" + i + "' class='box'>&nbsp;</div>");
        }

        $('#board_container').html("");
        $('#board_container').append($el_board);

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

    Board.prototype.reset = function() {
        this.currentMove = "X";
        this.turnCount = 0;
        this.cells = [null, null, null, null, null, null, null, null, null];
        this.moves = [];
        this.winner = null;
        this.draw();
    };

    Board.prototype.undo = function() {
        if (this.turnCount > 0) {
            this.turnCount--;
            this.board[this.moves[this.turnCount][0]] = null;
            $('#' + this.moves[this.turnCount][0]).html('&nbsp;');
            this.currentMove = (this.currentMove === "X" ? "O" : "X");
            this.updateContent("&nbsp;", "", (XsMove ? "X" : "O") + "'s move");
            if (this.turnCount === 0) $('#undo').prop('disabled', true);
            if (this.turnCount < moves.length) $('#redo').prop('disabled', false);
            if (this.winner) {
                $("#board").click(makeMove);
                this.winner = null;
            }
        }
    };

    Board.prototype.redo = function() {
        if (this.turnCount < this.moves.length) {
            this.board[this.moves[this.turnCount][0]] = this.moves[this.turnCount][1];
            $('#' + this.moves[this.turnCount][0]).html(this.moves[this.turnCount][1]);
            this.currentMove = (this.currentMove === "X" ? "O" : "X");
            this.turnCount++;
            if (this.turnCount < this.moves.length) $('#redo').prop('disabled', false);
            if (this.turnCount === this.moves.length) $('#redo').prop('disabled', true);
            this.updateContent("&nbsp;", "", (XsMove ? "X" : "O") + "'s move");
            this.checkWinner();
        }
    };

    // Start the game!
    var game = new Game();
    game.init();

});
