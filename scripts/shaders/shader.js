GradientShader = (skt, start, finish, startValue=0, finishValue=1) => Shader(height => {
    let normalized = (height - startValue) / finishValue
    let r = skt.red(start) + normalized * (skt.red(finish) - skt.red(start))
    let g = skt.green(start) + normalized * (skt.green(finish) - skt.green(start))
    let b = skt.blue(start) + normalized * (skt.blue(finish) - skt.blue(start))

    return skt.color(r, g, b)
})

Shader = shaderFunction => heightMap => {
    let result = []

    for (let i = 0; i < heightMap.length; i++) {
        result.push([])
        for (let j = 0; j < heightMap[0].length; j++) {
            result[i].push(shaderFunction(heightMap[i][j]))
        }
    }

    return result;
}