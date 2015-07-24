var gulp = require('gulp'),
  connect = require('gulp-connect'),
	minifyCSS = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat')
;

gulp.task('css', function() {
	return gulp.src('src/css/**/*.css')
		.pipe(concat('main.unmin.css'))
		.pipe(gulp.dest('src/css'))
		.pipe(minifyCSS())
		.pipe(concat('main.min.css'))
		.pipe(gulp.dest('build/css'))
});

gulp.task("concatSourceJS", function() {
	return gulp.src([
			'src/js/libs/leaflet.min.js',
			'src/js/libs/heatmap.min.js',
			'src/js/libs/leaflet-heatmap.unmin.js',
			'src/js/app.unmin.js'
		])
		.pipe(concat('main.unmin.js', {newLine: '\r\n;'}))
		.pipe(jshint())
		.pipe(gulp.dest('src/js'))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
});

gulp.task('concatBuildJS', function() {
	return gulp.src([
			'src/js/libs/leaflet.min.js',
			'src/js/libs/heatmap.min.js',
			'src/js/libs/leaflet-heatmap.unmin.js',
			'src/js/app.unmin.js'
		])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
});

gulp.task('watch', function () {
	gulp.watch(['src/css/**/*.css', '!src/css/main.unmin.css'], ['css']);
	gulp.watch(['src/js/**/*.unmin.js', '!src/js/main.unmin.js'], ['concatSourceJS']);
});

// serve content within options.root value
gulp.task('webserver', function() {
  connect.server({
    root: ['build','src'],
    port: 8080,
    livereload: true
  });
});

gulp.task('default',['webserver', 'watch']);
