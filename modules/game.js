import { random, renderLog, generateLog, server } from "./utils.js";
import Pokemon from "./Pokemon.js";

const $helloScreen = document.querySelector('.control__list');
const $attacksList = document.querySelector('.control__fight');
const $fightersList = document.querySelector('.control__fighters');
const $players = document.querySelectorAll('.pokemon');
const $logs = document.getElementById('logs');

const $startGameBtn = document.getElementById('btn-start');
const $stopGameBtn = document.getElementById('btn-stop');
const $resetGameBtn = document.getElementById('btn-reset');

export default class Game {
    generateFighters = (list) => {
        $fightersList.querySelectorAll('div').forEach(item => item.remove());
        let self = this;

        list.forEach(item => {
            let $btn = document.createElement('div');
            let $img = document.createElement('img');
            $btn.classList.add('fighter');
            $btn.setAttribute('title', item.name);
            $img.setAttribute('alt', item.name);
            $img.setAttribute('src', item.img);

            $btn.append($img);
            $fightersList.appendChild($btn);

            $btn.addEventListener('click', function () {
                let name = this.getAttribute('title');
                self.init(list, name);
            });
        });

        $logs.classList.remove('hide');
        renderLog('The game begins', 'green');
    }

    resetTemplate = (start, reset, stop, attacks = false) => {
        $startGameBtn.disabled = start;
        $stopGameBtn.disabled = reset;
        $resetGameBtn.disabled = stop;

        if (!reset && !stop && !attacks) {
            $helloScreen.classList.add('hide');
            $fightersList.classList.add('hide');
            $players.forEach(item => {
                item.querySelector('.details').classList.remove('hide');
            });
        } else if (attacks && start) {
            $attacksList.querySelectorAll('button').forEach(item => item.remove());
        } else if (!start) {
            $attacksList.querySelectorAll('button').forEach(item => item.remove());
            $helloScreen.classList.remove('hide');
        }
    }

    generatePokemon = (selector, pokemon) => {
        return new Pokemon({
            selector: selector,
            currentDamage: 0,
            ...pokemon
        })
    }

    resetCards = () => {}

    init = (list, name) => {
        const pokemon = list.find(item => item.name === name);
        const enemiesList = list.filter(item => item.name !== name);
        let self = this;

        let character = this.generatePokemon('player1', pokemon);
        let enemy = this.generatePokemon('player2', enemiesList[random(enemiesList.length - 1)]);

        this.resetTemplate(true, false, false);

        const $control = document.querySelector('.control__fight');
        let playerAttacks = character.attacks;

        this.generateAttacksList = (list) => {
            $control.querySelectorAll('button').forEach(item => item.remove());
            list.forEach(item => {
                let $btn = document.createElement('button');
                $btn.innerText = `${item.name} ${item.maxCount}`;
                $btn.classList.add('button');
                $btn.setAttribute('attack', item.name);
                const counterCharacter = counterKicks(item.maxCount);

                $control.appendChild($btn);

                $btn.addEventListener('click', function() {
                    let counter = counterCharacter(this);
                    let counterAll = allCounter(this);

                    let attackObject = character.attacks.find((item) => item.name === this.getAttribute('attack'));
                    if (character.life !== 0) {
                        self.damageServer(character.id, attackObject.id, enemy.id);
                    }

                    if (counter === 0) {
                        $btn.innerText = `${item.name} 0`;
                        $btn.disabled = true;
                    } else {
                        $btn.innerText = `${item.name} ${counter}`;
                    }

                    if (counterAll === 0) {
                        self.over();
                    }
                });
            });
        }

        this.reset = () => {
            character = this.generatePokemon('player1', pokemon);
            enemy = this.generatePokemon('player2', enemiesList[random(enemiesList.length - 1)]);
            this.generateAttacksList(playerAttacks);
            renderLog('The game was reset', 'green');
        }

        this.resetEnemy = () => {
            enemy = this.generatePokemon('player2', enemiesList[random(enemiesList.length - 1)]);
        }

        this.resetCards = () => {
            character.resetCard();
            enemy.resetCard();
        }

        const counterKicks = (count) => {
            let number = count;

            return function(self) {
                return number -= 1;
            };
        };

        let allCounterNumber = 0;
        playerAttacks.forEach(item => allCounterNumber += item.maxCount);
        const allCounter = counterKicks(allCounterNumber);

        this.generateAttacksList(playerAttacks);

        this.damagePlayers = (result) => {
            const { kick: { player1: characterDamage, player2: enemyDamage } } = result;

            enemy.changeHP(enemyDamage);
            character.changeHP(characterDamage);
        }

        this.renderLog = (self, win = false) => {
            const text = self.selector === 'player1' ? generateLog(self, enemy) : generateLog(self, character);

            if (!win) {
                renderLog(text);
            } else {
                renderLog(win, true);
            }
        }
        renderLog('Fight!');
    }

    damageServer = (character, attack, enemy) => {
        const damageObject = async () => await server(`https://reactmarathon-api.netlify.app/api/fight?player1id=${character}&attackId=${attack}&player2id=${enemy}`);
        damageObject().then(res => this.damagePlayers(res));
    }

    start = () => {
        $fightersList.classList.remove('hide');
        this.resetCards();
        renderLog('Choose your fighter');
    }

    stop = () => {
        this.resetTemplate(false, true, true, true);
        this.resetCards();
        renderLog('The game was stopped', 'green');
    }

    over = () => {
        this.resetTemplate(false, true, true, true);
        renderLog('GAME OVER', 'red');
    }
}
