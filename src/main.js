import { UniverseRenderer } from "./universe/UniverseRenderer.js"
import { createWorld } from "./worlds/electrostatics.js"

const universe = new UniverseRenderer()
universe.start()

/* WORLD LOADER */

window.loadWorld = function(name){

console.log("CLICK DETECTED:", name)

document.getElementById("worldHub").style.display = "none"
universe.renderer.domElement.style.display = "none"

if(name === "electrostatics"){
createWorld(universe.scene, universe.camera)
}

if(name === "modernPhysics"){
openModernWorld()
}

}

/* MODERN WORLD */

function openModernWorld(){

const ui = document.getElementById("ui")

const wrap = document.createElement("div")
wrap.id = "modernWorld"

wrap.style.position = "absolute"
wrap.style.top = "80px"
wrap.style.left = "0"
wrap.style.right = "0"
wrap.style.bottom = "120px"
wrap.style.display = "flex"
wrap.style.flexDirection = "column"
wrap.style.alignItems = "center"
wrap.style.justifyContent = "center"
wrap.style.gap = "20px"

ui.appendChild(wrap)

/* TITLE */
const title = document.createElement("h1")
title.innerText = "Modern Physics World"
title.style.color = "#00e5ff"
wrap.appendChild(title)

/* PHOTOELECTRIC BUTTON */
const btn = document.createElement("button")
btn.innerText = "Photoelectric Effect"

btn.style.padding = "12px 20px"
btn.style.background = "#111"
btn.style.border = "1px solid #00e5ff"
btn.style.color = "white"
btn.style.cursor = "pointer"

btn.onclick = ()=>{
openSimulation("simulations/photoelectric.html")
}

wrap.appendChild(btn)

/* BACK BUTTON */
const back = document.createElement("button")
back.innerText = "← Back to Worlds"

back.style.position = "absolute"
back.style.top = "20px"
back.style.left = "20px"

back.onclick = ()=>{
wrap.remove()
document.getElementById("worldHub").style.display = "block"
universe.renderer.domElement.style.display = "block"
}

ui.appendChild(back)

}

/* SIMULATION LOADER */

window.openSimulation = function(file){

const ui = document.getElementById("ui")

const simWrap = document.createElement("div")
simWrap.id = "simWrap"

simWrap.style.position = "absolute"
simWrap.style.top = "80px"
simWrap.style.left = "0"
simWrap.style.right = "0"
simWrap.style.bottom = "120px"

ui.appendChild(simWrap)

/* BACK */
const back = document.createElement("button")

back.innerText = "← Back to Modern Physics"

back.style.position = "absolute"
back.style.top = "20px"
back.style.left = "20px"

back.onclick = ()=>{
simWrap.remove()
document.getElementById("modernWorld").style.display = "flex"
}

ui.appendChild(back)

/* IFRAME */

const frame = document.createElement("iframe")

frame.src = file
frame.style.width = "100%"
frame.style.height = "100%"
frame.style.border = "none"

simWrap.appendChild(frame)

}
