const { choose } = require('../util/rng')
const log = require('../util/logger')('generate-utils');

const xy = (x, y) => `${x}x${y}`;

function Rand2DBuffer(size = 32, value = 0) {
    const buffer = { size };

    for (let x = 0; x < size; x++)
        for (let y = 0; y < size; y++)
            buffer[xy(x, y)] = choose(value);

    return buffer;
}

module.exports = { xy, Rand2DBuffer };