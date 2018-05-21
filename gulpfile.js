const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const source = {
    views: './views/**/*.ejs',
    js: './public/js/**/*.js',
    sass: './src/sass/**/*.scss',
    sassMain: './src/sass/main.scss'
};

const dest = {
    css: './dist/css/'
};

// Static Server + watching files
gulp.task('browser-sync', ['sass'], () => {
    browserSync.init(null, {
        proxy: 'localhost:4000'
    });
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    return gulp
        .src(source.sassMain)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(dest.css))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['browser-sync'], () => {
    gulp.watch(source.sass, ['sass']);
    gulp.watch(source.views).on('change', browserSync.reload);
    gulp.watch(source.js).on('change', browserSync.reload);
});
