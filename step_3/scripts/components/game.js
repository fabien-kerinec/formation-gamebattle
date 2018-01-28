class Game{
	constructor(width, height, accessibility){
		/*create board*/
		this.board = new Board(width, height, accessibility);
		/*create weapon*/
		var baseWeapons = [new Weapon(1, "left punch", 10), new Weapon(2, "right punch", 10)];
		var bonusWeapons = [new Weapon(3, "sword", 50), new Weapon(4,"daggers", 40), new Weapon(5, "crowbar", 30), new Weapon(6, "baseball bat", 20)];
		/*create player*/
		this.players = [new Player(1, baseWeapons[0], this.board), new Player(2, baseWeapons[1], this.board)];
		
		/*give base weapon position*/
		for(var weapon in baseWeapons){
			baseWeapons[weapon].initializePosOnPlayer(this.players[weapon]);
		}

		/*give bonus weapons position*/
		for (var weapon in bonusWeapons){
			bonusWeapons[weapon].initializePosOnBoard(this.board);
		}

		this.weapons = baseWeapons.concat(bonusWeapons);
		this.currentPlayer = this.players[0];
		this.continueMovementPhase = true;
	}

	getNextPlayer() {
		if(this.currentPlayer.id === this.players.length) {
			return this.players[0];
		} else {
			return this.players[this.currentPlayer.id];
		}
	}


	setContinueMovementPhase(value){
		this.continueMovementPhase = value;
	}
	setNextPlayer(){
		
		if(this.currentPlayer.id === this.players.length){
			this.currentPlayer = this.players[0];
		}else{
			this.currentPlayer = this.players[this.currentPlayer.getID()]
		}
	}

	nextMovementTurn(){
		if(this.continueMovementPhase === true){
			displayCurrent(this.currentPlayer);
			let movementOption = this.board.checkPlayerMovementOptions(this.currentPlayer.getPosition(), this.currentPlayer.getMovement());
			if(movementOption.length > 0){
				setupMovementOptions(movementOption)
			}else{
				this.endGame();
			}
		}else{
			this.nextCombatTurn();
		}
		
	}

	makeMovementTurn(e){
		var pos = [e.data.row, e.data.col];

		currentGame.currentPlayer.makeMovement(pos, currentGame.board);
		unsetMovementOptions();

		var weaponSwitchOptions = currentGame.currentPlayer.lastMovementCells();
		for (movement in weaponSwitchOptions){
			currentGame.switchPlayerWeapon(weaponSwitchOptions[movement], currentGame.currentPlayer);
		}
		if (currentGame.board.grid[currentGame.currentPlayer.position[0]][currentGame.currentPlayer.position[1]].getTriggerCombat() === true) {
			currentGame.setContinueMovementPhase(false);	
		} else {
			currentGame.setContinueMovementPhase(true);
		}

		currentGame.setNextPlayer();
		currentGame.nextMovementTurn();
	}

	switchPlayerWeapon(pos, player){
		var oldWeaponId = player.weapon.getID();
		var newWeaponId = this.board.grid[pos[0]][pos[1]].getWeaponOnCell();
		if(newWeaponId > 0){	
			var oldWeapon, newWeapon;
			for (var i=0; i<this.weapons.length; i++){
				if(this.weapons[i].getID() === oldWeaponId){
					oldWeapon = this.weapons[i];
				}else if(this.weapons[i].getID() === newWeaponId){
					newWeapon = this.weapons[i];
				}
			}
			
			newWeapon.setPosition(`player${player.getID()}`);
			oldWeapon.setPosition(pos);

			this.board.grid[pos[0]][pos[1]].setWeaponOnCell(oldWeaponId);
			player.setWeapon(newWeapon);

			displayWeapon(oldWeapon);
			displayWeapon(newWeapon);
		}
	}

	nextCombatTurn(){
		$('.btn-combat').css('display', 'inline-block');
		displayCurrent(this.currentPlayer);
		if(this.currentPlayer.getHP() > 0){
			setupCombatOptions();
		}else{
			this.endGame()
		}
	}

	makeCombatTurn(e){

		var option = e.data.option;
		unsetCombatOptions();
		if(option === 'atk'){
			var ennemy = currentGame.getNextPlayer();
			currentGame.currentPlayer.setDefensePosture(false);
			ennemy.takeDamages(currentGame.currentPlayer.weapon.getDamages());
			displayHP(ennemy);
		}else if(option === 'def'){
			currentGame.currentPlayer.setDefensePosture(true);
		}

		currentGame.setNextPlayer();
		currentGame.nextCombatTurn();
	}

	endGame() {
		var winner = this.getNextPlayer().id;
		console.log(winner)
		$('.winner').remove();
		$(`
			<div class="winner">
				<p>Congratz <span>player${winner}</span></p>
				<p>you win the game !</p>
			</div>
		`).appendTo('.aide');
		$(".gameBoard").fadeOut(200, function(){
			$('.aide').fadeIn(200);
		});
		$("#play").click(function(){
			$(".aide").fadeOut(500, function(){
				$(".gameBoard").fadeIn(200);
			});
			$('#board').empty();
			startGame();
		});
	};
}