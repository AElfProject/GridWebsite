module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			my_target: {
				files: {
					'dist/legend-plugin.min.js': [
						'build/js/plugin/plugin.js'
					],
					'dist/legend-common.min.js': [
						'build/js/plugin/common-pop-alert.js',
						'build/js/plugin/common-pop-load.js',
						'build/js/plugin/common-pop-tip.js',
						'build/js/plugin/common-pop-toast.js',
						'build/js/plugin/common.js',
					],
					'dist/legend-main.min.js': [
						'build/js/public.js',
						'build/js/main.js'
					],
					'dist/other-plugin.min.js': [
						'build/plugin/modernizr.custom.06204.js',
						'build/plugin/respond.min.js',
						'build/plugin/jquery.mousewheel.js',
						'build/plugin/perfect-scrollbar.js',
						//'build/plugin/echarts.simple.min.js',
						'build/plugin/swiper-3.4.2.jquery.min.js',
						'build/plugin/particles.js',
						'build/plugin/three.js',
						'build/plugin/Projector.js',
						'build/plugin/CanvasRenderer.js'
					],
					'dist/all.min.js': [
						'dist/other-plugin.min.js',
						'dist/legend-plugin.min.js',
						'dist/legend-common.min.js',
						'dist/legend-main.min.js'
					]
				}
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			basic_and_extras : {
				files: {
					'build/config.scss' : [
						'build/css/config/config.scss',
						'build/css/config/mixin.scss',
						'build/css/config/button.scss',
						'build/css/config/layout.scss',
						'build/css/config/grid.scss'
					],
					'build/layout.scss' : [
						'build/config.scss',

						'build/css/layout/grid.scss',
						'build/css/layout/layout.scss'
					],
					'build/base.scss' : [
						'build/config.scss',

						'build/css/base/reset.scss',
						'build/css/base/base.scss',
						'build/css/base/browserscroll.scss',
						'build/css/base/button.scss',
						'build/css/base/responsive.scss',
						'build/css/base/form.scss',
						'build/css/base/color.scss',
						'build/css/base/font.scss'
					],
					'build/theme.scss' : [
						'build/config.scss',

						'build/css/theme/form.scss',
						'build/css/theme/pop-tip.scss',
						'build/css/theme/pop-load.scss',
						'build/css/theme/pop-alert.scss',
						'build/css/theme/pop-toast.scss'
					],
					'build/page.scss' : [
						'build/config.scss',

						'build/css/page/cm-shadow.scss',
						'build/css/page/cm-icon.scss',
						'build/css/page/cm-form.scss',
						'build/css/page/cm-button.scss',
						'build/css/page/cm-list.scss',
						'build/css/page/cm-component.scss',

						'build/css/page/pg-header.scss',
						'build/css/page/pg-footer.scss',
						'build/css/page/pg-index.scss',
						'build/css/page/pg-main.scss'
					],
					'build/theme-and-page.scss' : [
						'build/base.scss',

						'build/css/theme/form.scss',
						'build/css/theme/pop-tip.scss',
						'build/css/theme/pop-load.scss',
						'build/css/theme/pop-alert.scss',
						'build/css/theme/pop-toast.scss',

						'build/css/page/cm-shadow.scss',
						'build/css/page/cm-icon.scss',
						'build/css/page/cm-form.scss',
						'build/css/page/cm-button.scss',
						'build/css/page/cm-list.scss',
						'build/css/page/cm-component.scss',

						'build/css/page/pg-header.scss',
						'build/css/page/pg-footer.scss',
						'build/css/page/pg-index.scss',
						'build/css/page/pg-main.scss'
					],
					'build/responsive.scss' : [
						'build/config.scss',

						'build/css/responsive/rp-gt.scss',
						'build/css/responsive/rp-lg.scss',
						'build/css/responsive/rp-md.scss',
						'build/css/responsive/rp-sm.scss',
						'build/css/responsive/rp-tn.scss'
					]
				}
			}
		},

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'build/layout.css': [
						'build/layout.scss'
					],
					'build/theme.css': [
						'build/theme.scss'
					],
					'build/page.css': [
						'build/page.scss'
					],
					'build/theme-and-page.css': [
						'build/theme-and-page.scss'
					],
					'build/responsive.css': [
						'build/responsive.scss'
					]
				}
			}
		},

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/plugin.min.css': [
						'build/plugin/perfect-scrollbar.css',
						'build/plugin/swiper.min.css',
						'build/plugin/animate.css'
					],
					'dist/layout.min.css': [
						'build/layout.css'
					],
					'dist/theme.min.css': [
						'build/theme.css'
					],
					'dist/page.min.css': [
						'build/page.css'
					],
					'dist/theme-and-page.min.css': [
						'build/theme-and-page.css'
					],
					'dist/responsive.min.css': [
						'build/responsive.css'
					],
					'dist/all.min.css': [
						'dist/plugin.min.css',
						'dist/layout.min.css',
						'build/theme-and-page.css',
						'build/responsive.css'
					]
				}
			}
		},

		watch: {
			scripts: {
				files: [
					'Gruntfile.js',
					'build/js/package/*.js',
					'build/js/*.js',
					'build/js/plugin/*.js',
					'build/plugin/*.js',
					'build/css/config/*.scss',
					'build/css/base/*.scss',
					'build/css/theme/*.scss',
					'build/css/page/*.scss',
					'build/css/layout/*.scss',
					'build/css/responsive/*.scss',
					'build/plugin/*.css'
				],
				tasks: ['uglify', 'concat', 'sass', 'cssmin'],
				options: {
					spawn: false
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'watch']);
};
