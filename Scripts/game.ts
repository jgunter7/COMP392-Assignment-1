// MAIN GAME FILE

import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Mesh = THREE.Mesh;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var cubeGeometry: CubeGeometry;
var planeGeometry: PlaneGeometry;
var sphereGeometry: SphereGeometry;
var cubeMaterial: LambertMaterial;
var planeMaterial: LambertMaterial;
var sphereMaterial: LambertMaterial;
var axes:AxisHelper;
var cube1: Mesh;
var cube2: Mesh;
var cube3: Mesh;
var cube4: Mesh;
var cube5: Mesh;
var cube6: Mesh;
var cube7: Mesh;
var cube8: Mesh;
var cube9: Mesh;
var plane: Mesh;
var sphere: Mesh;
var group: THREE.Object3D;
var spotLight: SpotLight;
var pointLight: PointLight;
var control: Control;
var gui: GUI;
var stats:Stats;
var step:number = 0;

function init() {
    // Instantiate a new Scene object
	scene = new Scene();
	
	setupRenderer(); // setup the default renderer
	
	setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    
    //Add a Plane to the Scene
	planeGeometry = new PlaneGeometry(60, 40);
	planeMaterial = new LambertMaterial({color:0xFFFFFF});
	plane = new Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	
	plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
	plane.position.y = 0;
    plane.position.z = 0;
	
	scene.add(plane);
	console.log("Added Plane Primitive to scene...");
    
    //a.k.a Add human figure
    AddHumanCubes();
    
	// Add a SpotLight to the scene
	spotLight = new SpotLight(0xffffff);
	spotLight.position.set (-40, 60, -10);
	spotLight.castShadow = true;
	scene.add(spotLight);
	console.log("Added Spot Light to Scene");
	
    // add ambient light to the scene
    var aLight = new THREE.AmbientLight(0x404040); //white light
    scene.add(aLight);
    
    // add controls
	gui = new GUI();
	control = new Control(0.02,  false);
	addControl(control);
    
    // Add framerate stats
    addStatsObject();
    
	document.body.appendChild(renderer.domElement);
	gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize():void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function addControl(controlObject: Control):void {
    gui.add(controlObject, 'rotationToggle', false);
	gui.add(controlObject, 'rotationSpeed', 0, 0.5);
}

function addStatsObject() {
	stats = new Stats();
	stats.setMode(0);
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop():void {
	stats.update();

    //rotate human
    if (control.rotationToggle) {
        RotateHuman(control.rotationSpeed);
    }
    
	// render using requestAnimationFrame
	requestAnimationFrame(gameLoop);
	
    // render the scene
	renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer():void {
	renderer = new Renderer();
	renderer.setClearColor(0xEEEEEE, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;
	console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera():void {
	camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.x =-30;
	camera.position.y = 60;
	camera.position.z = 45;
	camera.lookAt(scene.position);
	console.log("Finished setting up Camera...");
}

function AddHumanCubes() {
    var shoulderGeo = new BoxGeometry(3,3,3);
    cubeGeometry = new BoxGeometry(4, 4, 4);
    var rectGeo = new BoxGeometry(12, 4, 4);
    var bigRectGeo = new BoxGeometry(12,12,4);
    sphereGeometry = new SphereGeometry(3,20,20);
    var cylinderShape = new THREE.CylinderGeometry(1.5,1.5,6,20,20,false);
	cubeMaterial = new LambertMaterial({color:0xff0000});
    var skinMaterial = new LambertMaterial({color:0xe4b98e});
    
    //left leg bottom
	cube1 = new Mesh(cubeGeometry, cubeMaterial);    
	cube1.castShadow = true;    
    cube1.position.x = -4;
    cube1.position.y = 3;
    cube1.position.z = 0;    
    
    //left leg middle
    cube2 = new Mesh(cubeGeometry, cubeMaterial);    
	cube2.castShadow = true;    
    cube2.position.x = -4;
    cube2.position.y = 7;
    cube2.position.z = 0;    
    
    //right leg bottom
    cube4 = new Mesh(cubeGeometry, cubeMaterial);    
	cube4.castShadow = true;    
    cube4.position.x = 4;
    cube4.position.y = 3;
    cube4.position.z = 0;    
    
    //right leg middle
    cube5 = new Mesh(cubeGeometry, cubeMaterial);    
	cube5.castShadow = true;    
    cube5.position.x = 4;
    cube5.position.y = 7;
    cube5.position.z = 0;
    
    //main body rectangle   
    cube3 = new Mesh(bigRectGeo, cubeMaterial);    
	cube3.castShadow = true;    
    cube3.position.x = 0;
    cube3.position.y = 15;
    cube3.position.z = 0;    
    
    //left arm
    cube8 = new Mesh(cubeGeometry, cubeMaterial);    
	cube8.castShadow = true;    
    cube8.position.x = -8;
    cube8.position.y = 19;
    cube8.position.z = 0;    
    
    //right arm
    cube9 = new Mesh(cubeGeometry, cubeMaterial);    
	cube9.castShadow = true;    
    cube9.position.x = 8;
    cube9.position.y = 19;
    cube9.position.z = 0; 
    
    //head
    var sphere2 = new Mesh(sphereGeometry, skinMaterial);
    sphere2.castShadow = true;
    
    sphere2.position.x = 0;
    sphere2.position.y = 23;
    sphere2.position.z = 0;
    
    //arms here
    var cyl1 = new Mesh(cylinderShape,skinMaterial);
    cyl1.castShadow = true;
    cyl1.position.x = 8.5;
    cyl1.position.y = 15;
    cyl1.position.z = 0; 
    
    var cyl2 = new Mesh(cylinderShape,skinMaterial);
    cyl2.castShadow = true;
    cyl2.position.x = -8.5;
    cyl2.position.y = 15;
    cyl2.position.z = 0; 
    
    group = new THREE.Object3D();
    group.add(cube1);
    group.add(cube2);
    group.add(cube3);
    group.add(cube4);
    group.add(cube5);
    group.add(cube8);
    group.add(cube9);
    group.add(sphere2);
    group.add(cyl1);
    group.add(cyl2);
    scene.add(group);     
    
	console.log("Added Cubes to scene...");
}

function RotateHuman(rSpeed: number) {
    group.rotation.y += rSpeed;
}
