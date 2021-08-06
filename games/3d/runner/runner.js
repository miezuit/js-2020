var sceneWidth = window.innerWidth;
var sceneHeight = window.innerHeight;
var camera;
var scene;
var renderer;
var dom;
var hero;
var sun;
var ground;
var orbitControl;
var heroRadius = 0.2;
var heroBaseY = 1.8;
var currentLane
const leftLane = -1
const middleLane = 0
const rightLane = 1
var worldRadius = 26
var sphericalHelper
var rollingSpeed = 0.0005
var heroRollingSpeed = (rollingSpeed * worldRadius / heroRadius) / 5
var clock
var hasCollided = false
var treesInPath = []
var treesPool = []
var treeReleaseInterval = 0.5
var particles
var particleGeometry
var particleCount = 20
var explosionPower = 1
var jumping
var pathAngleValues = [1.52, 1.57, 1.6]
var gravity = 0.005

init();

function init() {
    // set scene
    createScene();
    // render loop
    update();
}

function createScene() {
    scene = new THREE.Scene();
    sphericalHelper = new THREE.Spherical()
    clock = new THREE.Clock()
    clock.start()

    createTreesPool()
    createCamera()
    createRenderer()
    addLight()
    addWorld()
    addHero()

     // helper to move the camera around the scene
    orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', render);
    orbitControl.enableZoom = false;

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('keydown', handleKeyDown)
}

function createTreesPool() {
    var maxTreesInPool = 5
    var newTree
    for (let i = 0; i < maxTreesInPool; i++) {
        treesPool.push(createTree())
    }
}

function createRenderer() {
    // create renderer
    renderer = new THREE.WebGLRenderer({
        alpha: true, // transparent backdrop
        antialiasing: true
    });

    // enable shadow
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // set renderer size
    renderer.setSize(sceneWidth, sceneHeight);

    // add canvas to body
    document.body.appendChild(renderer.domElement);
}

function createCamera() {
    // create camera
    camera = new THREE.PerspectiveCamera(60, sceneWidth / sceneHeight, 0.1, 1000);
    // set camera position
    camera.position.z = 6.5;
    camera.position.y = 2.5;
    camera.updateProjectionMatrix()
}

function addWorld() {
    // muntele
    // cream o sfera cu 40 de fete (sides) si 40 de segmente verticale (tiers)
    // pentru a da o forma mai ascutita
    // iteram prin toate segmentele se sus pana jos ca sa manipulam verticele
    // fiecare tier contine un numar de segmente egal cu numarul de fete
    // si formeaza un inel in jurul sferei
    // pentru a rupe uniformitatea, mutam fiecare vertice random cu o fractie intre 0.25 and 0.75 
    // pe distanta pana la urmatoarea vertice
    // obtinem un contur in zig-zag
    // apoi ridicam random fiecare vertice creand astfel o suprafata neregulata cu dealuri
    // nota: centrul sferei are coordonatele (0, 0, 0)
    var sides = 40;
    var tiers = 40;
    var sphereGeometry = new THREE.SphereGeometry(worldRadius, sides,tiers);
    var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xfffafa ,shading:THREE.FlatShading} )
    
    var vertexIndex;
    var vertexVector = new THREE.Vector3();
    var nextVertexVector = new THREE.Vector3();
    var firstVertexVector = new THREE.Vector3();
    var offset = new THREE.Vector3();
    var currentTier = 1;
    var lerpValue = 0.5;
    var heightValue;
    var maxHeight=0.07;
    for(var j=1;j<tiers-2;j++){
        currentTier=j;
        for(var i=0;i<sides;i++){
            vertexIndex=(currentTier*sides)+1;
            vertexIndex=(currentTier*sides)+1;
            vertexVector=sphereGeometry.vertices[i+vertexIndex].clone();
            if(j%2!==0){
                if(i==0){
                    firstVertexVector=vertexVector.clone();
                }
                nextVertexVector=sphereGeometry.vertices[i+vertexIndex+1].clone();
                if(i==sides-1){
                    nextVertexVector=firstVertexVector;
                }
                lerpValue=(Math.random()*(0.75-0.25))+0.25;
                vertexVector.lerp(nextVertexVector,lerpValue);
            }
            heightValue=(Math.random()*maxHeight)-(maxHeight/2);
            offset=vertexVector.clone().normalize().multiplyScalar(heightValue);
            sphereGeometry.vertices[i+vertexIndex]=(vertexVector.add(offset));
        }
    }
    rollingGroundSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    rollingGroundSphere.receiveShadow = true;
    rollingGroundSphere.castShadow = false;
    rollingGroundSphere.rotation.z = -Math.PI/2;
    scene.add(rollingGroundSphere);
    rollingGroundSphere.position.y = -24;
    rollingGroundSphere.position.z = 2;
    addWorldTrees();
}

