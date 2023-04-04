let cam, scene1,scene2, renderer1, renderer2,
    clock, smokeMaterial,
    h, w,
    requestID, fogNumber,
    slide1, slide2,
    smokeParticles = [];

const animate = () => {
        let delta = clock.getDelta(); 

        requestID = requestAnimationFrame(animate);

        [].forEach.call(smokeParticles, sp => {
            sp.rotation.z += delta * 0.2;
        });

        renderer1.render(scene1, cam);
        renderer2.render(scene2, cam);
    },
    resize = () => {
        renderer1.setSize(window.innerWidth, window.innerHeight);
        renderer2.setSize(window.innerWidth, window.innerHeight);
    },
    lights = () => {
        const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
        const light2 = new THREE.DirectionalLight(0xffffff, 0.5);

        clock = new THREE.Clock();

        renderer1 = new THREE.WebGLRenderer({ alpha: true });
        renderer2 = new THREE.WebGLRenderer({ alpha: true });
        // renderer.setClearColor(0x00547f, 0);
        renderer1.setClearColor(0x000000, 1 );
        renderer1.setSize(w, h);
        renderer2.setClearColor(0x000000, 0 );
        renderer2.setSize(w, h);

        scene1 = new THREE.Scene();
        scene2 = new THREE.Scene();

        light1.position.set(-1, 0, 1);
        light2.position.set(-1, 0, 1);
        scene1.add(light1);
        scene2.add(light2);
    },
    camera = () => {
        cam = new THREE.PerspectiveCamera(
            75,
            w / h,
            1,
            10000
        );

        cam.position.z = 1000;

        scene1.add(cam);
        scene2.add(cam);
    },
    action = (fogNumber) => {
        const loader = new THREE.TextureLoader();

        loader.crossOrigin = '';

        loader.load(
            './assets/images/blue-smoke.png',
            function onLoad(texture) {
                const smokeGeo = new THREE.PlaneBufferGeometry(300, 300);

                smokeMaterial = new THREE.MeshLambertMaterial({
                    map: texture,
                    transparent: true
                });

                for (let p = 0, l = fogNumber; p < l; p++) {
                    let particle1 = new THREE.Mesh(smokeGeo, smokeMaterial);
                    let particle2 = new THREE.Mesh(smokeGeo, smokeMaterial);

                    particle1.position.set(
                        Math.random() * w - w/2,
                        Math.random() * 0 - 50,
                        Math.random() * 300 + 700
                    );
                    particle2.position.set(
                        Math.random() * w - w/2,
                        Math.random() * 0 - 210,
                        Math.random() * 300 + 700
                    );

                    particle1.rotation.z = Math.random() * 360;
                    particle2.rotation.z = Math.random() * 360;
                    scene1.add(particle1);
                    scene2.add(particle2);
                    smokeParticles.push(particle1);
                    smokeParticles.push(particle2);
                }

                animate();
            }
        );

    },
    startAnimation = () => {
        console.log('startAnimation');
        animate();
    },
    stopAnimation = () => {
        console.log('cancelAnimationFrame');
        cancelAnimationFrame( requestID );
    },
    playSound = () => {
        var audio = new Audio('https://audio.pronouncekiwi.com/Maxim/%D1%80%D1%83%D1%87%D0%BD%D0%BE%D0%B9%20%D0%BF%D1%80%D0%BE%D1%82%D0%B8%D0%B2%D0%BE%D1%82%D0%B0%D0%BD%D0%BA%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%B3%D1%80%D0%B0%D0%BD%D0%B0%D1%82%D0%BE%D0%BC%D1%91%D1%82');
        audio.play();
    },
    openMenuDice = () => {
        document.getElementById( 'dicesWrapper' ).classList.toggle('active');
    },
    init = () => {
        h = window.innerHeight;
        w = window.innerWidth;
        
        lights(); //💡
        camera(); // 🎥
        action(100); // 🎬

        slide1 = document.querySelector('[data-scene-step="back"]')
        slide1.appendChild(renderer1.domElement);
        slide2 = document.querySelector('[data-scene-step="over"]')
        slide2.appendChild(renderer2.domElement);
        // document.body.appendChild(renderer.domElement);
        window.addEventListener('resize', resize);

        document.getElementById( 'stopAnimation' ).addEventListener( 'click', stopAnimation );
        document.getElementById( 'startAnimation' ).addEventListener( 'click', startAnimation );
        document.getElementById( 'playSound' ).addEventListener( 'click', playSound );
        document.getElementById( 'diceMenuTg' ).addEventListener( 'click', openMenuDice );
    };

init();