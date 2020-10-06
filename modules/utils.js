const logContainer = document.getElementById('logs');

export function random(num) {
    return Math.ceil(Math.random() * num);
}

export function generateLog(firstPerson, secondPerson) {
    const { name : firstName, currentDamage, damageHP, defaultHP } = firstPerson;
    const { name: secondName } = secondPerson;
    const logs = [
        `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага. ${currentDamage} [${damageHP} / ${defaultHP}]`,
        `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага. ${currentDamage}  [${damageHP} / ${defaultHP}]`,
        `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил. ${currentDamage}  [${damageHP} / ${defaultHP}]`,
        `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар. ${currentDamage}  [${damageHP} / ${defaultHP}]`,
        `${firstName} поперхнулся, но в это время ${secondName} нехотя раздробил кулаком \<вырезанно цензурой\> противника. ${currentDamage}  [${damageHP} / ${defaultHP}]`,
        `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар. ${currentDamage}  [${damageHP} / ${defaultHP}]`,
        `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар. ${currentDamage}  [${damageHP} / ${defaultHP}]`,
        `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника. ${currentDamage}  [${damageHP} / ${defaultHP}]`,
        `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника. ${currentDamage}  [${damageHP} / ${defaultHP}]`,
        `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику. ${currentDamage}  [${damageHP} / ${defaultHP}]`
    ];

    return logs[random(logs.length) - 1];
}

export function renderLog(text, finish = false) {
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