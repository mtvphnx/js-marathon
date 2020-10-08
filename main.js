import Pokemon from './modules/Pokemon.js';
import { generateLog, renderLog } from "./modules/utils.js";
import { pokemons } from "./modules/pokemons.js";
import Manage from "./modules/Manage.js";

const startGameBtn = document.getElementById('btn-start');
const stopGameBtn = document.getElementById('btn-stop');
const resetGameBtn = document.getElementById('btn-reset');

const pikachu = pokemons.find((item) => item.name === 'Pikachu');

const game = new Manage ({
    name: "game"
})

const character = new Pokemon({
    name: 'Pikachu',
    selector: 'player1',
    defaultHP: 200,
    damageHP: 100,
    countDamage: 20,
    currentDamage: 0,
    hits: 10,
    ...pikachu
});

console.log(character);

const enemy = new Pokemon({
    name: 'Charmander',
    selector: 'player2',
    defaultHP: 150,
    damageHP: 100,
    countDamage: 20,
    currentDamage: 0,
    hits: 8
});

const counterCharacter = character.counterKicks(character.hits);
const counterEnemy = enemy.counterKicks(enemy.hits);

[character, enemy].forEach(function(item, i) {
    item.elButton.addEventListener('click', function() {
        item.changeHP((self, win = false) => {
            const text = self === character ? generateLog(self, enemy) : generateLog(self, character);
            if (!win) {
                renderLog(text);
            } else {
                character.elButton.disabled = true;
                enemy.elButton.disabled = true;
                renderLog(win, true);
            }
        });

        if (item === character) {
            counterCharacter(item);
        } else {
            counterEnemy(item);
        }
    });
});

startGameBtn.addEventListener('click', function () {
    game.start();
});

stopGameBtn.addEventListener('click', function () {
    game.stop();
});

resetGameBtn.addEventListener('click', function () {
    game.reset();
});
