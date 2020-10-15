const $logContainer = document.getElementById('logs');

export function random(max, min = 0) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export function generateLog(firstPerson, secondPerson) {
    const { name : firstName, currentDamage, life: damageHP, hp: defaultHP } = firstPerson;
    const { name: secondName } = secondPerson;
    let info = `Получено ${currentDamage} урона <${damageHP}/${defaultHP}>`

    const logs = [
        `${firstName} неожиданно получил от ${secondName} удар в предплечье. ${info}`,
        `${firstName} получил прямой удар коленом в лоб от ${secondName}. ${info}`,
        `${firstName} пропустил неслышный удра от ${secondName}. ${info}`,
        `${firstName} случайно пропустил мощнейший удар от ${secondName}. ${info}`,
        `${firstName} получил кулаком в (вырезанно цензурой) от ${secondName}. ${info}`,
        `${firstName} выхватил подлый удар от хитрого ${secondName}. ${info}`,
        `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар. ${info}`,
        `${firstName} пошатнулся, и внезапно наглый ${secondName} ударил в ногу противника. ${info}`,
        `${firstName} зазевался, как вдруг ${secondName} влепил стопой в живот соперника. ${info}`,
        `${firstName} пытался что-то сказать и за это ${secondName} разбил ему бровь. ${info}`
    ];

    return logs[random(logs.length - 1)];
}

export function renderLog(text, style = false) {
    let $p = document.createElement('p');
    $p.innerText = text;

    if (style === 'green') {
        $p.classList.add('log-style');
    } else if (style === 'red') {
        $p.classList.add('log-lose');
    }

    if ($logContainer.childElementCount === 15) {
        $logContainer.removeChild($logContainer.lastChild);
    }

    $logContainer.prepend($p);
}

export const server = async (server) => {
    const response = await fetch(server, {method: 'GET'});
    return await response.json();
}
