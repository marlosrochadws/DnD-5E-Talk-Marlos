"use strict";

window.$dice = {};

(function(dice) {

    function copyto(obj, res) {
        if (obj == null || typeof obj !== 'object') return obj;
        if (obj instanceof Array) {
            for (var i = obj.length - 1; i >= 0; --i)
                res[i] = copy(obj[i]);
        }
        else {
            for (var i in obj) {
                if (obj.hasOwnProperty(i))
                    res[i] = copy(obj[i]);
            }
        }
        return res;
    }
    
    function copy(obj) {
        if (!obj) return obj;
        return copyto(obj, new obj.constructor());
    }

    this.frame_rate = 1 / 60;

    function create_shape(vertices, faces, radius) {
        var cv = new Array(vertices.length), cf = new Array(faces.length);
        for (var i = 0; i < vertices.length; ++i) {
            var v = vertices[i];
            //
            cv[i] = new CANNON.Vec3(v.x * radius, v.y * radius, v.z * radius);
        }
        for (var i = 0; i < faces.length; ++i) {
            cf[i] = faces[i].slice(0, faces[i].length - 1);
        }

        //
        return new CANNON.ConvexPolyhedron(cv, cf);
    }

    function make_geom(vertices, faces, radius, tab, af) {
        //vertices:
        //faces:
        //radius:
        //tab:
        var geom = new THREE.Geometry();
        for (var i = 0; i < vertices.length; ++i) {
            var vertex = vertices[i].multiplyScalar(radius);
            vertex.index = geom.vertices.push(vertex) - 1;
        }
        for (var i = 0; i < faces.length; ++i) {
            var ii = faces[i], fl = ii.length - 1;
            var aa = Math.PI * 2 / fl;
            for (var j = 0; j < fl - 2; ++j) {
                geom.faces.push(new THREE.Face3(ii[0], ii[j + 1], ii[j + 2], [geom.vertices[ii[0]],
                            geom.vertices[ii[j + 1]], geom.vertices[ii[j + 2]]], 0, ii[fl] + 1));
                geom.faceVertexUvs[0].push([
                        new THREE.Vector2((Math.cos(af) + 1 + tab) / 2 / (1 + tab),
                            (Math.sin(af) + 1 + tab) / 2 / (1 + tab)),
                        new THREE.Vector2((Math.cos(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab),
                            (Math.sin(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab)),
                        new THREE.Vector2((Math.cos(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab),
                            (Math.sin(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab))]);
            }
        }
        geom.computeFaceNormals();
        geom.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius);
        return geom;
    }

    function chamfer_geom(vectors, faces, chamfer) {
        var chamfer_vectors = [], chamfer_faces = [], corner_faces = new Array(vectors.length);
        for (var i = 0; i < vectors.length; ++i) corner_faces[i] = [];
        for (var i = 0; i < faces.length; ++i) {
            var ii = faces[i], fl = ii.length - 1;
            var center_point = new THREE.Vector3();
            var face = new Array(fl);
            for (var j = 0; j < fl; ++j) {
                var vv = vectors[ii[j]].clone();
                center_point.add(vv);
                corner_faces[ii[j]].push(face[j] = chamfer_vectors.push(vv) - 1);
            }
            center_point.divideScalar(fl);
            for (var j = 0; j < fl; ++j) {
                var vv = chamfer_vectors[face[j]];
                vv.subVectors(vv, center_point).multiplyScalar(chamfer).addVectors(vv, center_point);
            }
            face.push(ii[fl]);
            chamfer_faces.push(face);
        }
        for (var i = 0; i < faces.length - 1; ++i) {
            for (var j = i + 1; j < faces.length; ++j) {
                var pairs = [], lastm = -1;
                for (var m = 0; m < faces[i].length - 1; ++m) {
                    var n = faces[j].indexOf(faces[i][m]);
                    if (n >= 0 && n < faces[j].length - 1) {
                        if (lastm >= 0 && m != lastm + 1) pairs.unshift([i, m], [j, n]);
                        else pairs.push([i, m], [j, n]);
                        lastm = m;
                    }
                }
                if (pairs.length != 4) continue;
                chamfer_faces.push([chamfer_faces[pairs[0][0]][pairs[0][1]],
                        chamfer_faces[pairs[1][0]][pairs[1][1]],
                        chamfer_faces[pairs[3][0]][pairs[3][1]],
                        chamfer_faces[pairs[2][0]][pairs[2][1]], -1]);
            }
        }
        for (var i = 0; i < corner_faces.length; ++i) {
            var cf = corner_faces[i], face = [cf[0]], count = cf.length - 1;
            while (count) {
                for (var m = faces.length; m < chamfer_faces.length; ++m) {
                    var index = chamfer_faces[m].indexOf(face[face.length - 1]);
                    if (index >= 0 && index < 4) {
                        if (--index == -1) index = 3;
                        var next_vertex = chamfer_faces[m][index];
                        if (cf.indexOf(next_vertex) >= 0) {
                            face.push(next_vertex);
                            break;
                        }
                    }
                }
                --count;
            }
            face.push(-1);
            chamfer_faces.push(face);
        }
        return { vectors: chamfer_vectors, faces: chamfer_faces };
    }

    function create_geom(vertices, faces, radius, tab, af, chamfer) {
        //頂点の数分の配列作成
        var vectors = new Array(vertices.length);

        //
        for (var i = 0; i < vertices.length; ++i) {
            vectors[i] = (new THREE.Vector3).fromArray(vertices[i]).normalize();
        }
        var cg = chamfer_geom(vectors, faces, chamfer);

        var geom = make_geom(cg.vectors, cg.faces, radius, tab, af);
        //var geom = make_geom(vectors, faces, radius, tab, af); // Without chamfer


        geom.cannon_shape = create_shape(vectors, faces, radius);

        //ジオメトリを返却
        return geom;
    }

    this.standart_d20_dice_face_labels = [' ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

    this.rotate = {
        d8: {even: -7.5, odd: -127.5},
        d10: {all: -6},
        d12: {all: 5},
        d20: {all: -7.5},
    };


    function calc_texture_size(approx) {
        return Math.pow(2, Math.floor(Math.log(approx) / Math.log(2)));
    }

    this.createGeometry = function(type, radius) {
		switch (type) {
			case 'd2':
				return this.create_d2_geometry(radius);
			case 'd4':
				return this.create_d4_geometry(radius);
			case 'd6':
				return this.create_d6_geometry(radius);
			case 'd8':
				return this.create_d8_geometry(radius);
			case 'd10':
				return this.create_d10_geometry(radius);
			case 'd12':
				return this.create_d12_geometry(radius);
			case 'd20':
				return this.create_d20_geometry(radius);
			default:
				return null;
		}
	}

    this.create_dice_materials = function(face_labels, size, margin,type) {
        function create_text_texture(text, color, back_color) {
            if (text == undefined) return null;

            //canvas
            var canvas = document.createElement("canvas");

            var context = canvas.getContext("2d");
            var ts = calc_texture_size(size + size * 2 * margin) * 2;
            canvas.width = canvas.height = ts;

            let fontsize = ts / (1 + 3 * margin);
            let textstarty = (canvas.height / 2);
            let textstartx = (canvas.width / 2);

            // console.log(type);
            switch (type) {
                case 'd6':
                    fontsize = fontsize*0.85;
                    break;
                case 'd10':
                    fontsize = fontsize*0.45;
                    textstarty = textstarty*0.78;
                    break;
                case 'd20':
                    textstartx = textstartx*0.98;
                    break;
                default:
                    break;
            }

            context.font = fontsize + "pt Arial";
            context.fillStyle = back_color;
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = color;
            context.fillText(text, textstartx, textstarty);

            //6 or 9
            if (text == '6' || text == '9') {
                context.fillText('  .', textstartx, textstarty);
            }

            var texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        }
        var materials = [];
        for (var i = 0; i < face_labels.length; ++i){
            materials.push(new THREE.MeshPhongMaterial(copyto(this.material_options,
                        { map: create_text_texture(face_labels[i], this.label_color, this.dice_color) })));
        }
        return materials;
    }

    this.create_d4_geometry = function(radius) {
		var vertices = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]];
		var faces = [[1, 0, 2, 1], [0, 1, 3, 2], [0, 3, 2, 3], [1, 2, 3, 4]];
		return create_geom(vertices, faces, radius, -0.1, Math.PI * 7 / 6, 0.96);
	}

    this.create_d6_geometry = function(radius) {
		var vertices = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
				[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
		var faces = [[0, 3, 2, 1, 1], [1, 2, 6, 5, 2], [0, 1, 5, 4, 3],
				[3, 7, 6, 2, 4], [0, 4, 7, 3, 5], [4, 5, 6, 7, 6]];
		return create_geom(vertices, faces, radius, 0.1, Math.PI / 4, 0.96);
	}

    this.create_d8_geometry = function(radius) {
		var vertices = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
		var faces = [[0, 2, 4, 1], [0, 4, 3, 2], [0, 3, 5, 3], [0, 5, 2, 4], [1, 3, 4, 5],
				[1, 4, 2, 6], [1, 2, 5, 7], [1, 5, 3, 8]];
		return create_geom(vertices, faces, radius, 0, -Math.PI / 4 / 2, 0.965);
	}

    this.create_d10_geometry = function(radius) {
		var a = Math.PI * 2 / 10, h = 0.105, v = -1;
		var vertices = [];
		for (var i = 0, b = 0; i < 10; ++i, b += a) {
			vertices.push([Math.cos(b), Math.sin(b), h * (i % 2 ? 1 : -1)]);
		}
		vertices.push([0, 0, -1]);
		vertices.push([0, 0, 1]);
		
		var faces = [
            [5, 6, 7, 11, 0],
            [4, 3, 2, 10, 1],
            [1, 2, 3, 11, 2],
            [0, 9, 8, 10, 3],
            [7, 8, 9, 11, 4],
            [8, 7, 6, 10, 5],
            [9, 0, 1, 11, 6],
            [2, 1, 0, 10, 7],
            [3, 4, 5, 11, 8],
            [6, 5, 4, 10, 9]
        ];
        return create_geom(vertices, faces, radius, 0.3, Math.PI, 0.945);
	}

    this.create_d12_geometry = function(radius) {
		var p = (1 + Math.sqrt(5)) / 2, q = 1 / p;
		var vertices = [[0, q, p], [0, q, -p], [0, -q, p], [0, -q, -p], [p, 0, q],
				[p, 0, -q], [-p, 0, q], [-p, 0, -q], [q, p, 0], [q, -p, 0], [-q, p, 0],
				[-q, -p, 0], [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, 1, 1],
				[-1, 1, -1], [-1, -1, 1], [-1, -1, -1]];
		var faces = [[2, 14, 4, 12, 0, 1], [15, 9, 11, 19, 3, 2], [16, 10, 17, 7, 6, 3], [6, 7, 19, 11, 18, 4],
				[6, 18, 2, 0, 16, 5], [18, 11, 9, 14, 2, 6], [1, 17, 10, 8, 13, 7], [1, 13, 5, 15, 3, 8],
				[13, 8, 12, 4, 5, 9], [5, 4, 14, 9, 15, 10], [0, 12, 8, 10, 16, 11], [3, 19, 7, 17, 1, 12]];
		return create_geom(vertices, faces, radius, 0.2, -Math.PI / 4 / 2, 0.968);
	}

    this.create_d20_geometry = function(radius) {
		var t = (1 + Math.sqrt(5)) / 2;
		var vertices = [[-1, t, 0], [1, t, 0 ], [-1, -t, 0], [1, -t, 0],
				[0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
				[t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
		var faces = [[0, 11, 5, 1], [0, 5, 1, 2], [0, 1, 7, 3], [0, 7, 10, 4], [0, 10, 11, 5],
				[1, 5, 9, 6], [5, 11, 4, 7], [11, 10, 2, 8], [10, 7, 6, 9], [7, 1, 8, 10],
				[3, 9, 4, 11], [3, 4, 2, 12], [3, 2, 6, 13], [3, 6, 8, 14], [3, 8, 9, 15],
				[4, 9, 5, 16], [2, 4, 11, 17], [6, 2, 10, 18], [8, 6, 7, 19], [9, 8, 1, 20]];
		return create_geom(vertices, faces, radius, -0.2, -Math.PI / 4 / 2, 0.955);
	}

    this.material_options = {
        specular: 0x172022,
        color: 0xf0f0f0,
        shininess: 40,
        shading: THREE.FlatShading,
    };
    this.label_color = '#FFFFFF';
    this.dice_color = '#224e81';
    this.ambient_light_color = 0xf0f5fb;
    //this.spot_light_color = 0xefdfd5;
    this.spot_light_color = 0xffffff;
    this.selector_back_colors = { color: 0x404040, shininess: 0, emissive: 0x858787 };
    //this.desk_color = 0xdfdfdf;
    this.desk_color = 0xffffff;
    
    //0xffff99
    this.use_shadows = true;

    this.known_types = ['d4','d6','d8','d10','d12','d20'];
    this.dice_face_range = { 'd4':[1,4],'d6':[1,6],'d8':[1,8],'d10':[1,10],'d12':[1,12],'d20': [1, 20] };
    this.dice_mass = { 'd4': 300,'d6': 300,'d8': 300,'d10': 300,'d12': 300,'d20': 300 };
    this.dice_inertia = { 'd4': 9,'d6': 9,'d8': 9,'d10': 9,'d12': 9,'d20': 13 };

    this.scale = 50;

    this.createTHREE = function(type) {
        if (type) {
            this.geometry = this.createGeometry(type,60);

            this.dice_material = new THREE.MeshFaceMaterial(
                this.create_dice_materials(this.standart_d20_dice_face_labels, this.scale / 2, 1.0, type)
            );
        }
        return new THREE.Mesh(this.geometry, this.dice_material);
    }

    // this.parse_notation = function(notation) {
    //     return { set: ["d20"], constant: 0, result: [], error: false };
    // }

    // this.stringify_notation = function(nn) {
    //     var dict = {}, notation = '';
    //     for (var i in nn.set) 
    //         if (!dict[nn.set[i]]) dict[nn.set[i]] = 1; else ++dict[nn.set[i]];
    //     for (var i in dict) {
    //         if (notation.length) notation += ' + ';
    //         notation += (dict[i] > 1 ? dict[i] : '') + i;
    //     }
    //     if (nn.constant) {
    //         if (nn.constant > 0) notation += ' + ' + nn.constant;
    //         else notation += ' - ' + Math.abs(nn.constant);
    //     }
    //     return notation;
    // }

    var that = this;

    this.dice_box = function(container, dimentions) {  // container = ('canvas') dimentions = { w: 300, h: 300 }
        this.use_adapvite_timestep = false;

        this.dices = [];
        this.scene = new THREE.Scene();
        this.world = new CANNON.World();

        //WebGLRenderingContext or THREE.WebGLRenderer or THREE.CanvasRenderer
        //this.renderer = window.WebGLRenderingContext
        //    ? new THREE.WebGLRenderer({ antialias: true })
        //    : new THREE.CanvasRenderer({ antialias: true });

        this.renderer = new THREE.WebGLRenderer({ antialias: true,  alpha: true });
        container.appendChild(this.renderer.domElement);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.setClearColor(0x000000, 0 );
        this.reinit(container, dimentions);
        this.world.gravity.set(0, 0, -9.8 * 800);
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.solver.iterations = 16;
        var ambientLight = new THREE.AmbientLight(that.ambient_light_color);
        this.scene.add(ambientLight);
        this.dice_body_material = new CANNON.Material();
        var desk_body_material = new CANNON.Material();
        var barrier_body_material = new CANNON.Material();

        this.world.addContactMaterial(new CANNON.ContactMaterial(
                    desk_body_material,
                    this.dice_body_material,
                    0.11,
                    0.1
        ));

        this.world.addContactMaterial(new CANNON.ContactMaterial(
                    barrier_body_material,
                    this.dice_body_material,
                    0,
                    1.0  
        ));

        this.world.addContactMaterial(new CANNON.ContactMaterial(
                    this.dice_body_material,
                    this.dice_body_material,
                    0,
                    0.5
        ));

        this.world.add(new CANNON.RigidBody(0, new CANNON.Plane(), desk_body_material));

        var barrier;
        barrier = new CANNON.RigidBody(0, new CANNON.Plane(), barrier_body_material);
        barrier.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
        barrier.position.set(0, this.h * 0.93, 0);//上
        this.world.add(barrier);

        barrier = new CANNON.RigidBody(0, new CANNON.Plane(), barrier_body_material);
        barrier.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        barrier.position.set(0, -this.h * 0.93, 0);//下
        this.world.add(barrier);

        barrier = new CANNON.RigidBody(0, new CANNON.Plane(), barrier_body_material);
        barrier.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2);
        barrier.position.set(this.w * 0.93, 0, 0);//右
        this.world.add(barrier);

        barrier = new CANNON.RigidBody(0, new CANNON.Plane(), barrier_body_material);
        barrier.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
        barrier.position.set(-this.w * 0.93, 0, 0);//左
        this.world.add(barrier);

        this.last_time = 0;
        this.running = false;

        this.renderer.render(this.scene, this.camera);
    }

    this.dice_box.prototype.reinit = function(container, dimentions) {

        //
        this.cw = container.clientWidth / 2;
        this.ch = container.clientHeight / 2;

        //dimentions=null;
        if (dimentions) {
            //基準値の設定
            this.w = dimentions.w;
            this.h = dimentions.h;
        }
        else {
            //基準値が無い場合、画面サイズを基準値とする
            this.w = this.cw;
            this.h = this.ch;
        }

        //
        this.aspect = Math.min(this.cw / this.w, this.ch / this.h);
        that.scale = Math.sqrt(this.w * this.w + this.h * this.h) / 13;

        this.renderer.setSize(this.cw * 2, this.ch * 2);

        this.wh = this.ch / this.aspect / Math.tan(10 * Math.PI / 180);
        if (this.camera) this.scene.remove(this.camera);



        //遠近感が適用されるカメラ
        //OrthographicCamera
        //PerspectiveCamera(視野角, アスペクト比, 区間の開始距離, 区間の終了距離)
        this.camera = new THREE.PerspectiveCamera(20, this.cw / this.ch, 1, this.wh * 1.3)
        this.camera.position.z = this.wh;

        var mw = Math.max(this.w, this.h);

        //スポットライト作成
        
        if (this.light) this.scene.remove(this.light);
        this.light = new THREE.SpotLight(that.spot_light_color, 2.0);
        this.light.position.set(-mw / 2, mw / 2, mw * 2);
        this.light.target.position.set(0, 0, 0);
        this.light.distance = mw * 5;
        this.light.castShadow = true;
        this.light.shadowCameraNear = mw / 10;
        this.light.shadowCameraFar = mw * 5;
        this.light.shadowCameraFov = 50;
        this.light.shadowBias = 0.001;
        this.light.shadowDarkness = 1.1;
        this.light.shadowMapWidth = 1024;
        this.light.shadowMapHeight = 1024;
        this.scene.add(this.light);//シーンにライト追加
        
        //テーブル作成
        if (this.desk) this.scene.remove(this.desk);
        this.desk = new THREE.Mesh(new THREE.PlaneGeometry(this.w * 2, this.h * 2, 1, 1), 
                new THREE.MeshPhongMaterial({ 
                    transparent: true,
                    opacity: 0.0,
                    color: that.desk_color }));
        this.desk.receiveShadow = that.use_shadows;
        this.scene.add(this.desk);//シーンにテーブル追加

        //シーン、カメラでレンダリング
        this.renderer.render(this.scene, this.camera);
    }

    function make_random_vector(vector) {
        var random_angle = Math.random() * Math.PI / 5 - Math.PI / 5 / 2;
        var vec = {
            x: vector.x * Math.cos(random_angle) - vector.y * Math.sin(random_angle),
            y: vector.x * Math.sin(random_angle) + vector.y * Math.cos(random_angle)
        };
        if (vec.x == 0) vec.x = 0.01;
        if (vec.y == 0) vec.y = 0.01;
        return vec;
    }

    this.dice_box.prototype.generate_vectors = function(notation, vector, boost) {
        var vectors = [];
        for (var i in notation.set) {
            var vec = make_random_vector(vector);
            var pos = {
                x: this.w * (vec.x > 0 ? -1 : 1) * 0.9,
                y: this.h * (vec.y > 0 ? -1 : 1) * 0.9,
                z: Math.random() * 200 + 200
            };
            var projector = Math.abs(vec.x / vec.y);
            if (projector > 1.0) pos.y /= projector; else pos.x *= projector;
            var velvec = make_random_vector(vector);
            var velocity = { x: velvec.x * boost, y: velvec.y * boost, z: -10 };
            var inertia = that.dice_inertia[notation.set[i]];
            var angle = {
                x: -(Math.random() * vec.y * 3 + inertia * vec.y), //Original * value is 5
                y: Math.random() * vec.x * 3 + inertia * vec.x, //Original * value is 5
                z: 0
            };
            var axis = { x: Math.random(), y: Math.random(), z: Math.random(), a: Math.random() };
            vectors.push({ set: notation.set[i], pos: pos, velocity: velocity, angle: angle, axis: axis });
        }
        
        return vectors;
    }

    //spawns one dicemesh object from a single vectordata  >> spawnDice(vectordata)
    this.dice_box.prototype.create_dice = function(type, pos, velocity, angle, axis) {
        
        // const diceobj = window.DiceFactory.get(vectordata.type);
		// if(!diceobj) return;

		// let dicemesh = window.DiceFactory.create(diceobj.type);
		// if(!dicemesh) return;

        // dicemesh.notation = vectordata;
		// dicemesh.result = [];
		// dicemesh.stopped = 0;
		// dicemesh.castShadow = this.shadows;
		// dicemesh.body = new CANNON.RigidBody(100,dice.geometry.cannon_shape, this.dice_body_material);
        // dicemesh.body.type = "d20";
		// dicemesh.body.position.set(pos.x, pos.y, pos.z);
		// dicemesh.body.quaternion.setFromAxisAngle(new CANNON.Vec3(axis.x, axis.y, axis.z), axis.a * Math.PI * 2);
		// dicemesh.body.angularVelocity.set(angle.x, angle.y, angle.z);
		// dicemesh.body.velocity.set(velocity.x, velocity.y, velocity.z);
		// dicemesh.body.linearDamping = 0.1;
		// dicemesh.body.angularDamping = 0.1;
		// dicemesh.body.diceShape = diceobj.shape;
		// this.scene.add(dicemesh);
		// this.dices.push(dicemesh);
		// this.world.add(dicemesh.body);

        var dice = that['createTHREE'](type);
        dice.castShadow = true;
        dice.dice_type = type;//type;
        dice.body = new CANNON.RigidBody(100,dice.geometry.cannon_shape, this.dice_body_material);
        dice.body.position.set(pos.x, pos.y, pos.z);
        dice.body.quaternion.setFromAxisAngle(new CANNON.Vec3(axis.x, axis.y, axis.z), axis.a * Math.PI * 2);
        dice.body.angularVelocity.set(angle.x, angle.y, angle.z);
        dice.body.velocity.set(velocity.x, velocity.y, velocity.z);
        dice.body.linearDamping = 0.1;
        dice.body.angularDamping = 0.1;
        this.scene.add(dice);
        this.dices.push(dice);
        this.world.add(dice.body);

    }

    this.dice_box.prototype.check_if_throw_finished = function() {
        var res = true;
        var e = 6;

        //反復計算回数
        for (var i = 0; i < this.dices.length; ++i) {
            //ダイスを１つ取り出す
            var dice = this.dices[i];

            //ダイスがストップしてる場合、読み飛ばす
            if (dice.dice_stopped === true){
                continue;
            }

            //angularVelocity:回転加速度
            //velocity:加速度
            var a = dice.body.angularVelocity, v = dice.body.velocity;

            //加速度が全て6以下の場合
            if (Math.abs(a.x) < e && 
                Math.abs(a.y) < e && 
                Math.abs(a.z) < e &&
                Math.abs(v.x) < e && 
                Math.abs(v.y) < e && 
                Math.abs(v.z) < e) {

                if (dice.dice_stopped) {                    
                    //ダイスがストップしてる場合
                    if (this.iteration - dice.dice_stopped > 3) {
                        dice.dice_stopped = true;
                        //次のダイス
                        continue;
                    }
                }
                else {
                    //ダイスが止まっていることを設定
                    dice.dice_stopped = this.iteration;
                }
                //止まっていない。
                res = false;
            }
            else {
                //加速度が残っている場合は、return false;
                dice.dice_stopped = undefined;
                res = false;
            }
        }

        return res;
    }

    function get_dice_value(dice) {
        //ダイスの目を取得


        var vector = new THREE.Vector3(0, 0, 1);
        var closest_face, closest_angle = Math.PI * 2;


        for (var i = 0, l = dice.geometry.faces.length; i < l; ++i) {
            var face = dice.geometry.faces[i];
            if (face.materialIndex == 0) continue;

            //解らん。。。
            var angle = face.normal.clone().applyQuaternion(dice.body.quaternion).angleTo(vector);
            if (angle < closest_angle) {
                closest_angle = angle;
                closest_face = face;
            }
        }
        var matindex = closest_face.materialIndex - 1;  
        return matindex;
    }

    function get_dice_values(dices) {
        var values = [];
        for (var i = 0, l = dices.length; i < l; ++i) {
            //ダイスの数だけ、目を入れる
            values.push(get_dice_value(dices[i]));
        }
        return values;
    }

    this.dice_box.prototype.emulate_throw = function() {
        while (!this.check_if_throw_finished()) {
            //反復計算回数をインクリメント
            ++this.iteration;
            this.world.step(that.frame_rate);
        }
        return get_dice_values(this.dices);
    }

    this.dice_box.prototype.__animate = function(threadid) {
        //アニメーション

        //ナウ(ミリ秒)
        var time = (new Date()).getTime();

        //時間差:(ナウ - 前回) / 1000
        var time_diff = (time - this.last_time) / 1000;

        //時間差が3を超える場合、フレームレートに置き換える:0.0166666
        if (time_diff > 3) time_diff = that.frame_rate;

        //反復計算回数をインクリメント
        ++this.iteration;

        if (this.use_adapvite_timestep) {
            //時間差 > フレームレート * 1.1になるまで進める
            while (time_diff > that.frame_rate * 1.1) {
                this.world.step(that.frame_rate);
                time_diff -= that.frame_rate; //フレームレート分を時間差から減らす
            }
            //時間差で進める
            this.world.step(time_diff);
        }
        else {
            //フレームレートでアニメーションを進める
            this.world.step(that.frame_rate);
        }

        //シーンにあるオブジェクト毎に処理
        //環境光、ライト、ボード、ダイス
        //AmbientLight,SpotLight,Mesh,Mesh
        for (var i in this.scene.children) {
            var interact = this.scene.children[i];
            if (interact.body != undefined) {
                //ポジション
                interact.position.copy(interact.body.position);
                //四元数
                interact.quaternion.copy(interact.body.quaternion);
            }
        }

        //レンダリング
        this.renderer.render(this.scene, this.camera);

        //時間差のために再取得
        this.last_time = this.last_time ? time : (new Date()).getTime();

        
        if (this.running == threadid && this.check_if_throw_finished()) {
            //ダイスが止まっている場合
            this.running = false;
            if (this.callback) {
                //ダイス転がした後
                this.callback.call(this, get_dice_values(this.dices));
            }
        }
        if (this.running == threadid) {
            (function(t, tid, uat) {
                if (!uat && time_diff < that.frame_rate) {
                    setTimeout(function() { requestAnimationFrame(function() { t.__animate(tid); }); },
                        (that.frame_rate - time_diff) * 1000);
                }
                else requestAnimationFrame(function() { t.__animate(tid); });
            })(this, threadid, this.use_adapvite_timestep);
        }
    }

    this.dice_box.prototype.clear = function() {
        this.running = false;
        var dice;
        while (dice = this.dices.pop()) {
            this.scene.remove(dice); 
            if (dice.body) this.world.remove(dice.body);
        }
        if (this.pane) this.scene.remove(this.pane);
        this.renderer.render(this.scene, this.camera);
        var box = this;
        setTimeout(function() { box.renderer.render(box.scene, box.camera); }, 100);
    }

    this.dice_box.prototype.prepare_dices_for_roll = function(vectors) {
        this.clear();
        this.iteration = 0;
        for (var i in vectors) { // CRIANDO CADA UM DOS DADOS
            this.create_dice(vectors[i].set, vectors[i].pos, vectors[i].velocity,
                    vectors[i].angle, vectors[i].axis); // (type, pos, velocity, angle, axis)
        }
    }

    function shift_dice_faces(dice, value, res) {
        var r = that.dice_face_range[dice.dice_type];
        if (dice.dice_type == 'd10' && value == 10) value = 0;
        if (dice.dice_type == 'd10' && res == 10) res = 0;
        if (dice.dice_type == 'd100') res /= 10;
        if (!(value >= r[0] && value <= r[1])) return;
        var num = value - res;
        var geom = dice.geometry.clone();
        for (var i = 0, l = geom.faces.length; i < l; ++i) {
            var matindex = geom.faces[i].materialIndex;
            if (matindex == 0) continue;
            matindex += num - 1;
            while (matindex > r[1]) matindex -= r[1];
            while (matindex < r[0]) matindex += r[1];
            geom.faces[i].materialIndex = matindex + 1;
        }
        dice.geometry = geom;
    }

    this.dice_box.prototype.roll = function(vectors, values, callback) {

        this.prepare_dices_for_roll(vectors);
        /*
        if (values != undefined && values.length) {
            this.use_adapvite_timestep = false;
            var res = this.emulate_throw();
            this.prepare_dices_for_roll(vectors);
            for (var i in res)
                shift_dice_faces(this.dices[i], values[i], res[i]);
        }*/
        this.callback = callback;

        this.running = (new Date()).getTime();
        this.last_time = 0;

        this.__animate(this.running);
    }

    function throw_dices(box, before_roll, after_roll, dice_notation, vectors_retry) { // (start_throw, vectors, notation, callback)
        var vector = { x: 1, y: 1};
        var boost=1;
        var dist=1;

        

        var uat = $dice.use_adapvite_timestep;
        function roll() {
            if (after_roll) {
                box.clear();
                if(vectors_retry){
                    vectors = vectors_retry;
                }
                box.roll(vectors, notation.result, function(result) {
                    if (after_roll) after_roll.call(box, notation, result);
                    box.rolling = false;
                    $dice.use_adapvite_timestep = uat;
                });
            }
        }

        // var notation = { set: ["d20"], constant: 0, result: [], error: false };
        var notation = { set: dice_notation, constant: 0, result: [], error: false };

        var vectors = null;
        
        if(vectors_retry){
            vectors = vectors_retry;
        } else {
            vectors = box.generate_vectors(notation, vector, boost);
        }
        
        box.rolling = true;
        if (before_roll) {
            before_roll.call(box, vectors, notation, roll);
        } else {
            roll();
        }

        return vectors;
    }

    this.dice_box.prototype.start_throw = function(before_roll, after_roll, dice_notation, vectors_retry) {  // before_roll=vectors, after_roll=notation, vectors_retry=callback
        var box = this;
        if (box.rolling) return;
        // console.log(dice_notation);
        return throw_dices(box, before_roll, after_roll, dice_notation, vectors_retry); // chama funcao throw_dices (start_throw, vectors, notation, callback)
    }

}).apply($dice);

