// Tic Tac Toe
// Author Qing Bai
var Agent = function () {
    this.isPlayerOne = true;
}

/*
* Selects a proper move so that the agent will either win or draw.
*
* @param board is the game board.
* @return a number that represents location of next move on the board.
*/
Agent.prototype.selectMove = function (board) {
    this.isPlayerOne = board.playerOne;
    var translatedScores = [];
    var moves = [];

    // if it asks a player for the first move, this player always chooses the center
    if (board.X.length === 0 && board.O.length === 0) {
        return 5;
    }

    for (var i = 1; i <= 9; i++) {
        if (board.cellFree(i)) {
            moves.push(i);

            var clone = board.clone();
            this.isPlayerOne ? clone.X.push(i) : clone.O.push(i);
            clone.playerOne = !this.isPlayerOne;

            var translatedScore = this.miniMax(clone);
            translatedScores.push(translatedScore);
        }
    }

    var maxScore = Math.max.apply(null, translatedScores);
    return this.selectRandomMove(maxScore, translatedScores, moves);
}

/*
* Selects a move from the best moves randomly.
*
* @param maxScore is the maximum score this player can get.
* @param scores is an array of scores this player can get from all possible moves.
* @param moves is an array of possible moves this player can have.
* @return a randomly selected best move.
*/
Agent.prototype.selectRandomMove = function (maxScore, scores, moves) {
    var selectedMoves = [];

    for (var i = 0; i < scores.length; i++) {
        if (scores[i] === maxScore) {
            selectedMoves.push(moves[i]);
        }
    }

    var index = Math.floor(Math.random() * selectedMoves.length);
    return selectedMoves[index];
}

/*
* Uses minimax algorithm to find the best move.
*
* @param board is the game board.
* @return -10 (this player will lose), 0 (it is a draw), or 10 (this player will win).
*/
Agent.prototype.miniMax = function (board) {
    var score = board.gameOver();
    var translatedScores = [];

    if (score > 0) {
        return this.translateScore(score);
    } else {
        for (var i = 1; i <= 9; i++) {
            if (board.cellFree(i)) {
                var clone = board.clone();
                clone.playerOne ? clone.X.push(i) : clone.O.push(i);
                clone.playerOne = !board.playerOne;

                var translatedScore = this.miniMax(clone);
                translatedScores.push(translatedScore);
            }
        }
    }

    if (this.isPlayerOne === board.playerOne) {
        return Math.max.apply(null, translatedScores);
    } else {
        return Math.min.apply(null, translatedScores);     
    }
}

/*
* Translates scores 1, 2, and 3 to 10, 0, and -10.
*
* @param score is a score showing which player wins this game.
* @return 10 if this agent wins, -10 if this agent loses. Otherwise, 0.
*/
Agent.prototype.translateScore = function (score) {
    if (score === 3) {
        return 0;
    } else if (this.isAgentWin(score)) {
        return 10;
    } else {
        return -10;
    }
}

/*
* Checks if the agent wins the game. Draw is considerred as losing the game at this moment.
*
* @param score is a score showing which player wins this game.
* @return true if this agent wins the game. Otherwise, false.
*/
Agent.prototype.isAgentWin = function(score) {
    if ((this.isPlayerOne && score === 1) || (!this.isPlayerOne && score === 2)) {
        return true;
    } else {
        return false;
    }
}