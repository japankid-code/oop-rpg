const Potion = require('../lib/Potion.js');
const Character = require('./Character');

class Player extends Character {
  constructor(name = '') {
    // super constructor calls constructor in inherited class
      super(name);
      
      this.inventory = [new Potion('health'), new Potion()];
  }
  // returns an object with player props
  getStats() {
      return {
          potions: this.inventory.length,
          health: this.health,
          strength: this.strength,
          agility: this.agility
      }
  }
  // get inventory data from player
  getInventory() {
      if (this.inventory.length) {
          return this.inventory;
      }
      return false;
  }

  addPotion(potion) {
      this.inventory.push(potion);
  }

  usePotion(index) {
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
  }}

module.exports = Player;
