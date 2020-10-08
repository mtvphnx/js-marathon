export default class Manage {
    constructor(name) {
        this.name = name;
    }

    start = () => {
        console.log('start', name);
    }

    stop = () => {
        console.log('stop', name);
    }

    reset= () => {
        console.log('reset', name);
    }
}