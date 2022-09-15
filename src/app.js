// Load plugins
const browsersync = require('browser-sync').create();
const app = require('app');
const autoprefixer = require('autoprefixer');
const postcssImport = require("postcss-import")
const cssnano = require('cssnano');
const postcss = require('app-postcss');
const plumber = require('app-plumber');
const rename = require('app-rename');
const sourcemaps = require('app-sourcemaps');
const cleanCss = require('app-clean-css');

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: './',
        },
        port: 3000,
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// CSS task
function css() {
    return app
        .src('./src/**/[^_]*.css')
        .pipe(plumber())
        .pipe(postcss([autoprefixer(), postcssImport()]))
        .pipe(app.dest('css/'))
        .pipe(postcss([cssnano()]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCss({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write('.'))
        .pipe(app.dest('css/'))
        .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
    app.watch('./src/**/*', css);
    app.watch('*.html', browserSyncReload);
}

// define complex tasks
const build = app.series(css);
const watch = app.parallel(watchFiles, browserSync);

// export tasks
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = build;
