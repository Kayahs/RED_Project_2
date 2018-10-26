var gulp = require('gulp');

var uglify = require('gulp-uglify'), 
	rename = require('gulp-rename'), 
	browserSync = require('browser-sync'),
	eslint = require('gulp-eslint'),
	clean = require('gulp-clean'),
	sass = require('gulp-sass')
	cleanCSS = require('gulp-clean-css');

gulp.task('scripts', ['cleanJS'],/*['lint'],*/ function() {
	return gulp.src('./scripts/*.js')
	.pipe(uglify())
	.pipe(rename({extname: '.min.js'}))
	.pipe(gulp.dest('./build/js'));
});

gulp.task('watch', ['browser-sync', 'default'], function() {
	gulp.watch(['scripts/*.js', 'styles/sass/*.scss'], ['scripts', 'styles']);
});

gulp.task('browser-sync', function() {
	browserSync.init(['scripts/*.js', 'styles/sass/*.scss'],{
		server: {
			baseDir: "./"
		}
	});
});

gulp.task('scsstocss', function() {
	return gulp.src('./styles/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./styles/css'));
});

gulp.task('styles', ['scsstocss', 'cleanCSS'], function() {
	return gulp.src('./styles/css/*.css')
	.pipe(cleanCSS())
	.pipe(rename({extname: '.min.css'}))
	.pipe(gulp.dest('./build/css'));
})

gulp.task('default',  ['styles', 'scripts'], function() {

});


/*gulp.task('lint', function() {
	gulp.src('./scripts/*.js').pipe(eslint({
		"extends": "eslint:recommended",
		"rules": {
			"no-alert": 1,
			"camelcase": 1,
			"curly": 1,
			"eqeqeq": 1,
			"no-console": 1,
			"guard-for-in": 1,
			"no-empty": 1,
			"no-param-reassign": 1,
			"no-unused-vars": 1,
			"quotes": [ 1, "single"]
		},
		"globals": {
		    "jQuery": false,
		    "$": false
		},
		"env": {
		"browser": true
		}
	}));
});
*/
gulp.task('clean', function() {
	return gulp.src('build/**/*.*').pipe(clean());
});

gulp.task('cleanJS', function() {
	return gulp.src('build/**/*.js').pipe(clean());
});

gulp.task('cleanCSS', function() {
	return gulp.src('build/**/*.css').pipe(clean());
});