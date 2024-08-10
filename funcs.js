const vecSum = (vecs) => {
    sumX = 0
    sumY = 0
    for( let i = 0; i < vecs.length; i++){
        sumX += vecs[i].x
        sumY += vecs[i].y
    }

    return {x: sumX, y: sumY}
}

const vecMod = (vec) => {
    return Math.sqrt(vec.x**2 + vec.y**2)
}

const vecNorm = (vec) => {
    return {x: vec.x / vecMod(vec), y: vec.y / vecMod(vec)}
}

const vecMultScalar = (vec, num) => {
    return {x: vec.x*num, y: vec.y*num}
}
const cnvarrow = (context, fromx, fromy, tox, toy) => {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }