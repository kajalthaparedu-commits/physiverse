import { UniverseRenderer } from "./universe/UniverseRenderer.js"
import { createWorld } from "./worlds/electrostatics.js"

const universe = new UniverseRenderer()

/* loader now receives scene + camera */

const loader = new WorldLoader(
    universe.scene,
    universe.camera
)

/* start background universe */

universe.start()

/* make function visible to HTML */

window.loadWorld = function(name){

console.log("CLICK DETECTED:", name)

/* hide menu */

document.getElementById("worldHub").style.display = "none"

/* stop universe animation */

universe.renderer.domElement.style.display = "none"

/* load world */

loader.load(name)

}
window.openSimulation = function(file){

const ui = document.getElementById("ui")

ui.innerHTML = ""

const back = document.createElement("button")

back.innerText = "← Back"

back.style.position = "absolute"
back.style.top = "20px"
back.style.left = "20px"
back.style.padding = "10px 16px"
back.style.background = "#111"
back.style.border = "1px solid #6ec6ff"
back.style.color = "white"
back.style.cursor = "pointer"

back.onclick = () => location.reload()

ui.appendChild(back)

const frame = document.createElement("iframe")

frame.src = file
frame.style.position = "absolute"
frame.style.top = "60px"
frame.style.left = "0"
frame.style.width = "100%"
frame.style.height = "calc(100% - 60px)"
frame.style.border = "none"

ui.appendChild(frame)

}
