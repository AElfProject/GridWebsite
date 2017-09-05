;$(function(){
	$('.section-1').height($(window).height());
	$('.section-2').height($(window).height());
	//$('.section-3').height($(window).height() / 2);


	if($('.section-6').length){
		var curIndex = 0;
		var allTxt = $('.section-6').find('.hide-txt li');
		var len = allTxt.length - 1;
		var prev = $('.section-6').find('.prev .btn');
		var next = $('.section-6').find('.next .btn');
		var curBox = $('.section-6').find('.cur-value');
		var prevBox = $('.section-6').find('.prev-value');
		var nextBox = $('.section-6').find('.next-value');
		var update = function(){
			console.log(curIndex);
			curBox.find('h3').html(allTxt.eq(curIndex).find('span').html());
			curBox.find('p').html(allTxt.eq(curIndex).find('p').html());

			if(curIndex > 0){
				prevBox.find('h4').html(allTxt.eq(curIndex - 1).find('span').html());
			}else {
				prevBox.find('h4').html('');
			}
			if(curIndex < len){
				nextBox.find('h4').html(allTxt.eq(curIndex + 1).find('span').html());
			}else{
				nextBox.find('h4').html('');
			}
		};
		prev.bind('click', function(){
			if(curIndex > 0){
				curIndex -= 1;
				update();
			}
		});
		next.bind('click', function(){
			if(curIndex < len){
				curIndex += 1;
				update();
			}
		});
		update();
	}


	if($('#particles').length){
		particlesJS('particles', {
			particles: {
				color: '#fff',
				shape: 'circle',
				opacity: 1,
				size: 4,
				size_random: true,
				nb: 50,
				line_linked: {
					enable_auto: true,
					distance: ($(window).width() <= 768) ? 100 : 250,
					color: '#fff',
					opacity: 1,
					width: 1,
					condensed_mode: {
						enable: false,
						rotateX: 600,
						rotateY: 600
					}
				}
			},
			interactivity: {
				enable: true,
				mouse: {
					distance: 300
				},
				detect_on: 'canvas', // "canvas" or "window"
				mode: 'grab',
				line_linked: {
					opacity: .5
				},
				events: {
					onclick: {
						enable: true,
						mode: 'push', // "push" or "remove"
						nb: 4
					}
				}
			},
			/* Retina Display Support */
			retina_detect: true
		});
	}
});

;$(function(){
	var SCREEN_WIDTH = window.innerWidth,
		SCREEN_HEIGHT = window.innerHeight,
		mouseX = 0, mouseY = 0,
		windowHalfX = window.innerWidth / 2,
		windowHalfY = window.innerHeight / 2,
		SEPARATION = 200,
		AMOUNTX = 10,
		AMOUNTY = 10,
		camera, scene, renderer, group;
	init();
	animate();
	function init() {
		var container, separation = 100, amountX = 50, amountY = 50;
		container = $('.earth').get(0);
		camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
		camera.position.z = 1300;
		scene = new THREE.Scene();
		renderer = new THREE.CanvasRenderer({
			alpha: true
		});
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
		renderer.setClearColor( 0xffffff, 0 );
		container.appendChild( renderer.domElement );
		group = new THREE.Group();
		scene.add( group );
		// particles
		var PI2 = Math.PI * 2;
		var material = new THREE.SpriteCanvasMaterial({
			color: 0xffffff,
			program: function ( context ) {
				context.beginPath();
				context.arc( 0, 0, 0.5, 0, PI2, true );
				context.fill();
			}
		} );
		for ( var i = 0; i < 1000; i ++ ) {
			var particle = new THREE.Sprite( material );
			particle.position.x = Math.random() * 2 - 1;
			particle.position.y = Math.random() * 2 - 1;
			particle.position.z = Math.random() * 2 - 1;
			particle.position.normalize();
			particle.position.multiplyScalar( Math.random() * 10 + 450 );
			particle.scale.multiplyScalar( 2 );
			group.add(particle);
		}
		// lines
		for (var i = 0; i < 300; i++) {
			var geometry = new THREE.Geometry();
			var vertex = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
			vertex.normalize();
			vertex.multiplyScalar( 450 );
			geometry.vertices.push( vertex );
			var vertex2 = vertex.clone();
			vertex2.multiplyScalar( Math.random() * 0.3 + 1 );
			geometry.vertices.push( vertex2 );
			var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: Math.random() } ) );
			group.add(line);
		}
		//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		//document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		//document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		//
		window.addEventListener( 'resize', onWindowResize, false );
	}
	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}
	//
	//function onDocumentMouseMove(event) {
	//	mouseX = event.clientX - windowHalfX;
	//	mouseY = event.clientY - windowHalfY;
	//}
	//function onDocumentTouchStart( event ) {
	//	if ( event.touches.length > 1 ) {
	//		event.preventDefault();
	//		mouseX = event.touches[ 0 ].pageX - windowHalfX;
	//		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	//	}
	//}
	//function onDocumentTouchMove( event ) {
	//	if ( event.touches.length == 1 ) {
	//		event.preventDefault();
	//		mouseX = event.touches[ 0 ].pageX - windowHalfX;
	//		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	//	}
	//}
	//
	function animate() {
		requestAnimationFrame( animate );
		render();
	}
	function render() {
		group.rotation.x = group.rotation.x + .001;
		group.rotation.y = group.rotation.y + .001;
		camera.lookAt( scene.position );
		renderer.render( scene, camera );
	}
});

$(window).load(function(){
	if(!device.android()){
		var s = skrollr.init({
			forceHeight: false,
			mobileCheck: function() {
				//hack - forces mobile version to be off
				return false;
			}
		});
		if (s.isMobile()) {
			s.destroy();
		}
	}
});