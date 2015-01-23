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
    }
  });


  grunt.loadNpmTasks("grunt-ts");
  grunt.registerTask("default", ["ts"]);
};