import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"

export class NebulaClouds{

constructor(scene){

this.scene = scene
this.nebulas = []

const texture = new THREE.TextureLoader().load(
"https://threejs.org/examples/textures/sprites/cloud.png"
)

for(let i=0;i<4;i++){

const material = new THREE.SpriteMaterial({
map:texture,
color:0x8899ff,
transparent:true,
opacity:0.35
})

const sprite = new THREE.Sprite(material)

/* place nebula in visible range */

sprite.position.set(
(Math.random()-0.5)*800,
(Math.random()-0.5)*400,
-300 - Math.random()*200
)

/* size */

sprite.scale.set(500,500,1)

scene.add(sprite)

this.nebulas.push({
mesh:sprite,
speed:0.05 + Math.random()*0.15
})

}

}

/* animation */

update(){

this.nebulas.forEach(n=>{

n.mesh.position.x += n.speed

if(n.mesh.position.x > 500){

n.mesh.position.x = -500

}

})

}

}
