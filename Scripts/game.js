/*
Author:             Jason Gunter
Last Modified By:   Jason Gunter @ 8PM Jan 21st, 2016
Description:        Draw a 3D human-ish object and allow the user to rotate it
Revision History:   https://github.com/jgunter7/COMP392-Assignment-1/commits/master
*/
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Mesh = THREE.Mesh;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var scene;
var renderer;
var camera;
var cubeGeometry;
var planeGeometry;
var sphereGeometry;
var cubeMaterial;
var planeMaterial;
var sphereMaterial;
var axes;
var eye1;
var eye2;
var cyl1;
var cyl2;
var head;
var leg1;
var leg2;
var cube3;
var cube8;
var cube9;
var plane;
var sphere;
var group;
var spotLight;
var pointLight;
var control;
var gui;
var stats;
var step = 0;
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
    planeMaterial = new LambertMaterial({ color: 0xFFFFFF });
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
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added Spot Light to Scene");
    // add ambient light to the scene
    var aLight = new THREE.AmbientLight(0x404040); //white light
    scene.add(aLight);
    // add controls
    gui = new GUI();
    control = new Control(0.02, false);
    addControl(control);
    // Add framerate stats
    addStatsObject();
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'rotationToggle', false);
    gui.add(controlObject, 'rotationSpeed', 0, 0.5);
    gui.add(controlObject, 'changeColour');
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
function gameLoop() {
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
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 60;
    camera.position.z = 45;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
function AddHumanCubes() {
    var shoulderGeo = new BoxGeometry(3, 3, 3);
    var eyeShape = new SphereGeometry(0.4, 20, 20);
    cubeGeometry = new BoxGeometry(4, 4, 4);
    var rectGeo = new BoxGeometry(12, 4, 4);
    var bigRectGeo = new BoxGeometry(12, 12, 4);
    sphereGeometry = new SphereGeometry(3, 20, 20);
    var cylinderShape = new THREE.CylinderGeometry(1.5, 1.5, 6, 20, 20, false);
    var legShape = new THREE.CylinderGeometry(2, 2, 8, 20, 20, false);
    cubeMaterial = new LambertMaterial({ color: 0xff0000 });
    var skinMaterial = new LambertMaterial({ color: 0xe4b98e });
    var eyeColour = new LambertMaterial({ color: 0xadd8e6 });
    // legs here
    leg1 = new Mesh(legShape, skinMaterial);
    leg1.castShadow = true;
    leg1.position.x = -4;
    leg1.position.y = 7;
    leg1.position.z = 0;
    leg2 = new Mesh(legShape, skinMaterial);
    leg2.castShadow = true;
    leg2.position.x = 4;
    leg2.position.y = 7;
    leg2.position.z = 0;
    //main body rectangle   
    cube3 = new Mesh(bigRectGeo, cubeMaterial);
    cube3.castShadow = true;
    cube3.position.x = 0;
    cube3.position.y = 16;
    cube3.position.z = 0;
    //left shoulder
    cube8 = new Mesh(cubeGeometry, cubeMaterial);
    cube8.castShadow = true;
    cube8.position.x = -8;
    cube8.position.y = 20;
    cube8.position.z = 0;
    //right shoulder
    cube9 = new Mesh(cubeGeometry, cubeMaterial);
    cube9.castShadow = true;
    cube9.position.x = 8;
    cube9.position.y = 20;
    cube9.position.z = 0;
    //arms here
    cyl1 = new Mesh(cylinderShape, skinMaterial);
    cyl1.castShadow = true;
    cyl1.position.x = 8.5;
    cyl1.position.y = 16;
    cyl1.position.z = 0;
    cyl2 = new Mesh(cylinderShape, skinMaterial);
    cyl2.castShadow = true;
    cyl2.position.x = -8.5;
    cyl2.position.y = 16;
    cyl2.position.z = 0;
    //head
    head = new Mesh(sphereGeometry, skinMaterial);
    head.castShadow = true;
    head.position.x = 0;
    head.position.y = 24;
    head.position.z = 0;
    //eyes here
    eye1 = new Mesh(eyeShape, eyeColour);
    eye1.castShadow = true;
    eye1.position.x = -1;
    eye1.position.y = 25;
    eye1.position.z = 2.5;
    eye2 = new Mesh(eyeShape, eyeColour);
    eye2.castShadow = true;
    eye2.position.x = 1;
    eye2.position.y = 25;
    eye2.position.z = 2.5;
    //add items to one group, add group to the scene
    group = new THREE.Object3D();
    group.add(cube3);
    group.add(cube8);
    group.add(cube9);
    group.add(head);
    group.add(cyl1);
    group.add(cyl2);
    group.add(leg1);
    group.add(leg2);
    group.add(eye1);
    group.add(eye2);
    scene.add(group);
    console.log("Added Cubes to scene...");
}
function RotateHuman(rSpeed) {
    group.rotation.y += rSpeed;
}
//# sourceMappingURL=game.js.map