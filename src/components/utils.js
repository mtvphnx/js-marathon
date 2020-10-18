const $logContainer = document.getElementById('logs');

export function random(max, min = 0) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export function generateLog(firstPerson, secondPerson) {
    const {name: firstName, currentDamage, life: damageHP, hp: defaultHP} = firstPerson;
    const {name: secondName} = secondPerson;
    const info = `Получено ${currentDamage} урона <${damageHP}/${defaultHP}>`;

    const logs = [
        `${firstName} получил от ${secondName} в предплечье. ${info}`,
        `${firstName} получил коленом в лоб от ${secondName}. ${info}`,
        `${firstName} пропустил удар от ${secondName}. ${info}`,
        `${firstName} случайно пропустил удар от ${secondName}. ${info}`,
        `${firstName} получил кулаком от ${secondName}. ${info}`,
        `${firstName} выхватил удар от ${secondName}. ${info}`,
        `${firstName} неожиданно пропустил пинок ${secondName}. ${info}`,
        `${firstName} пошатнулся от резкого удара ${secondName}. ${info}`,
        `${firstName} зазевался, за что и пропустил от ${secondName}. ${info}`,
        `${firstName} отвлекся и ${secondName} разбил ему бровь. ${info}`
    ];

    return logs[random(logs.length - 1)];
}

export function renderLog(text, style = false) {
    const $p = document.createElement('p');
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
};
