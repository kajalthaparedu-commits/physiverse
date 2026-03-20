import { UniverseRenderer } from "./universe/UniverseRenderer.js"
import { createWorld } from "./worlds/electrostatics.js"

const universe = new UniverseRenderer()

/* START BACKGROUND */
universe.start()

/* ================= WORLD LOADER ================= */

window.loadWorld = function(name){

console.log("CLICK DETECTED:", name)

/* hide world hub */
document.getElementById("worldHub").style.display = "none"

/* hide universe */
universe.renderer.domElement.style.display = "none"

/* ELECTROSTATICS */
if(name === "electrostatics"){
  createWorld(universe.scene, universe.camera)
}

/* MODERN PHYSICS */
if(name === "modern"){
  openModernWorld()
}

}

/* ================= MODERN WORLD ================= */

function openModernWorld(){

const ui = document.getElementById("ui")

/* remove old if exists */
const old = document.getElementById("modernWorld")
if(old) old.remove()

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
wrap.style.pointerEvents = "auto"

ui.appendChild(wrap)

/* TITLE */
const title = document.createElement("h1")
title.innerText = "Modern Physics World"
title.style.color = "#00e5ff"
wrap.appendChild(title)

/* BUTTON */
const btn = document.createElement("button")
btn.innerText = "⚛ Photoelectric Effect"

btn.style.padding = "12px 20px"
btn.style.background = "#001a2a"
btn.style.border = "1px solid #00e5ff"
btn.style.color = "#00e5ff"
btn.style.cursor = "pointer"
btn.style.borderRadius = "6px"

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
back.style.padding = "10px 16px"
back.style.background = "#111"
back.style.border = "1px solid #6ec6ff"
back.style.color = "white"
back.style.cursor = "pointer"

back.onclick = () => {

  // remove simulation
  simWrap.remove()
  back.remove()

  // remove modern world completely
  const modern = document.getElementById("modernWorld")
  if(modern) modern.remove()

  // show world hub again
  const hub = document.getElementById("worldHub")
  hub.style.display = "block"
  hub.style.opacity = "1"

  // show universe
  universe.renderer.domElement.style.display = "block"

}

/* ================= SIMULATION LOADER ================= */

window.openSimulation = function(file){

const ui = document.getElementById("ui")

/* remove previous sim if exists */
const old = document.getElementById("simWrap")
if(old) old.remove()

/* remove modern world UI */
const modern = document.getElementById("modernWorld")
if(modern) modern.style.display = "none"

/* wrapper */
const simWrap = document.createElement("div")
simWrap.id = "simWrap"

simWrap.style.position = "absolute"
simWrap.style.top = "80px"
simWrap.style.left = "0"
simWrap.style.right = "0"
simWrap.style.bottom = "40px"
simWrap.style.pointerEvents = "auto"

ui.appendChild(simWrap)

/* BACK BUTTON */
const back = document.createElement("button")

back.innerText = "← Back to Worlds"

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
back.remove()

/* show modern world again */
const modern = document.getElementById("modernWorld")
if(modern) modern.style.display = "flex"

/* OR fallback to world hub */
if(!modern){
  document.getElementById("worldHub").style.display = "block"
  document.getElementById("worldHub").style.opacity = "1"
  universe.renderer.domElement.style.display = "block"
}

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
