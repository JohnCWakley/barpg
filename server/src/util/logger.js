const { inspect } = require('util');
require('colors');

const env = process.env.NODE_ENV || 'production';

class Logger {
    constructor(scope) {
        this.scope = scope;
    }

    _prepare(args) {
        args = args.map((a) => ((typeof a === 'string') ? a : inspect(a)));

        if (this.scope) {
            args.unshift(`[ ${this.scope} ]`);
        }

        args.unshift((new Date()).toISOString().replace('T', ' ').replace('Z', ''));

        return args.join(' ');
    }

    debug(...args) {
         if (env == 'development') {
            console.log(this._prepare(args).grey);
         }
    }

    info(...args) {
        console.log(this._prepare(args).white);
    }

    warn(...args) {
        console.log(this._prepare(args).yellow);
    }

    error(...args) {
        console.log(this._prepare(args).red);
    }

    setScope(scope) {
        this.scope = scope;
    }
}

module.exports = (scope) => (new Logger(scope));