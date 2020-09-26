const buttonCharacter = document.getElementById('btn-kick-character');
const buttonEnemy = document.getElementById('btn-kick-enemy');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgress: document.getElementById('progressbar-character')
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgress: document.getElementById('progressbar-enemy')
}

character.damage = function() {
    changeHP(character, random(20));
};

enemy.damage = function() {
    changeHP(enemy, random(20));
};

function init() {
    renderPersons(character, enemy);
}

function renderHP(person) {
    person.elHP.innerText = `${person.damageHP} / ${person.defaultHP}`;
}

function renderProgress(person) {
    person.elProgress.style.width = `${person.damageHP}%`;
}

function changeHP(person, count) {

    if (person.damageHP < count) {
        person.damageHP = 0;

        buttonCharacter.disabled = true;
        buttonEnemy.disabled = true;

        setTimeout(function() {
            alert(`Персонаж ${person.name} проиграл бой!`);
        }, 500);
    } else {
        person.damageHP -= count;
    }

    renderPersons(character, enemy);

}

function renderPersons() {

    for (let x = 0; x < arguments.length; x++) {
        renderHP(arguments[x]);
        renderProgress(arguments[x]);
    }

}

function random(num) {
    return Math.ceil(Math.random() * num);
}

buttonCharacter.addEventListener('click', character.damage);
buttonEnemy.addEventListener('click', enemy.damage);

init();