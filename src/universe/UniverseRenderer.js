import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"
import { Starfield } from "./Starfield.js"
import { PlanetSystem } from "./PlanetSystem.js"
import { MeteorSystem } from "./MeteorSystem.js"
import { NebulaClouds } from "./NebulaClouds.js"

export class UniverseRenderer {

constructor(){

this.scene = new THREE.Scene()

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

this.camera.lookAt(0,0,-600)

/* update systems */

if(this.starfield) this.starfield.update()
if(this.planets) this.planets.update()
if(this.meteors) this.meteors.update()
if(this.nebula) this.nebula.update()

this.renderer.render(this.scene,this.camera)

}
  
}
