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