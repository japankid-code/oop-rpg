const Potion = require('../lib/Potion.js');
const Character = require('./Character');

function Player(name = '') {
    this.name = name;
    // set basic stats and add 2 pots to inventory
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 +7)
    this.inventory = [new Potion('health'), new Potion()];
}

// inherit some methods from Character here:
Player.prototype = Object.create(Character.prototype);

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

Player.prototype.addPotion = function(potion) {
    this.inventory.push(potion);
}

Player.prototype.usePotion = function(index) {
    // make a new array from the inventory
    // the new array contains the potion from the indicated index
    // splice alters the old array *and* returns a new one
    const potion = this.getInventory().splice(index, 1)[0];
    switch (potion.name) {
        case 'agility':
            this.agility += potion.value;
            break;
        case 'health':
            this.health += potion.value;
            break;
        case 'strength':
            this.strength += potion.value;
            break;
    }
}

module.exports = Player;
