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
        this.currentMove = (this.currentMove === "X" ? "O" : "X");
    };

    // `Game.prototype.init` kicks off a new game with a board and two players
    Game.prototype.init = function() {
        this.board.draw();
        $("#undo").click(this.board.undoMove); //EL for undo btn
        $("#redo").click(this.board.redoMove); //EL for redo btn
        $(".box").click(this.makeMove.bind(this));
    };

    Game.prototype.makeMove = function() {
        if (event.target.innerHTML === "X" || event.target.innerHTML === "O") {
            updateContent("Already selected", "red", "Still " + (XsMove ? "X" : "O") + "'s move", "Already selected. Still " + (XsMove ? "X" : "O") + "'s move");
        } else {
            event.target.innerHTML = this.currentMove;
            this.board.cells[event.target.id] = this.currentMove;
            this.moves.push([event.target.id,this.currentMove]);
            this.nextPlayer();
            this.board.draw();
            //updateContent("&nbsp;", "", (XsMove ? "X" : "O") + "'s move");
            this.turnCount++;
            if (this.turnCount > 0) $('#undo').prop('disabled', false);
            this.checkWinner();
        }
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
        // var self = this;
        this.cells = [];
        for (var i = 0; i < 9; i++) {
            this.cells.push(null);
        }
        // this.cells.forEach(function(v) {
        //     self.el.append(v);
        // });
        this.playermove_text = "X's move";
        this.notification_text = "&nbsp;";
        this.notification_color = "";
    }

    Board.prototype.draw = function() {
        $('#playermove').html(this.playermove_text);
        $('#notification').html(this.notification_text);
        $('#notification').css("background-color", this.notification_color);

        var $el_board = $("<div id='board'>");
        for (var i = 0; i < 9; i++) {
            if (this.cells[i]) $el_board.append("<div id='"+i+"' class='box'>"+this.cells[i]+"</div>");
            else $el_board.append("<div id='"+i+"' class='box'>&nbsp;</div>");
        }

        $('#board_container').append($el_board);
        // if (alert_text) alert(alert_text);


        // $("#board").off("click");
        // $("#board").click(makeMove);
        // if (turnCount > 0) $('#undo').prop('disabled', true);
        // if (turnCount < this.moves.length) $('#redo').prop('disabled', true);
    };

    Board.prototype.reset = function() {
        this.currentMove = "X";
        this.turnCount = 0;
        this.$cells = [null, null, null, null, null, null, null, null, null];
        this.moves = [];
        this.winner = null;
        this.draw();
    };

    Board.prototype.undo = function() {
        if (this.turnCount > 0) {
            this.turnCount--;
            this.board[this.moves[this.turnCount][0]] = null;
            $('#'+this.moves[this.turnCount][0]).html('&nbsp;');
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
            $('#'+this.moves[this.turnCount][0]).html(this.moves[this.turnCount][1]);
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
