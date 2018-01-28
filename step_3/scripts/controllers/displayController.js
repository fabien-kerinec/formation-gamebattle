function displayGame(game){
	displayBoard(game.board);

	for (var weapon in game.weapons){
		displayWeapon(game.weapons[weapon]);
	}
	for(var player in game.players){
		displayPlayer(game.players[player]);
		displayHP(game.players[player]);
	}
}

function displayBoard(board){
	let $row, $cell;

	$('#baord').html('');
	for(var i=0; i<board.grid.length;i++){
		$row = $('<div class="row"></div>');
		for(var j=0; j<board.grid[i].length;j++){
			$cell = $('<div class="cell"></div>');
			$cell.attr('id', `cell-${board.grid[i][j].getRow()}-${board.grid[i][j].getCol()}`);
			board.grid[i][j].getWallOnCell() ? $cell.addClass('cell-not-accessible') : $cell.addClass('cell-accessible');
			$cell.appendTo($row);
		}
		$row.appendTo($('#board'));
	}
}

function displayWeapon(weapon){
	let classList;
	if(weapon.getPosition() == 0){
	}else if(typeof weapon.getPosition() == 'string' && weapon.getPosition().startsWith("player")){
		classList = $(`#${weapon.getPosition()}-controls .player-weapon-icon`).attr("class").split(/\s+/);
		$.each(classList, function(index, item){
			if(item != 'player-weapon-icon'){
				$(`#${weapon.getPosition()}-controls .player-weapon-icon`).removeClass(item);
			}
		});
		$(`#${weapon.position}-controls .player-weapon-icon`).addClass(`cell-weapon-${weapon.id}`);
		$(`#${weapon.position}-controls .player-weapon-specs`).html(`${weapon.name}<br>Damages : ${weapon.damages}`);
	}else{
		classList = $("#cell-" + weapon.position[0] + "-" + weapon.position[1]).attr("class").split(/\s+/);
		$.each(classList, function(index, item){
    		if ((item === "cell") || (item === "cell-accessible") || (item === "cell-not-accessible") || (item.startsWith("cell-player"))) {
    		} else {
				$(`#cell-${weapon.position[0]}-${weapon.position[1]}`).removeClass(item);
			}
		});
		$(`#cell-${weapon.position[0]}-${weapon.position[1]}`).addClass(`cell-weapon-${weapon.id}`);
	}
}

function displayPlayer(player){
	if(player.getLastPosition() !== 0){
		$(`#cell-${player.lastPosition[0]}-${player.lastPosition[1]}`).removeClass(`cell-player-${player.id}`);	
	}
	$(`#cell-${player.position[0]}-${player.position[1]}`).addClass(`cell-player-${player.id}`);
}
function displayCurrent(player){
	$(`#currentPlayer`).html(`<p>current player : </p><img src="./assets/img/players/user${player.id}.png"/>`);
}
function displayHP(player){
	$(`#player${player.id}-controls .player-hp`).html(`${player.hp}/100 Health-Point`);
}

function toggleMovementCell(cell){
	$(`#cell-${cell[0]}-${cell[1]}`).hasClass('cell-movement') ? $(`#cell-${cell[0]}-${cell[1]}`).removeClass("cell-movement") : $(`#cell-${cell[0]}-${cell[1]}`).addClass("cell-movement");
}