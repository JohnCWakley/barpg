import { choose, randi } from './rng'

export function rand_2d_buffer(s, v = 0) {
    var buffer = [];

    for (var x = 0; x < s; x++) {
        buffer.push([])
        for (var y = 0; y < s; y++) {
            buffer[x].push(choose(v));
        }
    }

    return buffer;
}

export function generate_cavern(buffer, passes = 5) {
    const FLOOR = 0;
    const WALL = 1;
    const size = buffer.length;

    var prev_buffer = [].concat(buffer);
    var start = Date.now();

    while (passes) {
        passes -= 1;

        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                var count = 0;

                if (x > 0 && prev_buffer[x - 1][y] == FLOOR) count++; // w
                if (x > 0 && y > 0 && prev_buffer[x - 1][y - 1] == FLOOR) count++; // nw
                if (y > 0 && prev_buffer[x][y - 1] == FLOOR) count++; // n
                if (x < size - 1 && y > 0 && prev_buffer[x + 1][y - 1] == FLOOR) count++; // ne
                if (x < size - 1 && prev_buffer[x + 1][y] == FLOOR) count++; // e
                if (x < size - 1 && y < size - 1 && prev_buffer[x + 1][y + 1] == FLOOR) count++; // se
                if (y < size - 1 && prev_buffer[x][y + 1] == FLOOR) count++; // s
                if (x > 0 && y < size - 1 && prev_buffer[x - 1][y + 1] == FLOOR) count++; // sw
        
                if (prev_buffer[x][y] == FLOOR && count < 4) buffer[x][y] = WALL;
                else if (prev_buffer[x][y] == WALL && count > 4) buffer[x][y] = FLOOR;
            }
        }

        prev_buffer = [].concat(buffer);
    }

    console.log('apply_cellular_automata time:', Date.now() - start);

    return buffer;
}
