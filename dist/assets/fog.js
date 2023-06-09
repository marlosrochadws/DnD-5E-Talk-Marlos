let cam, scene, renderer,
    clock, smokeMaterial,
    h, w,
    slide,
    smokeParticles = [];

const animate = () => {
        let delta = clock.getDelta(); 

        requestAnimationFrame(animate);

        [].forEach.call(smokeParticles, sp => {
            sp.rotation.z += delta * 0.2;
        });

        renderer.render(scene, cam);
    },
    resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);

    },
    lights = () => {
        const light = new THREE.DirectionalLight(0xffffff, 0.5);

        clock = new THREE.Clock();

        renderer = new THREE.WebGLRenderer();
        // renderer.setClearColor(0x00547f, 1);
        renderer.setSize(w, h);

        scene = new THREE.Scene();

        light.position.set(-1, 0, 1);
        scene.add(light);
    },
    camera = () => {
        cam = new THREE.PerspectiveCamera(
            75,
            w / h,
            1,
            10000
        );

        cam.position.z = 1000;

        scene.add(cam);
    },
    action = () => {
        const loader = new THREE.TextureLoader();

        loader.crossOrigin = '';

        loader.load(
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82015/blue-smoke.png',
            function onLoad(texture) {
                const smokeGeo = new THREE.PlaneBufferGeometry(300, 300);

                smokeMaterial = new THREE.MeshLambertMaterial({
                    map: texture,
                    transparent: true
                });

                for (let p = 0, l = 250; p < l; p++) {
                    let particle = new THREE.Mesh(smokeGeo, smokeMaterial);

                    particle.position.set(
                        Math.random() * w - w/2,
                        Math.random() * 0 - 100,
                        Math.random() * 300 + 700
                    );

                    particle.rotation.z = Math.random() * 360;
                    scene.add(particle);
                    smokeParticles.push(particle);
                }

                animate();
            }
        );

    },
    init = () => {
        h = window.innerHeight;
        w = window.innerWidth;
        
        lights(); //💡
        camera(); // 🎥
        action(); // 🎬

        slide = document.querySelector('.slide-title')
        slide.appendChild(renderer.domElement);
        // document.body.appendChild(renderer.domElement);
        window.addEventListener('resize', resize);
    };

init();