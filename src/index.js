import Game from '@/components/Game';
import {server} from '@/components/utils';

import '@/styles/style.scss';

const $start = document.getElementById('btn-start');
const $stop = document.getElementById('btn-stop');
const $reset = document.getElementById('btn-reset');

export const game = new Game();
const getList = async () => await server('https://reactmarathon-api.netlify.app/api/pokemons');
getList().then((res) => game.generateFighters(res));

$start.addEventListener('click', () => game.start());
$stop.addEventListener('click', () => game.stop());
$reset.addEventListener('click', () => game.reset());
