// "use strict";
// OOP Tic Tac Toe boilerplate code

// Execute this code only AFTER the document is ready
// Hint: use jQuery's `$(document).ready`
$(document).on("ready", function() {

    function Game() {
        // this.player1 = new Player("X");
        // this.player2 = new Player("O");
        this.player1 = new Player();
        this.player2 = new Player();
        this.board = new Board();
        this.currentMove = this.player1;
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
        this.currentMove = this.currentMove === this.player1 ? this.player2 : this.player1;
    };

    /**
     * Starts initial game setup: draws the board, sets up the event listeners: reset button, undo
     * button (initially disables button), and reset button (also initially disabled)
     *
     * @method  init
     */

    Game.prototype.init = function() {
        this.board.draw();
        $('.cell').on("click", this.makeMove.bind(this));
        $('#settings').on("click", function(){$('.overlay').show();});
        $('#close').on("click", function(){$('.overlay').hide();});
        $(document).on("keyup", function(e) {if (e.keyCode == 27) { $('.overlay').hide();}});
        $('#reset').on("click", this.reset.bind(this)); //EL for reset btn
        // $('#undo').on("click", this.undo.bind(this)); //EL for undo btn
        // $('#redo').on("click", this.redo.bind(this)); //EL for redo btn
        $('form').on("submit", this.setup.bind(this));
    };

    Game.prototype.setup = function(event) {
        event.preventDefault();
        $('.overlay').hide();
        // if (this.player1.team) $('#p1_name').val(this.player1.team);
        // if (this.player1.html) $('#p1_url').val(this.player1.html.match(/<img src=\"(.*)">/));
        // if (this.player2.team) $('#p2_name').val(this.player2.team);
        this.player1.update($('#p1_name').val(), $('#p1_url').val());
        this.player2.update($('#p2_name').val(), $('#p2_url').val());
        this.board.updateContent(this.currentMove.team + "'s move", "&nbsp;", "", "");
        this.board.draw();
    };

    /**
     * makeMove is called when a cell on the board is clicked. Checks if selected cell already has
     * move and throws warning. If cell is empty, places current player marker, updates board tracker,
     * trims moves array if longer than turnCount, pushes new move into moves array, increases turnCount,
     * calls checkWinner, turns on undo button if turnCount is greater than zero and turns off redo
     * button if there are no moves to redo.
     *
     * @method  makeMove
     * @return  {[type]}  [description]
     */

    Game.prototype.makeMove = function() {
        if (event.target.innerHTML === "&nbsp;") {
            event.target.innerHTML = this.currentMove.html;
            this.board.cells[event.target.id] = this.currentMove.team;
            if (this.turnCount < this.moves.length) this.moves = this.moves.slice(0, this.turnCount);
            this.moves.push([event.target.id, this.currentMove.team]);
            this.turnCount++;
            this.checkWinner();
            if (this.turnCount > 0) $('#undo').on("click", this.undo.bind(this));
            if (this.turnCount === this.moves.length) $('#redo').off();
        } else {
            this.board.updateContent("Still " + this.currentMove.team + "'s move", "Already selected", "red", "Already selected. Still " + this.currentMove + "'s move");
        }
        this.board.draw();
        if (this.winner) $('.cell').off("click");
    };

    Game.prototype.reset = function() {
        this.currentMove = this.player1;
        this.turnCount = 0;
        this.board.cells = [null, null, null, null, null, null, null, null, null];
        this.moves = [];
        this.board.updateContent(this.currentMove.team + "'s move", "&nbsp;", "", "");
        this.board.draw();
        $('#undo').off();
        $('#redo').off();
        if (this.winner) {
            this.winner = null;
            $('.cell').on("click", this.makeMove.bind(this));
        }
    };

    Game.prototype.undo = function() {
        this.turnCount--;
        this.nextPlayer();
        this.board.cells[this.moves[this.turnCount][0]] = null;
        this.board.updateContent(this.currentMove.team + "'s move", "&nbsp;", "", "");
        this.board.draw();
        if (this.turnCount === 0) $('#undo').off();
        if (this.turnCount < this.moves.length) $('#redo').on("click", this.redo.bind(this));
        if (this.winner) {
            this.winner = null;
            $('.cell').on("click", this.makeMove.bind(this));
        }
    };

    Game.prototype.redo = function() {
        this.board.cells[this.moves[this.turnCount][0]] = this.moves[this.turnCount][1];
        $('#' + this.moves[this.turnCount][0]).html((this.moves[this.turnCount][1] === this.player1.team) ? this.player1.html : this.player2.html);
        this.turnCount++;
        this.checkWinner();
        this.board.draw();
        if (this.turnCount > 0) $('#undo').on("click", this.undo.bind(this));
        if (this.turnCount < this.moves.length) $('#redo').on("click", this.redo.bind(this));
        if (this.turnCount === this.moves.length) $('#redo').off();
        if (this.winner) $('.cell').off("click");
    };

    Game.prototype.checkWinner = function() {
        var hasWon = false;
        for (var i = 0; i < this.winningCombinations.length; i++) {
            if (this.board.cells[this.winningCombinations[i][0]] === this.currentMove.team &&
                this.board.cells[this.winningCombinations[i][1]] === this.currentMove.team &&
                this.board.cells[this.winningCombinations[i][2]] === this.currentMove.team)
                hasWon = true;
        }
        if (hasWon) this.winner = this.currentMove;
        if (this.winner) {
            this.board.updateContent("&nbsp;", this.currentMove.team + " Wins!", "lime", this.currentMove.team + " Wins!");
            this.nextPlayer();
        } else {
            this.nextPlayer();
            this.board.updateContent(this.currentMove.team + "'s move", "&nbsp;", "", "");
        }
    };

    // A starter Player constructor.
    function Player(team, html) {
        this.team = team;
        this.html = html || team;
    }

    Player.prototype.update = function(name, url) {
        this.team = name;
        this.html = '<img src=' + url + '>';
    };

    // A starter Board constructor.
    function Board() {
        this.cells = [null, null, null, null, null, null, null, null, null];
        this.isDrawn = false;
    }

    Board.prototype.draw = function() {
        if (!this.isDrawn) {
            var $el_board = $("<div id='board'>");
            for (var i = 0; i < 9; i++) $el_board.append("<div id='" + i + "' class='col-xs-4 cell'>&nbsp;</div>");
            $('#board_container').append($el_board);
            this.isDrawn = true;
        } else {
            for (var j = 0; j < 9; j++) {
                if (!this.cells[j] && $('.cell').eq(j) !== "&nbsp;") $('.cell').eq(j).html("&nbsp;");
                // else if (this.cells[j] !== $('.cell').eq(j).html()) $('.cell').eq(j).html(this.cells[j]);
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
