var gulp = require('gulp'),
    typescript = require('gulp-typescript'),
    nodemon = require('gulp-nodemon'),
    watchedFiles = [
      'src/**/*.ts'
    ],
    typescriptConfig = {
      // See https://www.npmjs.com/package/gulp-typescript

      // Generates one javascript and one definition file. Only works when no
      // module system is used.
      //out: 'somefile.js',

      // Do not emit comments to output.
      removeComments: false,

      // Warn on expressions and declarations with an implied 'any' type.
      noImplicitAny: true,

      // Do not include the default library (Date, Array, String, etc).
      noLib: false,

      // Do not emit outputs if any type checking errors were reported.
      noEmitOnError: false,

      // Specify ECMAScript target version: 'ES3' (default), 'ES5' or 'ES6'.
      target: 'ES5',

      // Specify module code generation: 'commonjs' or 'amd'.
      module: 'commonjs',

      // Specifies the location where debugger should locate TypeScript files
      // instead of source locations.
      //sourceRoot: '',

      // Generates corresponding .d.ts files.
      declarationFiles: true,

      // Do not resolve files that are not in the input.
      noExternalResolve: false,

      // Sort output files. Useful if you want to concatenate files.
      //sortOutput: true
    },
    nodemonConfig = {
      cwd: 'lib/js',
      script: 'index.js',
      ext: 'ts',
      tasks: [
        'compile',
        'typings'
      ],
      watch: [
        '../../src'
      ],
      env: {
        DEBUG: 1
      }
    };

gulp.task('compile', function() {
  return gulp.src(watchedFiles)
    .pipe(typescript(typescriptConfig))
    .js.pipe(gulp.dest('lib/js'));
});

gulp.task('typings', function() {
  return gulp.src(watchedFiles)
    .pipe(typescript(typescriptConfig))
    .dts.pipe(gulp.dest('lib/typings'));
});

gulp.task('serve', nodemonConfig.tasks, function() {
  nodemon(nodemonConfig);
});

gulp.task('default', ['serve']);
