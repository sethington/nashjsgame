var uglifyOptions = [
    'sequences=true',
    'properties=true',
    'dead_code=true',
    'conditionals=true',
    'evaluate=true',
    'booleans=true',
    'unused=true',
    'hoist_funs=true',
    'join_vars=true',
    'drop_console=true',
    'warnings=false'
];

module.exports = {
    browserify: {
        command: './node_modules/.bin/browserify --entry public/js/init.js --debug > public/js/init.min.js'
    }
};
