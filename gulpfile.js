var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    cssImport = require('postcss-import'),
    nested = require('postcss-nested'),
    simpleVar = require('postcss-simple-vars'),
    autoprefixer = require('autoprefixer'),
    mixin = require('postcss-mixins'),
    browserSync = require('browser-sync').create();
    
    gulp.task('default', function() {
        console.log('default gulp code is working....');
    })
    
    gulp.task('html', function() {
        console.log('html file has been updated....');
    })
    
    gulp.task('style', function() {
        gulp.src('./assets/styles/**/*.css')
        .pipe(postcss([cssImport, autoprefixer, nested, simpleVar, mixin]))
        .on('error', function(errInfo) {
            console.log(errInfo.toString);
            this.emit('end');
        })
        .pipe(gulp.dest('./temp/styles'));
    })
    
    gulp.task('watch', function() {
        
        browserSync.init({
            server: {
                baseDir: 'personSite-prototype-one'
            }
        })
        
        watch('./index.html', function() {
            browserSync.reload();
        })
        
        watch('./assets/styles/**/*.css', function() {
            gulp.start('cssInject');
        })
    })
    
    gulp.task('cssInject', ['style'] ,function() {
        return gulp.src('./temp/styles/style.css')
                .pipe(browserSync.stream());
    })