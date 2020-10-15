import Selector from "./Selector.js";
import { renderLog } from "./utils.js";
import { game } from "./app.js";

export default class Pokemon extends Selector {
    constructor({ id, name, selector, img, hp, currentDamage, attacks }) {
        super(selector);
        this.id = id;
        this.name = name;
        this.img = img;
        this.hp = hp;
        this.life = hp;
        this.attacks = attacks;
        this.selector = selector;
        this.currentDamage = currentDamage;

        this.renderPerson();
    }

    renderPerson = () => {
        this.renderCard()
        this.renderHP();
        this.renderProgress();
    }

    renderHP = () => {
        const { elHP, hp, life } = this;
        elHP.innerText = `${life} / ${hp}`;
    }

    renderProgress = () => {
        const { elProgress, life, hp } = this;
        let percent = life / hp * 100;
        elProgress.style.width = `${percent}%`;
        if (percent < 60 && percent > 20) {
            elProgress.classList.add('low');
        } else if (percent < 20) {
            elProgress.classList.add('critical');
        } else {
            elProgress.classList.remove('low');
            elProgress.classList.remove('critical');
        }
    }

    renderCard = () => {
        const { elImg, elName, name, img } = this;
        elImg.setAttribute('src', img);
        elImg.setAttribute('alt', name);
        elName.innerText = name;
    }

    resetCard = () => {
        const { elImg, elName, el } = this;
        elImg.src = '';
        elImg.setAttribute('alt', '');
        elName.innerText = '';
        el.querySelector('.details').classList.add('hide');
    }

    changeHP = (damage) => {
        const { life, hp, name, selector } = this;
        this.currentDamage = damage;

        if (life <= damage) {
            if (selector === 'player1') {
                this.life = 0;
                this.renderPerson();
                renderLog(`${name} проиграл бой. Получено ${damage} урона <0/${hp}>`, 'red');
                game.over();
            } else if (selector === 'player2') {
                this.life = 0;
                renderLog(`${name} проиграл бой получив ${damage} урона <0/${hp}>`);
                game.resetEnemy();
            }
        } else {
            this.life -= damage;
            game.renderLog(this);
            this.renderPerson();
        }
    }
}
