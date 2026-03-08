import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"
import { experiments } from "../labs/experimentRegistry.js"

export function createWorld(scene, camera){

/* ----------------------------- */
/* UI CONTAINER */
/* ----------------------------- */

const container = document.createElement("div")
container.id = "labContainer"

container.style.position = "absolute"
container.style.top = "0"
container.style.left = "0"
container.style.width = "100%"
container.style.height = "100%"
container.style.display = "flex"
container.style.flexDirection = "column"
container.style.alignItems = "center"
container.style.fontFamily = "Inter, sans-serif"
container.style.color = "white"
container.style.pointerEvents = "auto"
container.style.zIndex = "20"

document.getElementById("ui").appendChild(container)


/* ----------------------------- */
/* TITLE */
/* ----------------------------- */

const title = document.createElement("h1")

title.innerText = "⚡ Electrostatics Lab"

title.style.fontSize = "42px"
title.style.letterSpacing = "4px"
title.style.textShadow = "0 0 14px #6ec6ff"
title.style.marginTop = "120px"
title.style.marginBottom = "10px"

container.appendChild(title)


/* ----------------------------- */
/* SUBTITLE */
/* ----------------------------- */

const subtitle = document.createElement("div")

subtitle.innerText = "Interactive Experiments"

subtitle.style.opacity = "0.7"
subtitle.style.marginBottom = "50px"

container.appendChild(subtitle)


/* ----------------------------- */
/* GRID */
/* ----------------------------- */

const grid = document.createElement("div")

grid.style.display = "grid"
grid.style.gridTemplateColumns = "repeat(auto-fit,minmax(260px,1fr))"
grid.style.gap = "25px"
grid.style.width = "70%"
grid.style.maxWidth = "900px"

container.appendChild(grid)


/* ----------------------------- */
/* BUILD EXPERIMENT BUTTONS */
/* ----------------------------- */

experiments.electrostatics.forEach(exp => {

const card = document.createElement("div")

card.innerHTML = `${exp.icon} ${exp.name}`

card.style.border = "1px solid rgba(120,200,255,0.35)"
card.style.padding = "26px"
card.style.borderRadius = "10px"
card.style.cursor = "pointer"
card.style.textAlign = "center"
card.style.background = "rgba(10,20,40,0.55)"
card.style.fontSize = "18px"
card.style.transition = "all 0.25s ease"

card.onmouseenter = ()=>{
card.style.boxShadow = "0 0 20px rgba(120,200,255,0.9)"
card.style.transform = "translateY(-5px)"
}

card.onmouseleave = ()=>{
card.style.boxShadow = "none"
card.style.transform = "translateY(0)"
}

card.onclick = ()=>{

if(!exp.file){
alert("Coming Soon")
return
}

launchSimulation(exp.file)

}

grid.appendChild(card)

})


/* ----------------------------- */
/* SIMULATION LOADER */
/* ----------------------------- */

function launchSimulation(file){

container.innerHTML = ""

/* back button */

const back = document.createElement("button")

back.innerText = "← Back to Lab"

back.style.position = "absolute"
back.style.top = "20px"
back.style.left = "20px"
back.style.padding = "10px 16px"
back.style.background = "#111"
back.style.border = "1px solid #6ec6ff"
back.style.color = "white"
back.style.cursor = "pointer"
back.style.zIndex = "100"

back.onclick = ()=>{
container.remove()
createWorld(scene,camera)
}

container.appendChild(back)


/* ----------------------------- */
/* DYNAMIC HEADER / FOOTER SIZE */
/* ----------------------------- */

const header = document.getElementById("header")
const footer = document.getElementById("physiverseFooter")

function computeOffsets(){

const headerHeight = header ? header.offsetHeight : 0
const footerHeight = footer ? footer.offsetHeight : 0

wrapper.style.top = headerHeight + "px"
wrapper.style.bottom = footerHeight + "px"

}


/* ----------------------------- */
/* SIMULATION WRAPPER */
/* ----------------------------- */

const wrapper = document.createElement("div")

wrapper.style.position = "absolute"
wrapper.style.left = "0"
wrapper.style.right = "0"
wrapper.style.display = "flex"
wrapper.style.overflow = "hidden"

container.appendChild(wrapper)

computeOffsets()

window.addEventListener("resize", computeOffsets)


/* ----------------------------- */
/* ORIENTATION HELPER */
/* ----------------------------- */

if(window.innerHeight > window.innerWidth){

const rotateMsg = document.createElement("div")

rotateMsg.innerText = "Rotate device to landscape for best experience"

rotateMsg.style.position = "absolute"
rotateMsg.style.top = "50%"
rotateMsg.style.left = "50%"
rotateMsg.style.transform = "translate(-50%,-50%)"
rotateMsg.style.fontSize = "20px"
rotateMsg.style.opacity = "0.8"

container.appendChild(rotateMsg)

}


/* ----------------------------- */
/* IFRAME */
/* ----------------------------- */

const frame = document.createElement("iframe")

frame.src = "simulations/" + file
frame.style.width = "100%"
frame.style.height = "100%"
frame.style.border = "none"
frame.style.background = "black"

wrapper.appendChild(frame)

}


/* ----------------------------- */
/* CLEANUP */
/* ----------------------------- */

return {

dispose(){
container.remove()
}

}

}
