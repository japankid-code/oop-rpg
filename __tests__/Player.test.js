const Player = require('../lib/Player.js');
const Potion = require('../lib/Potion.js');

jest.mock('../lib/Potion.js')

test('creates a player object', () => {
    const player = new Player('david');
    expect(player.name).toBe('david');
    expect(player.health).toEqual((expect.any(Number)));
    expect(player.strength).toEqual((expect.any(Number)));
    expect(player.agility).toEqual((expect.any(Number)));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    )
})

test('gets player stats as an object', () => {
    const player = new Player("david");
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
})

test('gets inventory from player or returns false', () => {
    const player = new Player('david');
    expect(player.getInventory()).toEqual(expect.any(Array));
    player.inventory = [];
    expect(player.getInventory()).toEqual(false);
})

test('gets player health val', () => {
    const player = new Player('david');
    expect(player.getHealth())
        .toEqual(expect.stringContaining(player.health.toString()));
})

test('checks if player is alive or not', () => {
    const player = new Player("david");
    expect(player.isAlive()).toBeTruthy();
    player.health = 0;
    expect(player.isAlive()).toBeFalsy();
})

test('subtracts from player health', () => {
    const player = new Player("david");
    const oldHealth = player.health;
    player.reduceHealth(5);
    expect(player.health).toBe(oldHealth - 5);
    player.reduceHealth(666);
    expect(player.health).toBe(0);
})

test('gets player attack stat', () => {
    const player = new Player("david");
    player.strength = 10;
    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15)
})

test('adds a potion to the inventory', () => {
    const player = new Player("david");
    const oldCount = player.inventory.length;
    player.addPotion(new Potion());
    expect(player.inventory.length).toBeGreaterThan(oldCount);
})

test('uses a potion from the inventory', () => {
    const player = new Player("david");
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;
    player.usePotion(1);
    expect(player.inventory.length).toBeLessThan(oldCount);
})