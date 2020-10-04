const buttonCharacter = document.getElementById('btn-kick-character');
const buttonEnemy = document.getElementById('btn-kick-enemy');
const logContainer = document.getElementById('logs');

const character = {
    name: 'Pikachu',
    defaultHP: 200,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgress: document.getElementById('progressbar-character'),
    countDamage: 20,
    damage: changeHP,
    render: renderPerson,
    currentDamage: null
};

const enemy = {
    name: 'Charmander',
    defaultHP: 150,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgress: document.getElementById('progressbar-enemy'),
    countDamage: 20,
    damage: changeHP,
    render: renderPerson,
    currentDamage: null
}

function init() {
    character.render();
    enemy.render();
}

function renderHP(self) {

    const { elHP, damageHP, defaultHP } = self;

    elHP.innerText = `${damageHP} / ${defaultHP}`;
}

function renderProgress(self) {

    const { damageHP, defaultHP, elProgress } = self;

    let text = `${damageHP / defaultHP * 100}%`
    elProgress.style.width = text;
}

function changeHP() {

    const { countDamage, name, defaultHP } = this;

    let currentDamageValue = random(countDamage);
    this.currentDamage = currentDamageValue;

    const log = this === character ? generateLog(this, enemy) : generateLog(this, character);

    if (this.damageHP < currentDamageValue) {

        this.damageHP = 0;

        buttonCharacter.disabled = true;
        buttonEnemy.disabled = true;

        renderLog(`Персонаж ${name} проиграл бой! ${currentDamageValue} [0 / ${defaultHP}]`, true);

    } else {

        this.damageHP -= currentDamageValue;

        renderLog(log);
    }

    this.render();
}

function renderLog(text, finish = false) {
    let $p = document.createElement('p');
    $p.innerText = text;

    if (finish === true) {
        $p.classList.add('log-finish');
    }

    if (logContainer.childElementCount === 5) {
        logContainer.removeChild(logContainer.lastChild);
    }

    logContainer.prepend($p);
}

function renderPerson() {
    renderHP(this);
    renderProgress(this);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function generateLog(firstPerson, secondPerson) {

    const { name : firstName, currentDamage, damageHP, defaultHP } = firstPerson;
    const { name: secondName } = secondPerson;

    const logs = [
        `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага. ${currentDamage} [${damageHP - currentDamage} / ${defaultHP}]`,
        `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага. ${currentDamage}  [${damageHP - currentDamage} / ${defaultHP}]`,
        `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил. ${currentDamage}  [${damageHP - currentDamage} / ${defaultHP}]`,
        `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар. ${currentDamage}  [${damageHP - currentDamage} / ${defaultHP}]`,
        `${firstName} поперхнулся, но в это время ${secondName} нехотя раздробил кулаком \<вырезанно цензурой\> противника. ${currentDamage}  [${damageHP - currentDamage} / ${defaultHP}]`,
        `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар. ${currentDamage}  [${damageHP - currentDamage} / ${defaultHP}]`,
        `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар. ${currentDamage}  [${damageHP - currentDamage} / ${defaultHP}]`,
        `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника. ${currentDamage}  [${damageHP - currentDamage} / ${defaultHP}]`,
        `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника. ${currentDamage}  [${damageHP - currentDamage} / ${defaultHP}]`,
        `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику. ${currentDamage}  [${damageHP - currentDamage} / ${defaultHP}]`
    ];

    return logs[random(logs.length) - 1];
}

buttonCharacter.addEventListener('click', function() {
    character.damage();
});

buttonEnemy.addEventListener('click', function() {
    enemy.damage();
});

init();