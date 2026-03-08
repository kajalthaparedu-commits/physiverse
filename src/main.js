import { UniverseRenderer } from "./universe/UniverseRenderer.js"
import { createWorld } from "./worlds/electrostatics.js"

const universe = new UniverseRenderer()

/* start background universe */
universe.start()

/* WORLD LOADER */

window.loadWorld = function(name){

console.log("CLICK DETECTED:", name)

/* hide world hub */
document.getElementById("worldHub").style.display = "none"

/* hide universe canvas */
universe.renderer.domElement.style.display = "none"

/* open electrostatics lab */

if(name === "electrostatics"){
createWorld(universe.scene, universe.camera)
}

}


/* SIMULATION LOADER */

window.openSimulation = function(file){

const ui = document.getElementById("ui")

/* hide electrostatics lab */

const lab = document.getElementById("labContainer")
if(lab) lab.style.display = "none"

/* wrapper */

const simWrap = document.createElement("div")
simWrap.id = "simWrap"

simWrap.style.position = "absolute"
simWrap.style.top = "80px"
simWrap.style.left = "0"
simWrap.style.right = "0"
simWrap.style.bottom = "120px"

ui.appendChild(simWrap)

/* back button */

const back = document.createElement("button")

back.innerText = "← Back to Electrostatics Lab"

back.style.position = "absolute"
back.style.top = "20px"
back.style.left = "20px"
back.style.padding = "10px 16px"
back.style.background = "#111"
back.style.border = "1px solid #6ec6ff"
back.style.color = "white"
back.style.cursor = "pointer"

back.onclick = ()=>{

simWrap.remove()

if(lab) lab.style.display = "block"

}

ui.appendChild(back)

/* iframe */

const frame = document.createElement("iframe")

frame.src = file
frame.style.width = "100%"
frame.style.height = "100%"
frame.style.border = "none"

simWrap.appendChild(frame)

}
