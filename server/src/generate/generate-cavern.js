const { xy, Rand2DBuffer } = require('./generate-utils');

const log = require('../util/logger')('generate:cavern');

exports.GenerateCavern = function (size = 32, passes = 1) {
    log.debug('GenerateCavern(size, passes):', size, passes);

    const buffer = Rand2DBuffer(size, [ 0, 1 ]);

    const FLOOR = 0;
    const WALL = 1;

    var prev_buffer = { ...buffer };
    var start = Date.now();

    while (passes) {
        passes -= 1;

        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                var count = 0;

                if (x > 0 && prev_buffer[xy(x - 1, y)] == FLOOR) count++; // w
                if (x > 0 && y > 0 && prev_buffer[xy(x - 1, y - 1)] == FLOOR) count++; // nw
                if (y > 0 && prev_buffer[xy(x, y - 1)] == FLOOR) count++; // n
                if (x < size - 1 && y > 0 && prev_buffer[xy(x + 1, y - 1)] == FLOOR) count++; // ne
                if (x < size - 1 && prev_buffer[xy(x + 1, y)] == FLOOR) count++; // e
                if (x < size - 1 && y < size - 1 && prev_buffer[xy(x + 1, y + 1)] == FLOOR) count++; // se
                if (y < size - 1 && prev_buffer[xy(x, y + 1)] == FLOOR) count++; // s
                if (x > 0 && y < size - 1 && prev_buffer[xy(x - 1, y + 1)] == FLOOR) count++; // sw

                if (prev_buffer[xy(x, y)] == FLOOR && count < 4) buffer[xy(x, y)] = WALL;
                else if (prev_buffer[xy(x, y)] == WALL && count > 4) buffer[xy(x, y)] = FLOOR;
            }
        }

        prev_buffer = { ...buffer };
    }

    log.debug('apply_cellular_automata time:', Date.now() - start);

    return buffer;
}