function addWorldTrees() {
    var numTrees = 36;
    var gap = 6.28 / 36;
    for(var i = 0; i < numTrees; i++) {
        addTree(false, i * gap, true);
        addTree(false, i * gap, false);
    }
}

function addTree(inPath, row, isLeft){
    var newTree;
    if(inPath) {
        if(treesPool.length == 0) return;
        newTree = treesPool.pop();
        newTree.visible = true;
        
        treesInPath.push(newTree);
        sphericalHelper.set( worldRadius-0.3, pathAngleValues[row], -rollingGroundSphere.rotation.x+4 );
    } else {
        newTree = createTree();
        var forestAreaAngle = 0;
        if(isLeft) {
            forestAreaAngle=1.68+Math.random()*0.1;
        } else {
            forestAreaAngle=1.46-Math.random()*0.1;
        }
        sphericalHelper.set( worldRadius-0.3, forestAreaAngle, row );
    }
    newTree.position.setFromSpherical(sphericalHelper);
    var rollingGroundVector = rollingGroundSphere.position.clone().normalize();
    var treeVector=newTree.position.clone().normalize();
    newTree.quaternion.setFromUnitVectors(treeVector,rollingGroundVector);
    newTree.rotation.x += (Math.random()*(2*Math.PI/10))+-Math.PI/10;
    
    rollingGroundSphere.add(newTree);
}

// use ConeGeometry for the trunk
// use CylinderGeometry for the branches
// then iterate for each vertix and expand the ring progresively
function createTree() {
    var sides=8;
    var tiers=6;
    var scalarMultiplier=(Math.random()*(0.25-0.1))+0.05;
    var midPointVector = new THREE.Vector3();
    var vertexVector = new THREE.Vector3();
    var treeGeometry = new THREE.ConeGeometry( 0.5, 1, sides, tiers);
    var treeMaterial = new THREE.MeshStandardMaterial( { color: 0x33ff33,shading:THREE.FlatShading  } );
    var offset;
    midPointVector = treeGeometry.vertices[0].clone();
    var currentTier = 0;
    var vertexIndex;
    blowUpTree(treeGeometry.vertices,sides,0,scalarMultiplier);
    tightenTree(treeGeometry.vertices,sides,1);
    blowUpTree(treeGeometry.vertices,sides,2,scalarMultiplier*1.1,true);
    tightenTree(treeGeometry.vertices,sides,3);
    blowUpTree(treeGeometry.vertices,sides,4,scalarMultiplier*1.2);
    tightenTree(treeGeometry.vertices,sides,5);
    var treeTop = new THREE.Mesh( treeGeometry, treeMaterial );
    treeTop.castShadow=true;
    treeTop.receiveShadow=false;
    treeTop.position.y=0.9;
    treeTop.rotation.y=(Math.random()*(Math.PI));
    var treeTrunkGeometry = new THREE.CylinderGeometry( 0.1, 0.1,0.5);
    var trunkMaterial = new THREE.MeshStandardMaterial( { color: 0x886633,shading:THREE.FlatShading  } );
    var treeTrunk = new THREE.Mesh( treeTrunkGeometry, trunkMaterial );
    treeTrunk.position.y=0.25;
    var tree =new THREE.Object3D();
    tree.add(treeTrunk);
    tree.add(treeTop);
    return tree;
}

function blowUpTree(vertices,sides,currentTier,scalarMultiplier,odd){
    var vertexIndex;
    var vertexVector= new THREE.Vector3();
    var midPointVector=vertices[0].clone();
    var offset;
    for(var i=0;i<sides;i++){
        vertexIndex=(currentTier*sides)+1;
        vertexVector=vertices[i+vertexIndex].clone();
        midPointVector.y=vertexVector.y;
        offset=vertexVector.sub(midPointVector);
        if(odd){
            if(i%2===0){
                offset.normalize().multiplyScalar(scalarMultiplier/6);
                vertices[i+vertexIndex].add(offset);
            } else {
                offset.normalize().multiplyScalar(scalarMultiplier);
                vertices[i+vertexIndex].add(offset);
                vertices[i+vertexIndex].y=vertices[i+vertexIndex+sides].y+0.05;
            } 

        }else{
            if(i%2!==0){
                offset.normalize().multiplyScalar(scalarMultiplier/6);
                vertices[i+vertexIndex].add(offset);
            }else{
                offset.normalize().multiplyScalar(scalarMultiplier);
                vertices[i+vertexIndex].add(offset);
                vertices[i+vertexIndex].y=vertices[i+vertexIndex+sides].y+0.05;
            }
        }
    }
}

function tightenTree(vertices,sides,currentTier){
    var vertexIndex;
    var vertexVector= new THREE.Vector3();
    var midPointVector=vertices[0].clone();
    var offset;
    for(var i=0;i<sides;i++){
        vertexIndex=(currentTier*sides)+1;
        vertexVector=vertices[i+vertexIndex].clone();
        midPointVector.y=vertexVector.y;
        offset=vertexVector.sub(midPointVector);
        offset.normalize().multiplyScalar(0.06);
        vertices[i+vertexIndex].sub(offset);
    }
}

