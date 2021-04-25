const Potion = require('../lib/Potion.js');

function Player(name = '') {
    this.name = name;
    // set basic stats and add 2 pots to inventory
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 +7)
    this.inventory = [new Potion('health'), new Potion()];

}

// returns an object with player props
Player.prototype.getStats = function() {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    }
}
// get inventory data from player
Player.prototype.getInventory = function() {
    if (this.inventory.length) {
        return this.inventory;
    }
    return false;
}

module.exports = Player;
