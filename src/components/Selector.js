export default class Selector {
    constructor(name) {
        this.el = document.querySelector(`.${name}`);
        this.elImg = document.querySelector(`.${name} .sprite`);
        this.elName = document.getElementById(`name-${name}`);
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgress = document.getElementById(`progressbar-${name}`);
    }
}
