const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const viewsLocation = './views/**/*.ejs';
const sassLocation = './public/sass/**/*.scss';
const cssLocation = './public/css/';

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], () => {
    browserSync.init(null, {
        proxy: 'localhost:5000'
    });

    gulp.watch(sassLocation, ['sass']);
    gulp.watch(viewsLocation).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    return gulp
        .src(sassLocation)
        .pipe(sass())
        .pipe(gulp.dest(cssLocation))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
