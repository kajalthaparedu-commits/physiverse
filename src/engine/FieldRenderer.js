import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

export function createFootballField(){

const group=new THREE.Group();

const loader=new THREE.TextureLoader();

const grass=loader.load(
"https://threejs.org/examples/textures/terrain/grasslight-big.jpg"
);

grass.wrapS=THREE.RepeatWrapping;
grass.wrapT=THREE.RepeatWrapping;
grass.repeat.set(30,20);


// FIELD
const field=new THREE.Mesh(

new THREE.PlaneGeometry(60,36),

new THREE.MeshStandardMaterial({map:grass})

);

field.rotation.x=-Math.PI/2;
field.receiveShadow=true;

group.add(field);


// MIDLINE
group.add(new THREE.Line(

new THREE.BufferGeometry().setFromPoints([
new THREE.Vector3(-30,0.02,0),
new THREE.Vector3(30,0.02,0)
]),

new THREE.LineBasicMaterial({color:0xffffff})

));


// CENTER CIRCLE
const pts=[];

for(let i=0;i<64;i++){

let a=i/64*Math.PI*2;

pts.push(new THREE.Vector3(Math.cos(a)*4,0.02,Math.sin(a)*4));

}

group.add(new THREE.LineLoop(
new THREE.BufferGeometry().setFromPoints(pts),
new THREE.LineBasicMaterial({color:0xffffff})
));


// STADIUM WALL
const wall=new THREE.Mesh(

new THREE.CylinderGeometry(45,45,8,64,1,true),

new THREE.MeshStandardMaterial({
color:0x0f4d0f,
side:THREE.DoubleSide
})

);

wall.position.y=4;

group.add(wall);


// CROWD
const crowd=new THREE.Mesh(

new THREE.CylinderGeometry(48,48,6,64,1,true),

new THREE.MeshStandardMaterial({
color:0x444444,
side:THREE.DoubleSide
})

);

crowd.position.y=7;

group.add(crowd);


// GOAL POSTS
function goal(x){

const g=new THREE.Group();

const mat=new THREE.MeshStandardMaterial({color:0xffffff});

const h=3;
const w=8;

const p1=new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.15,h,16),mat);
p1.position.set(x,h/2,-w/2);

const p2=new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.15,h,16),mat);
p2.position.set(x,h/2,w/2);

const bar=new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.15,w,16),mat);
bar.rotation.z=Math.PI/2;
bar.position.set(x,h,0);

g.add(p1);
g.add(p2);
g.add(bar);

return g;

}

group.add(goal(-30));
group.add(goal(30));


return group;

}
