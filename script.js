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
  xStart: 400,
  yStart: 500,
  x: 0,
  y: 0,
  powers: [],
  acceleration: {x: 0, y: 0},
  velocity: {x: 0, y: 0},
  velocityStart: {x: -10, y: -230},
  mass: 10 * 10**32
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
  mass: 4 * 10**32
}

let point3 = {
  xStart: 200,
  yStart: 300,
  x: 0,
  y: 0,
  powers: [],
  acceleration: {x: 0, y: 0},
  velocity: {x: 0, y: 0},
  velocityStart: {x: -10, y: -230},
  mass: 4 * 10**32
}

point.x = point.xStart;
point.y = point.yStart;

point2.x = point2.xStart;
point2.y = point2.yStart;

point3.x = point3.xStart;
point3.y = point3.yStart;

max = {velocity: Infinity}

const proc = setInterval(() => {
  ctx.fillStyle = 'black';
//  ctx.fillRect(0, 0, w, h)
  time = timeInMs / 1000;

  let gravityMod12 = params.G*point.mass*point2.mass / 
  vecMod({x: point2.x - point.x, y: point2.y - point.y})**2/1000
  let gravity12 = {x: 0, y: 0}
  gravity12.x = point2.x - point.x
  gravity12.y = point2.y - point.y
  gravity12 = vecNorm(gravity12)
  gravity12 = vecMultScalar(
    gravity12, 
    gravityMod12
  )

  let gravityMod23 = params.G*point3.mass*point2.mass / 
  vecMod({x: point3.x - point2.x, y: point3.y - point2.y})**2/1000
  let gravity23 = {x: 0, y: 0}
  gravity23.x = point3.x - point2.x
  gravity23.y = point3.y - point2.y
  gravity23 = vecNorm(gravity23)
  gravity23 = vecMultScalar(
    gravity23, 
    gravityMod23
  )

  let gravityMod13 = params.G*point.mass*point3.mass / 
  vecMod({x: point3.x - point.x, y: point3.y - point.y})**2/1000
  let gravity13 = {x: 0, y: 0}
  gravity13.x = point3.x - point.x
  gravity13.y = point3.y - point.y
  gravity13 = vecNorm(gravity13)
  gravity13 = vecMultScalar(
    gravity13, 
    gravityMod13
  )

  point.powers =[
    gravity12,
    gravity13
  ]
  point.acceleration.x = vecSum(point.powers).x / point.mass
  point.acceleration.y = vecSum(point.powers).y / point.mass

  point.velocityStart.x += point.acceleration.x/1000*speed;
  point.velocityStart.y += point.acceleration.y/1000*speed;

  point.x += point.velocityStart.x/1000*speed;
  point.y += point.velocityStart.y/1000*speed;

  point2.powers =[
    vecMultScalar(gravity12, -1),
    gravity23
  ]
  point2.acceleration.x = vecSum(point2.powers).x / point2.mass
  point2.acceleration.y = vecSum(point2.powers).y / point2.mass

  point2.velocityStart.x += point2.acceleration.x/1000*speed;
  point2.velocityStart.y += point2.acceleration.y/1000*speed;

  point2.x += point2.velocityStart.x/1000*speed;
  point2.y += point2.velocityStart.y/1000*speed;

  point3.powers =[
    vecMultScalar(gravity13, -1),
    vecMultScalar(gravity23, -1)
  ]

  point3.acceleration.x = vecSum(point3.powers).x / point3.mass
  point3.acceleration.y = vecSum(point3.powers).y / point3.mass

  point3.velocityStart.x += point3.acceleration.x/1000*speed;
  point3.velocityStart.y += point3.acceleration.y/1000*speed;

  point3.x += point3.velocityStart.x/1000*speed;
  point3.y += point3.velocityStart.y/1000*speed;

  // ctx.strokeStyle = "red"
  // ctx.lineWidth = 3
  // ctx.beginPath();
	// ctx.moveTo(point.x, h - point.y)
  // cnvarrow(
  //   ctx, point.x, 
  //   h-point.y, 
  //   vecMultScalar(vecNorm(point.velocityStart), 0.2*vecMod(point.velocityStart)).x + point.x,
  //   h - vecMultScalar(vecNorm(point.velocityStart), 0.2*vecMod(point.velocityStart)).y - point.y
  // )
  // ctx.stroke();

  // ctx.strokeStyle = "rgb(0,200,255)"
  // ctx.lineWidth = 3
  // ctx.beginPath();
  // cnvarrow(
  //   ctx, point2.x, 
  //   h-point2.y, 
  //   vecMultScalar(vecNorm(point2.velocityStart), 0.2*vecMod(point2.velocityStart)).x + point2.x,
  //   h - vecMultScalar(vecNorm(point2.velocityStart), 0.2*vecMod(point2.velocityStart)).y - point2.y
  // )
  // ctx.stroke();

  // ctx.strokeStyle = "lime"
  // ctx.beginPath();
  // cnvarrow(
  //   ctx, point3.x, 
  //   h-point3.y, 
  //   vecMultScalar(vecNorm(point3.velocityStart), 0.2*vecMod(point3.velocityStart)).x + point3.x,
  //   h - vecMultScalar(vecNorm(point3.velocityStart), 0.2*vecMod(point3.velocityStart)).y - point3.y
  // )
  // ctx.stroke();
  
  ctx.fillStyle = "red";
  ctx.strokeStyle = "red";
  ctx.beginPath();
	ctx.arc(point.x, h - point.y, 8, 0, 6.29, true);
	ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "rgb(0, 200, 255)";
  ctx.strokeStyle = "rgb(0, 200, 255)";
  ctx.beginPath();
	ctx.arc(point2.x, h - point2.y, 8, 0, 6.29, true);
	ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "lime";
  ctx.strokeStyle = "lime";
  ctx.beginPath();
	ctx.arc(point3.x, h - point3.y, 8, 0, 6.29, true);
	ctx.fill();
  ctx.stroke();


  if(timeInMs == 0){
    console.log(point)
  }
  timeInMs += speed;
}, speed);