class Game{
	constructor(width, height, accessibility){
		/*create board*/
		this.board = new Board(width, height, accessibility);
		/*create weapon*/
		var baseWeapons = [new Weapon(1, "Poing gauche", 10), new Weapon(2, "Poing droit", 10)];
		var bonusWeapons = [new Weapon(2, "sword", 50), new Weapon(3,"daggers", 40), new Weapon(4, "crowbar", 30), new Weapon(5, "baseball bat", 20)];
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
	}
}