import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"
import { Starfield } from "./Starfield.js"
import { PlanetSystem } from "./PlanetSystem.js"
import { MeteorSystem } from "./MeteorSystem.js"
import { NebulaClouds } from "./NebulaClouds.js"

export class UniverseRenderer {

constructor(){

this.scene = new THREE.Scene()
/* lighting */

const light = new THREE.PointLight(0xffffff, 2, 2000)
light.position.set(0, 0, 50)
this.scene.add(light)

this.camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
2000
)

this.camera.position.z = 60

this.renderer = new THREE.WebGLRenderer({antialias:true})

this.renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(this.renderer.domElement)

/* resize */

window.addEventListener("resize",()=>{

this.camera.aspect = window.innerWidth / window.innerHeight
this.camera.updateProjectionMatrix()
this.renderer.setSize(window.innerWidth,window.innerHeight)

})

/* background systems */

this.starfield = new Starfield(this.scene)
this.planets = new PlanetSystem(this.scene)
this.meteors = new MeteorSystem(this.scene)
this.nebula = new NebulaClouds(this.scene)

/* electrostatics world planet */

const geo = new THREE.SphereGeometry(8,32,32)

const mat = new THREE.MeshStandardMaterial({
color:0x66ccff,
emissive:0x113355,
metalness:0.4,
roughness:0.5
})

this.electroPlanet = new THREE.Mesh(geo,mat)

this.electroPlanet.position.set(0,0,-80)

this.scene.add(this.electroPlanet)

  /* glow */

const glowGeo = new THREE.SphereGeometry(8.8,32,32)

const glowMat = new THREE.MeshBasicMaterial({
color:0x66ccff,
transparent:true,
opacity:0.35,
depthWrite:false
})

const glow = new THREE.Mesh(glowGeo, glowMat)

this.electroPlanet.add(glow)

/* click detection */

this.raycaster = new THREE.Raycaster()
this.mouse = new THREE.Vector2()

window.addEventListener("click",(e)=>{

this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

this.raycaster.setFromCamera(this.mouse,this.camera)

const hit = this.raycaster.intersectObject(this.electroPlanet)
if(hit.length > 0){

window.loadWorld("electrostatics")

}

})

}

/* start universe */

start(){

this.animate()

}

/* animation loop */

animate(){

requestAnimationFrame(()=>this.animate())

const t = Date.now() * 0.0001

/* camera drift */

this.camera.position.x = Math.sin(t) * 20
this.camera.position.y = Math.cos(t) * 10

this.camera.lookAt(0,0,-80)

/* update systems */

if(this.starfield) this.starfield.update()
if(this.planets) this.planets.update()
if(this.meteors) this.meteors.update()
if(this.nebula) this.nebula.update()
if(this.electroPlanet){
this.electroPlanet.rotation.y += 0.0015
this.electroPlanet.rotation.x += 0.0003
}
this.renderer.render(this.scene,this.camera)

}
  
}
