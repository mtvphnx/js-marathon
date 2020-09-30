const buttonCharacter = document.getElementById('btn-kick-character');
const buttonEnemy = document.getElementById('btn-kick-enemy');

const character = {
    name: 'Pikachu',
    defaultHP: 200,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgress: document.getElementById('progressbar-character'),
    countDamage: 20,
    damage: changeHP,
    render: renderPerson
};

const enemy = {
    name: 'Charmander',
    defaultHP: 150,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgress: document.getElementById('progressbar-enemy'),
    countDamage: 20,
    damage: changeHP,
    render: renderPerson
}

function init() {
    character.render();
    enemy.render();
}

function renderHP(self) {
    self.elHP.innerText = `${self.damageHP} / ${self.defaultHP}`;
}

function renderProgress(self) {
    let text = `${self.damageHP / self.defaultHP * 100}%`
    self.elProgress.style.width = text;
}

function changeHP() {

    if (this.damageHP < this.countDamage) {
        this.damageHP = 0;

        buttonCharacter.disabled = true;
        buttonEnemy.disabled = true;

        let name = this.name;

        setTimeout(function() {
            alert(`Персонаж ${name} проиграл бой!`);
        }, 500);

    } else {
        this.damageHP -= random(this.countDamage);
    }

    this.render();

}

function renderPerson() {
    renderHP(this);
    renderProgress(this);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

buttonCharacter.addEventListener('click', function() {
    character.damage();
});

buttonEnemy.addEventListener('click', function() {
    enemy.damage();
});

init();