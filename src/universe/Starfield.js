import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"

export class Starfield{

constructor(scene){

this.scene = scene
this.layers = []
this.time = 0
this.mouse = { x:0, y:0 }

window.addEventListener("mousemove", e => {

this.mouse.x = (e.clientX / window.innerWidth) - 0.5
this.mouse.y = (e.clientY / window.innerHeight) - 0.5

})

  /* depth layers */

this.createLayer(3000,0.9,-500)
this.createLayer(2000,1.3,-900)
this.createLayer(1200,1.8,-1400)

}


/* ----------------------------- */
/* STAR LAYER CREATION */
/* ----------------------------- */

createLayer(count,size,z){

const geometry = new THREE.BufferGeometry()

const positions = []

for(let i=0;i<count;i++){

positions.push(
(Math.random()-0.5)*2500,
(Math.random()-0.5)*1400,
z + Math.random()*200
)

}

geometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(positions,3)
)

const material = new THREE.PointsMaterial({
color:0xffffff,
size:size,
transparent:true,
opacity:1,
depthWrite:false
})

const stars = new THREE.Points(geometry,material)

this.scene.add(stars)

this.layers.push({
mesh:stars,
material:material,
speed:0.02 + Math.random()*0.02,
twinkleOffset:Math.random()*10
})

}


/* ----------------------------- */
/* ANIMATION */
/* ----------------------------- */

update(){

this.time += 0.01

this.layers.forEach(layer=>{

/* slow space drift */

layer.mesh.rotation.y += layer.speed * 0.0001
layer.mesh.rotation.x += layer.speed * 0.00005

/* parallax movement */

layer.mesh.position.x = this.mouse.x * 40 * layer.speed
layer.mesh.position.y = this.mouse.y * 20 * layer.speed
/* twinkle effect */

layer.material.opacity =
0.7 + Math.sin(this.time + layer.twinkleOffset) * 0.25

})

}

}
