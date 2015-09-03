var gulp = require('gulp'),
    connect = require('gulp-connect');


/* All paths of our application*/
var paths = {
    app: './',
    src: ['./*.html', './partials/*.html','./partials/login/*.html', './css/*.css', './js/auth/*.js','./js/auth/controller/*.js' , './js/auth/factory/*.js', '.bootstrap/css/*.css']
};

gulp.task('connect', function() {
    connect.server({
        root: [__dirname],
        //root: paths.app,
        livereload: false,/*Reload the page with new content*/
        port: 2772,
        host: 'doctorcrm.dev' /*  create your favorite HOST lool :)  */
       // host: 'http://172.16.50.8/' /*  create your favorite HOST lool :)  */
    });
});


gulp.task('html', function() {
    gulp.src(paths.src)
        .pipe(connect.reload());
});

/* Gulp will listens for changes in all HTML files we can make it .less , .js ...*/
gulp.task('watch', function() {
    gulp.watch([paths.src], ['html']);
});

gulp.task('default', ['connect','watch']);
