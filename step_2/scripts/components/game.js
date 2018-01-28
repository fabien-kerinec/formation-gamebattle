class Game{
	constructor(width, height, accessibility){
		/*create board*/
		this.board = new Board(width, height, accessibility);
		/*create weapon*/
		var baseWeapons = [new Weapon(1, "Poing gauche", 10), new Weapon(2, "Poing droit", 10)];
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
		let movementOption = this.board.checkPlayerMovementOptions(this.currentPlayer.getPosition(), this.currentPlayer.getMovement());
		displayCurrent(this.currentPlayer);
		if(movementOption.length > 0){
			setupMovementOptions(movementOption)
		}else{
			this.endGame();
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

		currentGame.board.grid[currentGame.currentPlayer.position[0]][currentGame.currentPlayer.position[1]].getTriggerCombat === true ? currentGame.setContinueMovementPhase(false) : currentGame.setContinueMovementPhase(true);

		currentGame.setNextPlayer();
		currentGame.nextMovementTurn();
	}

	switchPlayerWeapon(pos, player){
		var oldWeaponId = player.weapon.getID();
		var newWeaponId = this.board.grid[pos[0]][pos[1]].getWeaponOnCell();
		console.log(oldWeaponId)
		console.log(newWeaponId)
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
}