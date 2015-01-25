module.exports = function(grunt) {
  grunt.initConfig({
    ts: {
      default : {
        src: ["*.ts", "!node_modules/**/*.ts"],
        out: "game.js",
        options: {
        	fast: 'never'
      	},
      }
    },
    watch: {
    scripts: {
      files: ['*.ts'],
      tasks: ['ts'],
      options: {
        spawn: false,
      },
    },
  }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.registerTask("default", ["watch"]);
};