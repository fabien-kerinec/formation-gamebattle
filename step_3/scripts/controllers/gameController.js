var currentGame;
var currentMovement;

function startGame(){
	currentGame = new Game(10,10,0.9);
	displayGame(currentGame);

	currentGame.nextMovementTurn();
}

function setupMovementOptions(options){
	currentMovements = options;
	for(var movement in currentMovements){
		$(`#cell-${currentMovements[movement][0]}-${currentMovements[movement][1]}`).bind('click', {row: currentMovements[movement][0], col : currentMovements[movement][1]}, currentGame.makeMovementTurn);
		toggleMovementCell(currentMovements[movement]);
	}
}

function setupCombatOptions(){
	$('button[name="atk"]').bind('click', {option:'atk'}, currentGame.makeCombatTurn);
	$('button[name="def"]').bind('click', {option:'def'}, currentGame.makeCombatTurn);
}

function unsetMovementOptions(options){
	for(movement in currentMovements){
		$(`#cell-${currentMovements[movement][0]}-${currentMovements[movement][1]}`).unbind("click");
		toggleMovementCell(currentMovements[movement]);
	}
	displayPlayer(currentGame.currentPlayer);
	options = null;
}

function unsetCombatOptions(){
	$('button[name="atk"]').unbind("click");
	$('button[name="def"]').unbind("click");
}

$(document).ready(function(){
	$("#play").click(function(){
		$(".aide").fadeOut(500, function(){
			$(".gameBoard").fadeIn(200);
		});
		startGame();
	});
});