function addLight() {
    var hemisphereLight = new THREE.HemisphereLight(0xfffafa, 0x000000, .9)
    scene.add(hemisphereLight);

    sun = new THREE.DirectionalLight(0xcdc1c5, 0.9);
    sun.position.set(12, 6, -7);
    sun.castShadow = true;
    scene.add(sun);
    
    sun.shadow.mapSize.width = 256;
    sun.shadow.mapSize.height = 256;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;

    scene.fog = new THREE.FogExp2(0xf0fff0, 0.14);
}

function addHero() {
    // create the snowball
    var sphereGeometry = new THREE.DodecahedronGeometry(heroRadius, 1);
    var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xe5f2f2 , shading:THREE.FlatShading} )
    hero = new THREE.Mesh(sphereGeometry, sphereMaterial);

    hero.castShadow = true;
    hero.receiveShadow = false;

    scene.add(hero);

    currentLane = middleLane
    hero.position.x = currentLane
    hero.position.y = heroBaseY
    hero.position.z = 4.8
}

function update() {
    // animate the snowball
    rollingGroundSphere.rotation.x += rollingSpeed;
    hero.rotation.x -= heroRollingSpeed;
    if(hero.position.y <= heroBaseY){
        jumping=false;
        bounceValue=(Math.random()*0.04)+0.005;
    }
    hero.position.y+=bounceValue;
    hero.position.x=THREE.Math.lerp(hero.position.x,currentLane, 2*clock.getDelta());
    bounceValue-=gravity;
    if(clock.getElapsedTime() > treeReleaseInterval){
        clock.start();
        addPathTree();
        if(!hasCollided){
            // score+=2*treeReleaseInterval;
            // scoreText.innerHTML=score.toString();
        }
    }

    doTreeLogic();
    doExplosionLogic();
    render();
    requestAnimationFrame(update);    
}

function addPathTree() {
    var options = [0, 1, 2]
    var lane = Math.floor(Math.random() * 3)
    addTree(true, lane)
    options.splice(lane, 1)
    if (Math.random() > 0.5) {
        lane = Math.floor(Math.random() * 2)
        addTree(true, options[lane])
    }
}

function render() {
    // render the scene
    renderer.render(scene, camera);
}

function onWindowResize() {
    // change the settings when the screeen is resized
    sceneHeight = window.innerHeight;
    sceneWidth = window.innerWidth;
    renderer.setSize(sceneWidth, sceneHeight);
    camera.aspect = sceneWidth/sceneHeight;
    camera.updateProjectionMatrix();
}

function handleKeyDown(keyEvent) {
    if(jumping) return;
    var validMove = true;
    if ( keyEvent.key === 'a') { //left
        if(currentLane==middleLane){
            currentLane=leftLane;
        }else if(currentLane==rightLane){
            currentLane=middleLane;
        }else{
            validMove=false;    
        }
    } else if ( keyEvent.key === 'd') { //right
        if(currentLane==middleLane){
            currentLane=rightLane;
        }else if(currentLane==leftLane){
            currentLane=middleLane;
        }else{
            validMove=false;    
         
        }
    }else{
        if ( keyEvent.key === 'w'){ //up, jump
            bounceValue = 0.1;
            jumping = true;
        }
        validMove=false;
    }
    if(validMove){
        jumping = true;
        bounceValue = 0.06;
    }
}

function doTreeLogic(){
    var oneTree;
    var treePos = new THREE.Vector3();
    var treesToRemove=[];
    treesInPath.forEach( function ( element, index ) {
        oneTree=treesInPath[ index ];
        treePos.setFromMatrixPosition( oneTree.matrixWorld );
        if(treePos.z>6 &&oneTree.visible){ // e in afara zonei vizuale
            treesToRemove.push(oneTree);
        }else{ // verifica coliziunea
            if(treePos.distanceTo(hero.position)<=0.6){
                console.log("hit");
                hasCollided=true;
                explode();
            }
        }
    });
    var fromWhere;
    treesToRemove.forEach( function ( element, index ) {
        oneTree=treesToRemove[ index ];
        fromWhere=treesInPath.indexOf(oneTree);
        treesInPath.splice(fromWhere,1);
        treesPool.push(oneTree);
        oneTree.visible=false;
        console.log("remove tree");
    });
}

function doExplosionLogic(){
    // if(!particles.visible) return;
    // for (var i = 0; i < particleCount; i ++ ) {
    //     particleGeometry.vertices[i].multiplyScalar(explosionPower);
    // }
    // if(explosionPower>1.005){
    //     explosionPower-=0.001;
    // }else{
    //     particles.visible=false;
    // }
    // particleGeometry.verticesNeedUpdate = true;
}