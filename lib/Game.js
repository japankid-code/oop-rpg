const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

Game.prototype.initializeGame = function() {
  this.enemies.push(new Enemy('goblin', 'sword'));
  this.enemies.push(new Enemy('corgi', 'cuteness'));
  this.enemies.push(new Enemy('skeleton', 'axe'));
  this.currentEnemy = this.enemies[0];

  inquirer
    .prompt({
      type: 'text',
      name: 'name',
      message: 'By what are you called?'
    }) // destructure name from the prompt object
    .then(({ name }) => {
      // note necessity of arrow function here, otherwise this would refer to 
      // something else. the function keyword would have created a new scope 
      // for this, would no longer reference the game object.
      this.player = new Player(name);
      this.startNewBattle();
    })
}

module.exports = Game;
