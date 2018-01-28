var currentGame;

function startGame(){
	currentGame = new Game(10,10,0.9);
	displayGame(currentGame);
}

$(document).ready(function(){
	$("#play").click(function(){
		$(".aide").fadeOut(500);
		$(".gameBoard").fadeIn(500);
		startGame();
	});
});