import Selector from "./Selector.js";
import { random } from "./utils.js";

export default class Pokemon extends Selector {
    constructor({ name, defaultHP, damageHP, type, selector, countDamage, currentDamage, hits }) {
        super(selector);

        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = damageHP;
        this.type = type;
        this.countDamage = countDamage;
        this.currentDamage = currentDamage;
        this.hits = hits;

        this.renderPerson();
    }

    renderHP = () => {
        const { elHP, damageHP, defaultHP } = this;
        elHP.innerText = `${damageHP} / ${defaultHP}`;
    }

    renderProgress = () => {
        const { damageHP, defaultHP, elProgress } = this;
        elProgress.style.width = `${damageHP / defaultHP * 100}%`;
    }

    renderCounter = () => {
        const { elButton, hits } = this;
        elButton.querySelector('span').innerText = hits;
    }

    changeHP = (log) => {
        const { name, defaultHP } = this;
        let currentDamageValue = random(20);
        this.currentDamage = currentDamageValue;

        if (this.damageHP <= currentDamageValue) {
            this.damageHP = 0;
            log(this, `Персонаж ${name} проиграл бой! ${currentDamageValue} [0 / ${defaultHP}]`);
        } else {
            this.damageHP -= currentDamageValue;
            log(this);
        }

        this.renderPerson();
    }

    counterKicks = (count) => {
        let number = count;

        return function(self) {
            const { elButton, name, damageHP, currentDamage } = self;
            number -= 1;

            if (number === 0) {
                elButton.querySelector('span').innerText = number;
                elButton.disabled = true;
            } else {
                elButton.querySelector('span').innerText = number;
            }
        };
    }

    renderPerson = () => {
        this.renderHP();
        this.renderProgress();
        this.renderCounter();
    }
}