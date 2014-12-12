module.exports = {
    options: {
        livereload: true,
    },
    html: {
        files: ['*.html', 'public/js/**/*.html'],
    },
    js: {
        files: ['public/js/**/*.js', '!public/js/init.min.js', 'public/js/**/*.html', 'tests/public/js/**/*.js'],
        tasks: ['shell:browserify', 'mochaTest:test'],
    },
    css: {
        files: ['public/css/**/*.css'],
    }
};
