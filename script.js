const canv = document.querySelector("canvas");

const w = 1600
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
  xStart: 200,
  yStart: 0,
  x: 0,
  y: 0,
  powers: [],
  acceleration: {x: 0, y: 0},
  velocity: {x: 0, y: 0},
  velocityStart: {x: 0, y: 50},
  mass: 10**6
}

point.x = point.xStart;
point.y = point.yStart;

const proc = setInterval(() => {
  time = timeInMs / 1000;

  let tga = 1
  let a = Math.atan(tga)

  point.powers =[
    {
      x: point.mass * 10**30 * params.G / (vecMod(point.y - 400, point.x - 400)*10**6) * Math.cos(a),
      y: point.mass * 10**30 * params.G / (vecMod(point.y - 400, point.x - 400)*10**6) * Math.sin(a)
    }
  ]

  point.velocity.x = point.velocityStart.x + point.acceleration.x * time;
  point.velocity.y = point.velocityStart.y + point.acceleration.y * time;

  point.acceleration.x = vecSum(point.powers).x / point.mass;
  point.acceleration.y = vecSum(point.powers).y / point.mass

  point.x = point.xStart + point.velocityStart.x * time + point.acceleration.x * time ** 2 / 2;
  point.y = point.yStart + point.velocityStart.y * time + point.acceleration.y * time ** 2 / 2;
  
  ctx.fillStyle = "red";
  ctx.fillRect(point.x - 5, h - point.y + 5, 10, 10);
  ctx.fillRect(400 - 5, h - 400 + 5, 10, 10);


  if(timeInMs == 0){
    console.log(point)
  }
  timeInMs += speed;
}, speed);