export function clamp(val, min, max) {
    return (Math.max(min, Math.min(max, val)));
}

export function deg2rad(v) {
    return (v * (Math.PI / 180));
}

export function rad2deg(v) {
    return (v / (Math.PI / 180));
}