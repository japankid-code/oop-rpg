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

Game.prototype.startNewBattle = function() {
  if (this.player.agility > this.currentEnemy.agility) {
    this.isPlayerTurn = true;
  } else {
    this.isPlayerTurn = false;
  }
  console.log('Your stats are as follows:');
  console.table(this.player.getStats());
  console.log(this.currentEnemy.getDescription());
  this.battle();
}

Game.prototype.battle = function() {
  if (this.isPlayerTurn) {
    // player prompts go here :)
    inquirer
      .prompt({
        type: 'list',
        message: 'what would you like to do?',
        name: 'action',
        choices: ['attack', 'use potion']
      })
      .then (({ action }) => {
        if (action === 'use potion') {
          if (!this.player.getInventory()) {
            console.log("you dont have any potions!");
            return;
          }
          inquirer.prompt({
            type: 'list',
            message: 'Which potion would you like to use?',
            name: 'action',
            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
            })
            .then(({ action }) => {
              const potionDetails = action.split(': ');
              this.player.usePotion(potionDetails[0] - 1);
              console.log(`You used a ${potionDetails[1]} potion!`)
            })
        } else {
          const damage = this.player.getAttackValue();
          this.currentEnemy.reduceHealth(damage);
          console.log(`You attacked the ${this.currentEnemy.name}`);
          console.log(this.currentEnemy.getHealth())
        }
      })
  } else {
    const damage = this.currentEnemy.getAttackValue();
    this.player.reduceHealth(damage);
    console.log(`You were attacked by the ${this.currentEnemy.name}`)
    console.log(this.player.getHealth());
  }
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
