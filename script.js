const canv = document.querySelector("canvas");

const w = 16000
const h = 900

canv.width = canv.style.width = w;
canv.height = canv.style.height = h;

const ctx = canv.getContext('2d');

let timeInMs = 0;
let speed = 10;
let time;

let params = {
  g: -9.8,
  G: 6.67 * 10**(-23),
  c: 3 * 10 ** 8
}

let point = {
  xStart: 400,
  yStart: 500,
  x: 0,
  y: 0,
  powers: [],
  acceleration: {x: 0, y: 0},
  velocity: {x: 0, y: 0},
  velocityStart: {x: -10, y: -230},
  mass: 7 * 10**32
}

let point2 = {
  xStart: 600,
  yStart: 500,
  x: 0,
  y: 0,
  powers: [],
  acceleration: {x: 0, y: 0},
  velocity: {x: 0, y: 0},
  velocityStart: {x: 10, y: 230},
  mass: 6 * 10**32
}

point.x = point.xStart;
point.y = point.yStart;

point2.x = point2.xStart;
point2.y = point2.yStart;

center = {x: 400, y: 600, mass: 10**33}

const proc = setInterval(() => {
  time = timeInMs / 1000;

  let gravityMod = params.G*point.mass*point2.mass / 
  vecMod({x: point2.x - point.x, y: point2.y - point.y})**2/1000
  let gravity = {x: 0, y: 0}
  gravity.x = point2.x - point.x
  gravity.y = point2.y - point.y
  gravity = vecNorm(gravity)
  gravity = vecMultScalar(
    gravity, 
    gravityMod
  )


  point.powers =[
    gravity
  ]
  point.acceleration.x = vecSum(point.powers).x / point.mass
  point.acceleration.y = vecSum(point.powers).y / point.mass

  // point.velocity.x = point.velocityStart.x + point.acceleration.x * time;
  // point.velocity.y = point.velocityStart.y + point.acceleration.y * time;

  // point.x = point.xStart + point.velocityStart.x * time + point.acceleration.x * time ** 2 / 2;
  // point.y = point.yStart + point.velocityStart.y * time + point.acceleration.y * time ** 2 / 2;

  point.velocityStart.x += point.acceleration.x/1000*speed;
  point.velocityStart.y += point.acceleration.y/1000*speed;

  point.x += point.velocityStart.x/1000*speed;
  point.y += point.velocityStart.y/1000*speed;

  point2.powers =[
    vecMultScalar(gravity, -1)
  ]
  point2.acceleration.x = vecSum(point2.powers).x / point2.mass
  point2.acceleration.y = vecSum(point2.powers).y / point2.mass

  point2.velocityStart.x += point2.acceleration.x/1000*speed;
  point2.velocityStart.y += point2.acceleration.y/1000*speed;

  point2.x += point2.velocityStart.x/1000*speed;
  point2.y += point2.velocityStart.y/1000*speed;

  
  ctx.fillStyle = "red";
  ctx.fillRect(point.x - 2, h - point.y + 2, 4, 4);
  ctx.fillStyle = "blue";
  ctx.fillRect(point2.x - 2, h - point2.y + 2, 4, 4);


  if(timeInMs == 0){
    console.log(point)
  }
  timeInMs += speed;
}, speed);