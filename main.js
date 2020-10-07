import Pokemon from './modules/Pokemon.js';
import { generateLog, renderLog } from "./modules/utils.js";

const character = new Pokemon({
    name: 'Pikachu',
    selector: 'character',
    defaultHP: 200,
    damageHP: 100,
    countDamage: 20,
    currentDamage: 0,
    hits: 10
});

const enemy = new Pokemon({
    name: 'Charmander',
    selector: 'enemy',
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
