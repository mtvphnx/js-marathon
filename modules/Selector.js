export default class Selector {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgress = document.getElementById(`progressbar-${name}`);
        this.elButton = document.getElementById(`btn-kick-${name}`);
    }
}