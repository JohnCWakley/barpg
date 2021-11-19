// Adapted from: https://gist.github.com/blixt/f17b47c62508be59987b

var _seed = Date.now() % 2147483647;

export const randi = () => (_seed = _seed * 16807 % 2147483647);

export const randf = () => ((randi() - 1) / 2147483646);

export const randi_range = (l, h) => (l + randi() % (h - l));

export const chance = (p) => (p < 1 ? (randf() < p) : (randi_range(1, 100) < p));

export const choose = (v) => (Array.isArray(v) ? v[randi() % v.length] : v);

export const seed = (seed) => {
    if (typeof seed === 'number') {
        if (seed === 0) {
            seed = 1;
        }
        
        _seed = Math.floor(seed) % 2147483647;
    } else if (seed !== undefined) {
        console.warn('seed must be a number')
    } else {
        return _seed;
    }
}
